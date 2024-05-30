using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactWithASP.Server.Models;

[Table("Product")]
public class Product
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(40)]
    public string Name { get; set; } = null!;

    [Column(TypeName = "decimal(10, 2)")]
    public decimal Price { get; set; }

    [InverseProperty("Product")]
    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}

