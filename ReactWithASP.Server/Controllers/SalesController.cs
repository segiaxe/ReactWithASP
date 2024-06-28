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
            var customer = _context.Customers
                .Include(p => p.Sales)
                .SingleOrDefault(a => a.Id == saleDto.CustomerId);
            var product = _context.Products
                .SingleOrDefault(a => a.Id == saleDto.ProductId);
            var store = _context.Stores
                .SingleOrDefault(a => a.Id == saleDto.StoreId);

            if (customer == null || product == null || store == null)
            {
                return BadRequest("Invalid customer, product, or store.");
            }

            //var sale = _context.Sales.
            var sale = new Sale
            {
                SaleId = saleDto.SaleId,
                CustomerId = saleDto.CustomerId,
                ProductId = saleDto.ProductId,
                StoreId = saleDto.StoreId,
                DateSold = saleDto.DateSold,
                Customer = customer,
                Store = store,
                Product = product,
            };

            customer.Sales.Add(sale);

            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetSales), new { id = sale.SaleId }, new { sale.SaleId, sale.DateSold });
        }

        // PUT: api/Sales/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, SaleDTO saleDto)
        {
            try
            {
                if (id != saleDto.SaleId)
                {
                    return BadRequest("ID mismatch");
                }

                var customer = _context.Customers
                    .Include(p => p.Sales)
                    .SingleOrDefault(a => a.Id == saleDto.CustomerId);
                var product = _context.Products
                    .SingleOrDefault(a => a.Id == saleDto.ProductId);
                var store = _context.Stores
                    .SingleOrDefault(a => a.Id == saleDto.StoreId);

                if (customer == null || product == null || store == null)
                {
                    return BadRequest("Invalid customer, product, or store.");
                }
                //var sale = _context.Sales.
                /*var sale = new Sale
                {
                    SaleId = saleDto.SaleId,
                    CustomerId = saleDto.CustomerId,
                    ProductId = saleDto.ProductId,
                    StoreId = saleDto.StoreId,
                    DateSold = saleDto.DateSold,
                    Customer = customer,
                    Store = store,
                    Product = product,
                };
                _context.Sales.Update(sale); */

                //_context.Entry(sale).State = EntityState.Modified;

                // Update the sale properties
                var sale = _context.Sales
                    .SingleOrDefault(a => a.SaleId == saleDto.SaleId);
                if (sale == null)
                {
                    return NotFound();
                }
                sale.CustomerId = saleDto.CustomerId;
                sale.ProductId = saleDto.ProductId;
                sale.StoreId = saleDto.StoreId;
                sale.DateSold = saleDto.DateSold;

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
            catch (Exception ex)
            {
                // Log the exception
                Console.WriteLine($"Error in PutSale: {ex}");
                return StatusCode(500, "An error occurred while processing your request.");
            }
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
        public string? CustomerName { get; set; }
        public string? ProductName { get; set; }
        public string? StoreName { get; set; }
    }
}
