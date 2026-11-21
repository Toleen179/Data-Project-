using System;
using System.Collections.Generic;

public class Hospital
{
    public string Name { get; set; } = string.Empty;
    public int Id { get; set; }
    public int AvailableBeds { get; set; }
    public string Location { get; set; } = string.Empty;
    public int LocationNodeId { get; set; }
    public string PhoneNumber { get; set; } = string.Empty;

    public Hospital() { }

    public Hospital(string name, int id, int availableBeds, string location, string phoneNumber, int locationNodeId = 0)
    {
        Name = name;
        Id = id;
        AvailableBeds = Math.Max(0, availableBeds);
        Location = location;
        PhoneNumber = phoneNumber;
        LocationNodeId = locationNodeId;
    }
}

public class Node
{
    public Hospital Data { get; set; }
    public Node? Next { get; set; }

    public Node(Hospital data)
    {
        Data = data;
        Next = null;
    }
}

public class SinglyLinkedList
{
    private Node? head;
    private Node? tail;

    public void AddFirst(Hospital data)
    {
        Node newNode = new Node(data);
        newNode.Next = head;
        head = newNode;
        if (tail == null)
        {
            tail = newNode;
        }
    }

    public void AddLast(Hospital data)
    {
        Node newNode = new Node(data);
        if (head == null)
        {
            head = newNode;
            tail = newNode;
        }
        else
        {
            tail!.Next = newNode;
            tail = newNode;
        }
    }

    public Hospital? Search(int id)
    {
        Node? current = head;
        while (current != null)
        {
            if (current.Data.Id == id)
                return current.Data;

            current = current.Next;
        }
        return null;
    }

    public bool Update(int id, string name, string location, int beds, string phoneNumber, int? locationNodeId = null)
    {
        Node? current = head;
        while (current != null)
        {
            if (current.Data.Id == id)
            {
                current.Data.Name = name;
                current.Data.Location = location;
                current.Data.AvailableBeds = Math.Max(0, beds);
                current.Data.PhoneNumber = phoneNumber;
                if (locationNodeId.HasValue)
                    current.Data.LocationNodeId = locationNodeId.Value;
                return true;
            }
            current = current.Next;
        }
        return false;
    }

    public bool Delete(int id)
    {
        if (head == null)
            return false;

        if (head.Data.Id == id)
        {
            head = head.Next;
            if (head == null)
                tail = null;
            return true;
        }

        Node? current = head;
        while (current.Next != null)
        {
            if (current.Next.Data.Id == id)
            {
                current.Next = current.Next.Next;
                if (current.Next == null)
                    tail = current;
                return true;
            }
            current = current.Next;
        }
        return false;
    }

    public List<Hospital> GetAll()
    {
        List<Hospital> list = new List<Hospital>();
        Node? current = head;
        while (current != null)
        {
            list.Add(current.Data);
            current = current.Next;
        }
        return list;
    }

    public void Display()
    {
        Node? current = head;
        if (current == null)
        {
            Console.WriteLine("No Hospitals Found");
            return;
        }

        while (current != null)
        {
            Console.WriteLine("Hospital Name: " + current.Data.Name);
            Console.WriteLine("Hospital ID: " + current.Data.Id);
            Console.WriteLine("Available Beds: " + current.Data.AvailableBeds);
            Console.WriteLine("Location: " + current.Data.Location);
            Console.WriteLine("Phone Number: " + current.Data.PhoneNumber);
            Console.WriteLine("----------------------");
            current = current.Next;
        }
    }
}