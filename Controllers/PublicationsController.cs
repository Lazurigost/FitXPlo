﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.CompilerServices;
using System.Threading.Tasks;
using System.Xml.Linq;
using FitXPlo.Data;
using FitXPlo.Data.Models;
using FitXPlo.DTO;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using FitXPlo.Data.Models;

namespace FitXPlo.Controllers
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
        [HttpGet("getFavorites/{id}")]
        public async Task<ActionResult<IEnumerable<PublicationModel>>> GetFavorites(int id)
        {
            var FavList = await _context.Favorites.Where(f => f.UserId == id).ToListAsync();
            var AllPubs = await _context.Publications.ToListAsync();
            List<PublicationModel> FavedPublications = new List<PublicationModel>();
            foreach (var fav in FavList)
            {
                FavedPublications.Add(AllPubs.Find(p => p.Id == fav.PublicationId));
            }
            return FavedPublications;
        }
        [AllowAnonymous]
        [HttpPost("like/{userid}/{publicationid}")]
        public async Task<ActionResult<FavoriteModel>> PostFavoriteModel(int userid, int publicationid)
        {
            var newFav = new FavoriteModel
            {
                UserId = userid,
                PublicationId = publicationid
            };
            var nullCheck = await _context.Favorites.Where(f => f.UserId == userid && f.PublicationId == publicationid).FirstOrDefaultAsync();
           if ( nullCheck == null)
            {
                _context.Favorites.Add(newFav);
                await _context.SaveChangesAsync();
            }
                
            
            return Ok();
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
        public async Task<ActionResult<PublicationModel>> PostPublicationModel(PublicationDTO publicationModel)
        {
            if (_context.Publications == null)
            {
                return Problem("Entity set 'DataContext.Publications'  is null.");
            }
            var currentUser = await _context.Users.FindAsync(publicationModel.UserId);
            if (currentUser != null)
            {
                var newPublication = new PublicationModel
                {
                    UserId = publicationModel.UserId,
                    User = await _context.Users.FindAsync(publicationModel.UserId),
                    Name = publicationModel.Name,
                    CreatorName = currentUser.Username,
                    Description = publicationModel.Description,
                    Term = DateTime.UtcNow.AddHours(5),
                    Priority = publicationModel.Priority,
                    IsDone = publicationModel.IsDone,
                    PublicationMedia = publicationModel.PublicationMedia
                };
                _context.Publications.Add(newPublication);
            }
            else
            {
                var newPublication = new PublicationModel
                {
                    UserId = publicationModel.UserId,
                    User = new UserModel { Id = 1, PasswordHash = "test", Role = new RoleModel { Id = 3, RoleName = "test" }, RoleId = 3, UserMedia = null, Username = "test" },
                    Name = publicationModel.Name,
                    Description = publicationModel.Description,
                    Term = DateTime.UtcNow.AddHours(5),
                    Priority = publicationModel.Priority,
                    IsDone = publicationModel.IsDone,
                    PublicationMedia = publicationModel.PublicationMedia
                };
                _context.Publications.Add(newPublication);
            }

            await _context.SaveChangesAsync();

            //return CreatedAtAction("GetPublicationModel", new { id = publicationModel.Id }, publicationModel);
            return Ok();
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
