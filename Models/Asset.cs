using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace InventoryManagement.Models;

public partial class Asset
{
    [Key]
    public int AssetId { get; set; }

    [Required]
    public string AssetName { get; set; } = null!;
    
    public string SerialNumber { get; set; } = null!;
    [ForeignKey("CategoryID")]
    public int? CategoryId { get; set; }

    [ForeignKey("EmployeeID")]
    public int? EmployeeId { get; set; }

    public string? Status { get; set; }

    public DateTime? PurchaseDate { get; set; }

    public decimal? Price { get; set; }

    public virtual Category? Category { get; set; }

    public virtual Employee? Employee { get; set; }
}
