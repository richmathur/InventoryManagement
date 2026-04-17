using System;
using System.Collections.Generic;

namespace InventoryManagement.Models;

public partial class Employee
{
    public int EmployeeId { get; set; }

    public string FullName { get; set; } = null!;

    public string? Email { get; set; }

    public string? Department { get; set; }

    public virtual ICollection<Asset> Assets { get; set; } = new List<Asset>();
}
