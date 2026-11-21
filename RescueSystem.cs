using System;
using System.Collections.Generic;

namespace RescueSystem
{
    public class PathResult
    {
        public List<string> Path { get; set; } = new List<string>();
        public int Distance { get; set; }
        public bool Found { get; set; }
    }

    public class Graph
    {
        private const int INF = int.MaxValue;

        public static string Language = "ar";

        private readonly string[] namesAr;
        private readonly string[] namesEn;
        private readonly bool[] isHospital;
        private readonly int[,] baseMatrix;
        private int[,] matrix;
        private int count = 0;
        private int[] dist = Array.Empty<int>();
        private int[] prev = Array.Empty<int>();

        public Graph(int size)
        {
            namesAr = new string[size];
            namesEn = new string[size];
            isHospital = new bool[size];
            baseMatrix = new int[size, size];
            matrix = new int[size, size];
        }

        public int AddNode(string ar, string en, bool hospital)
        {
            namesAr[count] = ar;
            namesEn[count] = en;
            isHospital[count] = hospital;
            count++;
            return count - 1;
        }

        public void AddRoad(int a, int b, int minutes)
        {
            baseMatrix[a, b] = minutes;
            baseMatrix[b, a] = minutes;
            matrix[a, b] = minutes;
            matrix[b, a] = minutes;
        }

        public void SetTraffic(int a, int b, int multiplier = 2)
        {
            if (baseMatrix[a, b] > 0)
            {
                int trafficCost = baseMatrix[a, b] * Math.Max(1, multiplier);
                matrix[a, b] = trafficCost;
                matrix[b, a] = trafficCost;
            }
        }

        public void BlockRoad(int a, int b)
        {
            matrix[a, b] = 0;
            matrix[b, a] = 0;
        }

        public void ResetTraffic()
        {
            matrix = (int[,])baseMatrix.Clone();
        }

        public string[] GetNodeNames()
        {
            string[] result = new string[count];
            for (int i = 0; i < count; i++)
                result[i] = NameOf(i);
            return result;
        }

        public PathResult ShortestPath(string from, string to)
        {
            int start = IndexOf(from);
            int end = IndexOf(to);
            if (start == -1 || end == -1) return new PathResult();

            Dijkstra(start);
            return BuildResult(end);
        }

        public PathResult NearestHospital(string from)
        {
            int start = IndexOf(from);
            if (start == -1) return new PathResult();

            Dijkstra(start);

            int best = -1;
            for (int i = 0; i < count; i++)
            {
                if (isHospital[i] && dist[i] != INF)
                {
                    if (best == -1 || dist[i] < dist[best])
                        best = i;
                }
            }

            if (best == -1) return new PathResult();
            return BuildResult(best);
        }

        private void Dijkstra(int start)
        {
            dist = new int[count];
            prev = new int[count];
            bool[] visited = new bool[count];

            for (int i = 0; i < count; i++)
            {
                dist[i] = INF;
                prev[i] = -1;
            }
            dist[start] = 0;

            for (int step = 0; step < count; step++)
            {
                int u = -1;
                for (int i = 0; i < count; i++)
                {
                    if (!visited[i] && dist[i] != INF && (u == -1 || dist[i] < dist[u]))
                        u = i;
                }
                if (u == -1) break;

                visited[u] = true;

                for (int v = 0; v < count; v++)
                {
                    if (matrix[u, v] > 0 && !visited[v])
                    {
                        int newDist = dist[u] + matrix[u, v];
                        if (newDist < dist[v])
                        {
                            dist[v] = newDist;
                            prev[v] = u;
                        }
                    }
                }
            }
        }

        private PathResult BuildResult(int end)
        {
            PathResult result = new PathResult();
            if (dist[end] == INF) return result;

            int current = end;
            while (current != -1)
            {
                result.Path.Add(NameOf(current));
                current = prev[current];
            }
            result.Path.Reverse();
            result.Distance = dist[end];
            result.Found = true;
            return result;
        }

        private string NameOf(int i)
        {
            return Language == "en" ? namesEn[i] : namesAr[i];
        }

        private int IndexOf(string name)
        {
            for (int i = 0; i < count; i++)
            {
                if (namesAr[i] == name || namesEn[i] == name) return i;
            }
            return -1;
        }
    }

    public static class CityMaps
    {
        private static readonly Graph cairo = BuildCairo();
        private static readonly Graph damietta = BuildDamietta();
        private static readonly Graph alex = BuildAlexandria();
        private static readonly Graph dakahlia = BuildDakahlia();
        private static readonly Graph giza = BuildGiza();

        public static Graph GetCity(string city)
        {
            return city switch
            {
                "القاهرة" or "Cairo" => cairo,
                "الإسكندرية" or "Alexandria" => alex,
                "الدقهلية" or "Dakahlia" => dakahlia,
                "الجيزة" or "Giza" => giza,
                _ => damietta
            };
        }

        public static string[] GetCityNames()
        {
            if (Graph.Language == "en")
                return new string[] { "Cairo", "Damietta & New Damietta", "Alexandria", "Dakahlia", "Giza" };
            return new string[] { "القاهرة", "دمياط ودمياط الجديدة", "الإسكندرية", "الدقهلية", "الجيزة" };
        }

        private static Graph BuildCairo()
        {
            Graph g = new Graph(8);

            int ainShams = g.AddNode("مستشفى عين شمس التخصصي", "Ain Shams Specialized Hospital", true);
            int qasrAlAiny = g.AddNode("مستشفى القصر العيني", "Qasr Al-Ainy Hospital", true);
            int nasrHospital = g.AddNode("مستشفى مدينة نصر التخصصي", "Nasr City Specialized Hospital", true);
            int heliopolis = g.AddNode("مصر الجديدة", "Heliopolis", false);
            int downtown = g.AddNode("وسط البلد / التحرير", "Downtown / Tahrir", false);
            int nasrCity = g.AddNode("مدينة نصر", "Nasr City", false);
            int maadi = g.AddNode("المعادي", "Maadi", false);
            int fifth = g.AddNode("التجمع الخامس", "Fifth Settlement", false);

            g.AddRoad(ainShams, heliopolis, 3);
            g.AddRoad(heliopolis, downtown, 5);
            g.AddRoad(qasrAlAiny, downtown, 4);
            g.AddRoad(downtown, nasrCity, 6);
            g.AddRoad(heliopolis, nasrCity, 4);
            g.AddRoad(nasrCity, nasrHospital, 3);
            g.AddRoad(nasrCity, maadi, 7);
            g.AddRoad(qasrAlAiny, maadi, 6);
            g.AddRoad(maadi, fifth, 8);
            g.AddRoad(nasrHospital, fifth, 5);

            return g;
        }

        private static Graph BuildDamietta()
        {
            Graph g = new Graph(10);

            int damiettaHospital = g.AddNode("مستشفى دمياط التخصصي", "Damietta Specialized Hospital", true);
            int azhar = g.AddNode("مستشفى الأزهر الجامعي (دمياط الجديدة)", "Al-Azhar University Hospital (New Damietta)", true);
            int kafrSaad = g.AddNode("مستشفى كفر سعد المركزي", "Kafr Saad Central Hospital", true);
            int rasElBar = g.AddNode("رأس البر", "Ras El Bar", false);
            int seaStreet = g.AddNode("شارع البحر", "Al-Bahr Street", false);
            int newDam12 = g.AddNode("دمياط الجديدة (الحي الأول والثاني)", "New Damietta (Districts 1 & 2)", false);
            int newDam34 = g.AddNode("الحي الثالث والرابع (دمياط الجديدة)", "Districts 3 & 4 (New Damietta)", false);
            int distinguished = g.AddNode("الحي المتميز والجامعة (دمياط الجديدة)", "Distinguished District & University (New Damietta)", false);
            int downtownDam = g.AddNode("وسط دمياط", "Downtown Damietta", false);
            int faraskour = g.AddNode("فارسكور", "Faraskour", false);

            g.AddRoad(seaStreet, rasElBar, 4);
            g.AddRoad(seaStreet, newDam12, 4);
            g.AddRoad(seaStreet, damiettaHospital, 3);
            g.AddRoad(rasElBar, damiettaHospital, 4);
            g.AddRoad(damiettaHospital, downtownDam, 2);
            g.AddRoad(newDam12, azhar, 3);
            g.AddRoad(newDam12, newDam34, 2);
            g.AddRoad(azhar, newDam34, 3);
            g.AddRoad(newDam34, downtownDam, 5);
            g.AddRoad(azhar, distinguished, 3);
            g.AddRoad(distinguished, newDam34, 4);
            g.AddRoad(downtownDam, faraskour, 5);
            g.AddRoad(downtownDam, kafrSaad, 4);
            g.AddRoad(kafrSaad, faraskour, 4);

            return g;
        }

        private static Graph BuildAlexandria()
        {
            Graph g = new Graph(7);

            int eastCity = g.AddNode("مستشفى شرق المدينة", "East Alexandria Hospital", true);
            int miri = g.AddNode("المستشفى الرئيسي الجامعي (الميري)", "Main University Hospital (Al-Miri)", true);
            int amreya = g.AddNode("مستشفى العامرية العام", "Amreya General Hospital", true);
            int montaza = g.AddNode("المنتزه والمعمورة", "Montaza & Maamoura", false);
            int smouha = g.AddNode("سموحة وسيدي جابر", "Smouha & Sidi Gaber", false);
            int raml = g.AddNode("محطة الرمل", "Mahattet El Raml", false);
            int agami = g.AddNode("العجمي", "Agami", false);

            g.AddRoad(montaza, eastCity, 4);
            g.AddRoad(eastCity, smouha, 4);
            g.AddRoad(smouha, raml, 4);
            g.AddRoad(smouha, miri, 3);
            g.AddRoad(raml, miri, 3);
            g.AddRoad(miri, agami, 6);
            g.AddRoad(agami, amreya, 5);

            return g;
        }

        private static Graph BuildDakahlia()
        {
            Graph g = new Graph(7);

            int talkha = g.AddNode("مستشفى طلخا المركزي", "Talkha Central Hospital", true);
            int mansouraHospital = g.AddNode("مستشفى المنصورة الجامعي", "Mansoura University Hospital", true);
            int mitGhamr = g.AddNode("مستشفى ميت غمر العام", "Mit Ghamr General Hospital", true);
            int newMansoura = g.AddNode("المنصورة الجديدة", "New Mansoura", false);
            int universityDistrict = g.AddNode("حي الجامعة (المنصورة)", "Mansoura University District", false);
            int dekernes = g.AddNode("دكرنس", "Dekernes", false);
            int senbellawein = g.AddNode("السنبلاوين", "Senbellawein", false);

            g.AddRoad(talkha, newMansoura, 7);
            g.AddRoad(talkha, mansouraHospital, 3);
            g.AddRoad(mansouraHospital, universityDistrict, 2);
            g.AddRoad(universityDistrict, dekernes, 5);
            g.AddRoad(dekernes, senbellawein, 4);
            g.AddRoad(mansouraHospital, senbellawein, 5);
            g.AddRoad(senbellawein, mitGhamr, 5);

            return g;
        }

        private static Graph BuildGiza()
        {
            Graph g = new Graph(8);

            int sheikhZayedHospital = g.AddNode("مستشفى الشيخ زايد التخصصي", "Sheikh Zayed Specialized Hospital", true);
            int omElMasryeen = g.AddNode("مستشفى أم المصريين", "Om El Masryeen Hospital", true);
            int octoberHospital = g.AddNode("مستشفى 6 أكتوبر الجامعي", "6th of October University Hospital", true);
            int sheikhZayed = g.AddNode("الشيخ زايد", "Sheikh Zayed", false);
            int dokki = g.AddNode("الدقي والمهندسين", "Dokki & Mohandessin", false);
            int october = g.AddNode("6 أكتوبر", "6th of October", false);
            int haram = g.AddNode("الهرم وفيصل", "Haram & Faisal", false);
            int badrashin = g.AddNode("البدرشين", "Badrashin", false);

            g.AddRoad(sheikhZayedHospital, sheikhZayed, 3);
            g.AddRoad(sheikhZayed, dokki, 6);
            g.AddRoad(sheikhZayed, october, 4);
            g.AddRoad(dokki, omElMasryeen, 4);
            g.AddRoad(october, octoberHospital, 3);
            g.AddRoad(october, haram, 5);
            g.AddRoad(omElMasryeen, haram, 3);
            g.AddRoad(haram, badrashin, 7);

            return g;
        }
    }
}

