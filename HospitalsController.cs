using System;
using System.IO;
using System.Linq;
using System.Text.Json;
using EmergencyRescueSystem;
using Microsoft.AspNetCore.Mvc;
using RescueSystem;

namespace EmergencyRescueSystem.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class HospitalsController : ControllerBase
    {
        private static readonly string RescuedCasesFilePath =
            Path.Combine(AppContext.BaseDirectory, "App_Data", "rescued-cases.json");

        private static readonly object FileLock = new();

        private readonly SinglyLinkedList _hospitalList;
        private readonly EmergencyPriorityQueue _priorityQueue;
        private readonly RequestManager _requestManager;

        public HospitalsController(
            SinglyLinkedList hospitalList,
            EmergencyPriorityQueue priorityQueue,
            RequestManager requestManager)
        {
            _hospitalList = hospitalList;
            _priorityQueue = priorityQueue;
            _requestManager = requestManager;

            if (_hospitalList.GetAll().Count == 0)
            {
                _hospitalList.AddLast(new Hospital("مستشفى الأزهر الجامعي (دمياط الجديدة)", 1, 18, "دمياط الجديدة", "0572401111", 2));
                _hospitalList.AddLast(new Hospital("مستشفى دمياط التخصصي", 2, 24, "دمياط", "0572334455", 1));
                _hospitalList.AddLast(new Hospital("مستشفى المنصورة الجامعي", 3, 30, "الدقهلية", "0502202200", 1));
            }
        }

        // ================= 1. المستشفيات (SinglyLinkedList) =================

        [HttpGet]
        public IActionResult GetAllHospitals()
        {
            return Ok(_hospitalList.GetAll());
        }

        [HttpGet("{id:int}")]
        public IActionResult GetHospitalById(int id)
        {
            var hospital = _hospitalList.Search(id);
            if (hospital == null)
                return NotFound(new { message = "المستشفى غير موجود" });

            return Ok(hospital);
        }

        [HttpPost]
        public IActionResult AddHospital([FromBody] CreateHospitalDto dto)
        {
            var hospital = new Hospital(
                dto.Name,
                dto.Id,
                dto.AvailableBeds,
                dto.Location,
                dto.PhoneNumber,
                dto.LocationNodeId
            );

            if (dto.AddFirst)
                _hospitalList.AddFirst(hospital);
            else
                _hospitalList.AddLast(hospital);

            return CreatedAtAction(nameof(GetHospitalById), new { id = hospital.Id }, hospital);
        }

        [HttpPut("{id:int}")]
        public IActionResult UpdateHospital(int id, [FromBody] UpdateHospitalDto dto)
        {
            bool updated = _hospitalList.Update(id, dto.Name, dto.Location, dto.AvailableBeds, dto.PhoneNumber, dto.LocationNodeId);
            if (!updated)
                return NotFound(new { message = "تعذر التحديث؛ المستشفى غير موجود" });

            return Ok(new { message = "تم تحديث بيانات المستشفى بنجاح" });
        }

        [HttpDelete("{id:int}")]
        public IActionResult DeleteHospital(int id)
        {
            bool deleted = _hospitalList.Delete(id);
            if (!deleted)
                return NotFound(new { message = "تعذر الحذف؛ المستشفى غير موجود" });

            return Ok(new { message = "تم حذف المستشفى بنجاح" });
        }

        // ================= 2. بلاغات الطوارئ والأولوية =================

        [HttpGet("requests")]
        public IActionResult GetAllRequests()
        {
            return Ok(_requestManager.GetAll());
        }

        [HttpGet("requests/waiting")]
        public IActionResult GetWaitingRequests()
        {
            return Ok(_requestManager.GetWaiting());
        }

        [HttpGet("requests/priority-queue")]
        public IActionResult GetPriorityQueueItems()
        {
            var items = _priorityQueue.GetAll().Select(x => new
            {
                x.RequestId,
                x.Priority,
                x.PriorityName
            });
            return Ok(items);
        }

        [HttpPost("requests")]
        public IActionResult AddEmergencyRequest([FromBody] CreateEmergencyRequestDto dto)
        {
            var req = _requestManager.AddRequest(
                dto.PatientName,
                dto.Location,
                dto.CaseType,
                dto.Severity,
                dto.BloodType,
                dto.EstimatedMinutes
            );

            _priorityQueue.Enqueue(req.Id, req.Severity);

            return Ok(new
            {
                message = "تم تسجيل بلاغ الطوارئ وإضافته لطابور الأولوية",
                request = req
            });
        }

        [HttpPost("requests/dispatch-next")]
        public IActionResult DispatchNext()
        {
            int? nextId = _priorityQueue.Dequeue();
            if (nextId == null)
                return BadRequest(new { message = "لا توجد حالات منتظرة في طابور الأولوية" });

            var req = _requestManager.SearchById(nextId.Value);
            if (req == null)
                return NotFound(new { message = "بيانات البلاغ غير موجودة" });

            req.Status = "Processing";

            bool isCritical = req.Severity == 1;
            var operatingRoomOrder = new
            {
                OrderId = $"OR-{req.Id}",
                RequestId = req.Id,
                PatientName = req.PatientName,
                BloodType = req.BloodType,
                Severity = req.Severity,
                IsCritical = isCritical,
                EstimatedMinutes = req.EstimatedMinutes,
                OperatingRoomAlert = isCritical
                    ? $"🚨 حالة حرجة: تجهيز فوري لغرفة العمليات وتحضير أكياس دم ({req.BloodType}) خلال {req.EstimatedMinutes} دقيقة!"
                    : $"تجهيز غرفة العمليات لاستقبال المريض مع تأكيد فصيلة الدم ({req.BloodType})."
            };

            return Ok(new
            {
                message = "تم إخراج الإسعاف وإرسال أمر تجهيز غرفة العمليات",
                dispatchedRequest = req,
                operatingRoomOrder
            });
        }

        [HttpPost("requests/{id:int}/enter-or")]
        public IActionResult ConfirmEnteredOperatingRoom(int id)
        {
            var req = _requestManager.SearchById(id);
            if (req == null)
                return NotFound(new { message = "البلاغ غير موجود" });

            _requestManager.MarkEnteredOperatingRoom(id);

            return Ok(new
            {
                arrivalMessage = $"✅ تم وصول المريض ({req.PatientName} • فصيلة الدم: {req.BloodType}) ودخل غرفة العمليات، وتم تسجيله ضمن حالات تم إنقاذها.",
                request = req
            });
        }

        // ================= 3. حفظ واسترجاع حالات تم إنقاذها (JSON) =================

        [HttpGet("rescued-cases")]
        public IActionResult GetRescuedCases()
        {
            lock (FileLock)
            {
                if (!System.IO.File.Exists(RescuedCasesFilePath))
                    return Ok(Array.Empty<object>());

                var json = System.IO.File.ReadAllText(RescuedCasesFilePath);
                if (string.IsNullOrWhiteSpace(json))
                    return Ok(Array.Empty<object>());

                return Content(json, "application/json");
            }
        }

        [HttpPost("rescued-cases")]
        public IActionResult SaveRescuedCases([FromBody] JsonElement rescuedCases)
        {
            lock (FileLock)
            {
                var folderPath = Path.GetDirectoryName(RescuedCasesFilePath)!;
                Directory.CreateDirectory(folderPath);

                var formattedJson = JsonSerializer.Serialize(rescuedCases, new JsonSerializerOptions
                {
                    WriteIndented = true
                });

                System.IO.File.WriteAllText(RescuedCasesFilePath, formattedJson);
                return Ok(new { message = "تم حفظ حالات تم إنقاذها في ملف JSON بنجاح" });
            }
        }

        // ================= 4. الخريطة وأقصر مسار (Graph + Dijkstra) =================

        [HttpGet("route/nearest-hospital")]
        public IActionResult GetNearestHospital([FromQuery] string city, [FromQuery] string from, [FromQuery] string lang = "ar")
        {
            Graph.Language = lang == "en" ? "en" : "ar";
            var graph = CityMaps.GetCity(city);
            var result = graph.NearestHospital(from);

            if (!result.Found)
                return NotFound(new { message = "لم يتم العثور على مسار لأقرب مستشفى" });

            return Ok(result);
        }

        [HttpGet("route/shortest")]
        public IActionResult GetShortestPath([FromQuery] string city, [FromQuery] string from, [FromQuery] string to, [FromQuery] string lang = "ar")
        {
            Graph.Language = lang == "en" ? "en" : "ar";
            var graph = CityMaps.GetCity(city);
            var result = graph.ShortestPath(from, to);

            if (!result.Found)
                return NotFound(new { message = "لم يتم العثور على مسار بين النقطتين" });

            return Ok(result);
        }

        [HttpPost("route/reset-traffic")]
        public IActionResult ResetCityTraffic([FromQuery] string city)
        {
            var graph = CityMaps.GetCity(city);
            graph.ResetTraffic();
            return Ok(new { message = "تم تصفير الزحام وإعادة أوزان الطرق الأصلية" });
        }
    }

    public class CreateHospitalDto
    {
        public string Name { get; set; } = string.Empty;
        public int Id { get; set; }
        public int AvailableBeds { get; set; }
        public string Location { get; set; } = string.Empty;
        public string PhoneNumber { get; set; } = string.Empty;
        public int LocationNodeId { get; set; }
        public bool AddFirst { get; set; } = false;
    }

    public class UpdateHospitalDto
    {
        public string Name { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public int AvailableBeds { get; set; }
        public string PhoneNumber { get; set; } = string.Empty;
        public int? LocationNodeId { get; set; }
    }

    public class CreateEmergencyRequestDto
    {
        public string PatientName { get; set; } = string.Empty;
        public string Location { get; set; } = string.Empty;
        public string CaseType { get; set; } = "Emergency";
        public int Severity { get; set; } = 1;
        public string BloodType { get; set; } = "O+";
        public int EstimatedMinutes { get; set; } = 3;
    }
}
