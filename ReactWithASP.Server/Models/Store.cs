using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using static System.Runtime.InteropServices.JavaScript.JSType;

namespace ReactWithASP.Server.Models;


[Table("Store")]
public partial class Store
{
    [Key]
    public int Id { get; set; }

    [StringLength(40)]
    public string Name { get; set; } = null!;

    [StringLength(60)]
    public string? Address { get; set; }

    [InverseProperty("Store")]
    public virtual ICollection<Sale> Sales { get; set; } = new List<Sale>();
}

//Data Source =.; Initial Catalog = Task1; Integrated Security = True; Encrypt=True;Trust Server Certificate=True