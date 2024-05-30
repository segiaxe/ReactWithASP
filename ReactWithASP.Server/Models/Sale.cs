using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactWithASP.Server.Models;

public partial class Sale
{
    [Key]
    [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
    public int SaleId { get; set; }

    [Required]
    public int CustomerId { get; set; }

    [Required]
    public int ProductId { get; set; }

    [Required]
    public int StoreId { get; set; }

    [Required]
    public DateTime DateSold { get; set; }

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
