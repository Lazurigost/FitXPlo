using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using TODO_LIST.Data.Models;
using todolist_api.Data;
using todolist_api.Data.Models;

namespace todolist_api.Controllers
{
    [Authorize]
    [Route("api/[controller]")]
    [ApiController]
    public class PublicationsController : ControllerBase
    {
        private readonly DataContext _context;

        public PublicationsController(DataContext context)
        {
            _context = context;
        }

        // GET: api/Publication
        
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PublicationModel>>> GetPublications()
        {
          if (_context.Publications == null)
          {
              return NotFound();
          }
            return await _context.Publications.ToListAsync();
        }
        [HttpGet("{id}")]
        public async Task<ActionResult<IEnumerable<PublicationModel>>> GetPublicationsFromUser(int id)
        {
            if (_context.Publications == null)
            {
                return NotFound();
            }
            return await _context.Publications.Where(p => p.UserId == id).ToListAsync();
        }

        // GET: api/Publication/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PublicationModel>> GetPublicationModel(int id)
        {
          if (_context.Publications == null)
          {
              return NotFound();
          }
            var publicationModel = await _context.Publications.FindAsync(id);

            if (publicationModel == null)
            {
                return NotFound();
            }

            return publicationModel;
        }

        // PUT: api/Publication/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPublicationModel(int id, PublicationModel publicationModel)
        {
            if (id != publicationModel.Id)
            {
                return BadRequest();
            }

            _context.Entry(publicationModel).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PublicationModelExists(id))
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

        // POST: api/Publication
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        public async Task<ActionResult<PublicationModel>> PostPublicationModel(PublicationModel publicationModel)
        {
          if (_context.Publications == null)
          {
              return Problem("Entity set 'DataContext.Publications'  is null.");
          }
            publicationModel.Term = DateTime.Now.AddHours(5);
            _context.Publications.Add(publicationModel);
            await _context.SaveChangesAsync();

            return CreatedAtAction("GetPublicationModel", new { id = publicationModel.Id }, publicationModel);
        }
        //[HttpPost]
        //public async Task<ActionResult<FavoriteModel>> PostFavoriteModel(FavoriteModel favoriteModel)
        //{
        //    if (_context.Publications == null)
        //    {
        //        return Problem("Entity set 'DataContext.Publications'  is null.");
        //    }
        //}

        // DELETE: api/Publication/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePublicationModel(int id)
        {
            if (_context.Publications == null)
            {
                return NotFound();
            }
            var publicationModel = await _context.Publications.FindAsync(id);
            if (publicationModel == null)
            {
                return NotFound();
            }

            _context.Publications.Remove(publicationModel);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PublicationModelExists(int id)
        {
            return (_context.Publications?.Any(e => e.Id == id)).GetValueOrDefault();
        }
    }
}
