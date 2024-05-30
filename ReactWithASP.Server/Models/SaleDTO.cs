using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

namespace ReactWithASP.Server.Models;

public class SaleDTO
{
    [Required]
    public int SaleId { get; set; }

    [Required]
    public int CustomerId { get; set; }

    [Required]
    public int ProductId { get; set; }

    [Required]
    public int StoreId { get; set; }

    [Required]
    public DateTime DateSold { get; set; }
}
