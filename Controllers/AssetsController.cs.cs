using InventoryManagement.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
   
        public class AssetsController : ControllerBase
        {
            private readonly InventoryManagementContext _context;

            public AssetsController(InventoryManagementContext context)
            {
                _context = context;
            }

            // GET: api/Assets
            [HttpGet]
            public async Task<ActionResult<IEnumerable<Asset>>> GetAssets()
            {
                // We use .Include to join the Category and Employee tables 
                // so Angular gets names like "Laptop" instead of just ID "1"
                return await _context.Assets
                    .Include(a => a.Category)
                    .Include(a => a.Employee)
                    .ToListAsync();
            }

            // GET: api/Assets/5
            [HttpGet("{id}")]
            public async Task<ActionResult<Asset>> GetAsset(int id)
            {
                var asset = await _context.Assets
                    .Include(a => a.Category)
                    .Include(a => a.Employee)
                    .FirstOrDefaultAsync(a => a.AssetId == id);

                if (asset == null)
                {
                    return NotFound();
                }

                return asset;
            }

            // POST: api/Assets
            [HttpPost]
            public async Task<ActionResult<Asset>> PostAsset(Asset asset)
            {
                _context.Assets.Add(asset);
                await _context.SaveChangesAsync();

                return CreatedAtAction("GetAsset", new { id = asset.AssetId }, asset);
            }
        // PUT: api/Assets/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutAsset(int id ,[FromBody] Asset asset)
        {
            if (id != asset.AssetId)
            {
                return BadRequest();
            }
            _context.Entry(asset).State = EntityState.Modified;
            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!AssetExists(id))
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

        private bool AssetExists(int id)
        {
            return _context.Assets.Any(e => e.AssetId == id);
        }
    }
}