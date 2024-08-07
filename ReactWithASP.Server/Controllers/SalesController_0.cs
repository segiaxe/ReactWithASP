﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ReactWithASP.Server.Models;

namespace ReactWithASP.Server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SalesController_0 : ControllerBase
    {
        private readonly ReactWithAspContext _context;
        private readonly ILogger<SalesController_0> _logger;

        public SalesController_0(ReactWithAspContext context, ILogger<SalesController_0> logger)
        {
            _context = context;
            _logger = logger;
        }

        // GET: api/Sales
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Sale>>> GetSales()
        {
            return await _context.Sales.ToListAsync();
        }

        // GET: api/Sales/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Sale>> GetSale(int id)
        {
            var sale = await _context.Sales.FindAsync(id);

            if (sale == null)
            {
                return NotFound();
            }

            return sale;
        }

        // PUT: api/Sales/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutSale(int id, SaleDTO saleDTO)
        {
            if (id != saleDTO.SaleId)
            {
                return BadRequest();
            }

            var sale = await _context.Sales.FindAsync(id);
            if (sale == null)
            {
                return NotFound();
            }
            sale.CustomerId = saleDTO.CustomerId;
            sale.ProductId = saleDTO.ProductId;
            sale.StoreId = saleDTO.StoreId;

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
        /*
                // POST: api/Sales
                // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
                [HttpPost]
                public async Task<ActionResult<Sale>> PostSale(Sale sale)
                {
                    _context.Sales.Add(sale);
                    await _context.SaveChangesAsync();

                    return CreatedAtAction("GetSale", new { id = sale.SaleId }, sale);
                }*/

        // POST: api/Sales
        [HttpPost]
        public async Task<ActionResult<Sale>> PostSale(Sale sale)
        {
            _logger.LogInformation("Received sale data: {Sale}", sale);

            if (!ModelState.IsValid)
            {
                _logger.LogWarning("Invalid model state for sale: {ModelState}", ModelState);
                return BadRequest(ModelState);
            }

            try
            {
                _context.Sales.Add(sale);
                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error occurred while saving sale");
                return StatusCode(500, "Internal server error");
            }

            return CreatedAtAction("GetSale", new { id = sale.SaleId }, sale);
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
}
