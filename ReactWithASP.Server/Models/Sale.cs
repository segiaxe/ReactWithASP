using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactWithASP.Server.Models;

[PrimaryKey("CustomerId", "ProductId", "StoreId")]
public partial class Sale
{
    [Key]
    public int CustomerId { get; set; }

    [Key]
    public int ProductId { get; set; }

    [Key]
    public int StoreId { get; set; }

    [Required]
    public DateOnly DateSold { get; set; }

    [ForeignKey("CustomerId")]
    [InverseProperty("Sales")]
    public virtual Customer Customer { get; set; } = null!;

    [ForeignKey("ProductId")]
    [InverseProperty("Sales")]
    public virtual Product Product { get; set; } = null!;

    [ForeignKey("StoreId")]
    [InverseProperty("Sales")]
    public virtual Store Store { get; set; } = null!;
}
