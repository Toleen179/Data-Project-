using System;
using System.Collections.Generic;
using System.Linq;

// تصميم طلب النجدة الواحد والمعلومات المرتبطة به
public class EmergencyRequest
{
    public int Id { get; set; }
    public string PatientName { get; set; } = string.Empty;
    public string Location { get; set; } = string.Empty;
    public string CaseType { get; set; } = string.Empty;
    public int Severity { get; set; } = 3; // 1 = Critical, 2 = Medium, 3 = Normal
    public string BloodType { get; set; } = "O+";
    public int EstimatedMinutes { get; set; } = 3;
    public DateTime Time { get; set; }
    public string Status { get; set; } = "Waiting"; // Waiting -> Processing -> EnteredOR
}

// مدير الطلبات: طابور أولوية للحالات + مصفوفة لحفظ كل الطلبات والبحث بالـ ID
public class RequestManager
{
    private readonly PriorityQueue<EmergencyRequest, (int Severity, int Id)> priorityQueue = new();
    private EmergencyRequest[] requestsArray = new EmergencyRequest[100];
    private int count = 0;
    private int nextId = 1;

    public EmergencyRequest AddRequest(
        string name,
        string location,
        string caseType,
        int severity = 3,
        string bloodType = "O+",
        int estimatedMinutes = 3)
    {
        if (count >= requestsArray.Length)
        {
            Array.Resize(ref requestsArray, requestsArray.Length * 2);
        }

        var req = new EmergencyRequest
        {
            Id = nextId++,
            PatientName = name,
            Location = location,
            CaseType = caseType,
            Severity = Math.Clamp(severity, 1, 3),
            BloodType = string.IsNullOrWhiteSpace(bloodType) ? "O+" : bloodType.Trim(),
            EstimatedMinutes = Math.Max(1, estimatedMinutes),
            Time = DateTime.Now,
            Status = "Waiting"
        };

        priorityQueue.Enqueue(req, (req.Severity, req.Id));
        requestsArray[count++] = req;
        return req;
    }

    public EmergencyRequest? ProcessNext()
    {
        if (priorityQueue.Count == 0)
            return null;

        var req = priorityQueue.Dequeue();
        req.Status = "Processing";
        return req;
    }

    public bool MarkEnteredOperatingRoom(int id)
    {
        var req = SearchById(id);
        if (req == null)
            return false;

        req.Status = "EnteredOR";
        return true;
    }

    public EmergencyRequest[] GetWaiting()
    {
        return priorityQueue.UnorderedItems
            .Select(x => x.Element)
            .OrderBy(r => r.Severity)
            .ThenBy(r => r.Id)
            .ToArray();
    }

    public EmergencyRequest[] GetAll()
    {
        var result = new EmergencyRequest[count];
        Array.Copy(requestsArray, result, count);
        return result;
    }

    public EmergencyRequest? SearchById(int id)
    {
        for (int i = 0; i < count; i++)
        {
            if (requestsArray[i].Id == id)
                return requestsArray[i];
        }
        return null;
    }
}
