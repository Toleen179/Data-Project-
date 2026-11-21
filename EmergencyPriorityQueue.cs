using System;
using System.Collections.Generic;

namespace EmergencyRescueSystem
{
    public class PriorityNode
    {
        public int RequestId { get; set; }
        public int Priority { get; set; } // 1 = High, 2 = Medium, 3 = Low
        public PriorityNode? Next { get; set; }

        public PriorityNode(int requestId, int priority)
        {
            RequestId = requestId;
            Priority = priority;
            Next = null;
        }
    }

    public class EmergencyPriorityQueue
    {
        private PriorityNode? head;

        public bool Enqueue(int requestId, int priority)
        {
            if (priority < 1 || priority > 3)
            {
                return false;
            }

            PriorityNode newNode = new PriorityNode(requestId, priority);

            if (head == null || priority < head.Priority)
            {
                newNode.Next = head;
                head = newNode;
            }
            else
            {
                PriorityNode current = head;

                while (current.Next != null && current.Next.Priority <= priority)
                {
                    current = current.Next;
                }

                newNode.Next = current.Next;
                current.Next = newNode;
            }

            return true;
        }

        public int? Dequeue()
        {
            if (head == null)
                return null;

            int requestId = head.RequestId;
            head = head.Next;
            return requestId;
        }

        public (int RequestId, int Priority)? Peek()
        {
            if (head == null)
                return null;

            return (head.RequestId, head.Priority);
        }

        public List<(int RequestId, int Priority, string PriorityName)> GetAll()
        {
            var result = new List<(int RequestId, int Priority, string PriorityName)>();
            PriorityNode? current = head;

            while (current != null)
            {
                result.Add((current.RequestId, current.Priority, GetPriorityName(current.Priority)));
                current = current.Next;
            }

            return result;
        }

        public bool IsEmpty()
        {
            return head == null;
        }

        public string GetPriorityName(int priority)
        {
            return priority switch
            {
                1 => "High",
                2 => "Medium",
                _ => "Low"
            };
        }
    }
}