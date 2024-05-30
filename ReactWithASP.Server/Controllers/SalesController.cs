using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Models;

namespace ReactWithASP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController : ControllerBase
    {
        private readonly ReactWithAspContext _context;

        public SalesController(ReactWithAspContext context)
        {
            _context = context;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<SaleDTO>>> GetSales()
        {
            return await _context.Sales
                .Include(s => s.Customer)
                .Include(s => s.Product)
                .Include(s => s.Store)
                .Select(s => new SaleDTO
                {
                    SaleId = s.SaleId,
                    CustomerId = s.CustomerId,
                    CustomerName = s.Customer.Name,
                    ProductId = s.ProductId,
                    ProductName = s.Product.Name,
                    StoreId = s.StoreId,
                    StoreName = s.Store.Name,
                    DateSold = s.DateSold
                })
                .ToListAsync();
        }

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(SaleDTO saleDto)
        {
            var sale = new Sale
            {
                CustomerId = saleDto.CustomerId,
                ProductId = saleDto.ProductId,
                StoreId = saleDto.StoreId,
                DateSold = saleDto.DateSold
            };

            _context.Sales.Add(sale);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetSale", new { id = sale.SaleId }, sale);
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, SaleDTO saleDto)
        {
            if (id != saleDto.SaleId)
            {
                return BadRequest();
            }

            var sale = new Sale
            {
                SaleId = saleDto.SaleId,
                CustomerId = saleDto.CustomerId,
                ProductId = saleDto.ProductId,
                StoreId = saleDto.StoreId,
                DateSold = saleDto.DateSold
            };

            _context.Entry(sale).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!SaleExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // DELETE: api/Sales/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }

            _context.Sales.Remove(sale);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool SaleExists(int id)
        {
            return _context.Sales.Any(e => e.SaleId == id);
        }
    }

    public class SaleDTO
    {
        public int SaleId { get; set; }
        public int CustomerId { get; set; }
        public int ProductId { get; set; }
        public int StoreId { get; set; }
        public DateTime DateSold { get; set; }
        public string CustomerName { get; set; }
        public string ProductName { get; set; }
        public string StoreName { get; set; }
    }
}
