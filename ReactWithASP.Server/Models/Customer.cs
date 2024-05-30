using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ReactWithASP.Server.Models;


[Table("Customer")]
public class Customer
{
    [Key]
    public int Id { get; set; }

    [Required]
    [StringLength(30)]
    public string Name { get; set; } // = null!;

    [StringLength(60)]
    public string? Address { get; set; }

    [InverseProperty("Customer")]
    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}
