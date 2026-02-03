using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Schema.Requests;
using BDH.Rhino.Web.API.Schema.Responses;
using BDH.Rhino.Web.API.Utilities;
using BDH.Shared.Extensions;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BouwConceptenController : BaseController
    {
        public BouwConceptenController(BDHRhinoWebContext context, UserUtility userUtility) : base(context, userUtility)
        {

        }


        //==== CREATE
        // POST: api/<BouwConceptController>
        [HttpPost]
        public IActionResult Create([FromForm] CreateNewBouwconceptRequest request)
        {
            if (!ModelState.IsValid || string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest(ModelState);
            }

            var user = this.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            if (!Request.Form.Files.Any())
            {
                return BadRequest("No .glb geometry provided.");
            }

            var file = Request.Form.Files[0];

            var fileBytes = Array.Empty<byte>();
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
            }

            var geometry = new BuildingConceptGeometry()
            {
                Id = Guid.NewGuid(),
                Data = fileBytes
            };

            var company = context.Users!
                .Include(u => u.Company)
                .ThenInclude(c => c.Catalogs)
                .First(u => u.EmailAdress == user.EmailAdress).Company;
            var catalog = company.Catalogs.FirstOrDefault(c => c.Id == request.CatalogId);
            if (catalog is null)
            {
                return NotFound("Specified building catalog not found.");
            }
            var newConcept = new BuildingConcept()
            {
                Id = Guid.NewGuid(),
                Catalog = catalog,
                Name = request.Name,
                Geometry = geometry,
                Owner = company,
                CreatedBy = user,
                BvoPerUnit = request.BvoPerUnit,
                M3PerUnit = request.M3PerUnit,
                Width = request.Width,
                Depth = request.Depth,
                Height = request.Height,
                GlazingFactor = request.GlazingFactor,
                ProductieKostenPerUnit = request.ProductieKostenPerUnit,
                WoningenPerUnit = request.WoningenPerUnit,
                MeerprijsBENG = request.MeerprijsBeng,
                MeerprijsEPC = request.MeerprijsEpc,
                Stapelbaar = request.Stapelbaar,
                IsPrivate = request.IsPrivate,
            };


            context.Add(newConcept);
            context.Add(geometry);

            context.SaveChanges();

            return Ok();
        }





        //===== READ
        // GET: api/<BouwConceptController>
        [HttpGet]
        public IActionResult Get()
        {
            var response = new BuildingConceptInformationArrayResponse()
            {
                BuildingConcepts = new List<BuildingConceptInformationResponse>()
            };

            var user = base.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .First(u => u.EmailAdress == user.EmailAdress);

            var company = userEntity.Company;
            var userConcepten = context.Bouwconcepten!
                .Include(c => c.Owner)
                .Include(c => c.CreatedBy)
                .Where(c => !c.IsPrivate || c.Owner.Name == company.Name)
                .ToList();

            var conceptenRespnse = userConcepten
                .Select(c =>
                {
                    var isFavorited = context.UserFavorites!
                        .Include(v => v.Bouwconcept)
                        .Include(v => v.User)
                        .FirstOrDefault(u => u.Bouwconcept.Id == c.Id && u.User.EmailAdress == user.EmailAdress) != null;
                    return new BuildingConceptInformationResponse(c, c.CreatedBy.EmailAdress, c.Owner.Name, isFavorited);
                });

            response.BuildingConcepts = conceptenRespnse;
            return Ok(response);
        }
        // GET: api/<BouwConceptController>/company
        [HttpGet("company")]
        public IActionResult GetCompany()
        {
            var response = new BuildingConceptInformationArrayResponse()
            {
                BuildingConcepts = new List<BuildingConceptInformationResponse>()
            };

            var user = base.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .First(u => u.EmailAdress == user.EmailAdress);

            var company = userEntity.Company;
            var userConcepten = context.Bouwconcepten!
                .Include(c => c.Owner)
                .Include(c => c.CreatedBy)
                .Where(c => c.Owner.Name == company.Name)
                .ToList();

            var conceptenRespnse = userConcepten
                .Select(c =>
                {
                    var isFavorited = context.UserFavorites!
                        .Include(v => v.Bouwconcept)
                        .Include(v => v.User)
                        .FirstOrDefault(u => u.Bouwconcept.Id == c.Id && u.User.EmailAdress == user.EmailAdress) != null;
                    return new BuildingConceptInformationResponse(c, c.CreatedBy.EmailAdress, c.Owner.Name, isFavorited);
                });

            response.BuildingConcepts = conceptenRespnse;
            return Ok(response);
        }

        // GET api/<BouwConceptController>/5
        [HttpGet("{id}")]
        public IActionResult Get(string id)
        {
            var user = base.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userConcept = context
                .EnumerateBouwconceptenForUser(user.EmailAdress, false)
                .FirstOrDefault(c => c.Id.ToString() == id);
            if (userConcept is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }
            var isFavorited = context.UserFavorites!
                .Include(v => v.Bouwconcept)
                .Include(v => v.User)
                .FirstOrDefault(u => u.Bouwconcept.Id == userConcept.Id && u.User.EmailAdress == user.EmailAdress) != null;
            return Ok(new BuildingConceptInformationResponse(userConcept, userConcept.CreatedBy.EmailAdress, userConcept.Owner.Name, isFavorited));
        }


        // GET api/<BouwConceptController>/geometry/5
        [HttpGet("geometry/{id}")]
        public IActionResult Geometry(string id)
        {
            var user = base.GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userConcept = context.EnumerateBouwconceptenForUser(user.EmailAdress, true)
                .FirstOrDefault(c => c.Id.ToString() == id);
            if (userConcept is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            return File(userConcept.Geometry.Data, "model/glb-binary");
        }


        //====== UPDATE
        // POST api/<BouwConceptController>/update/5
        [HttpPost("update")]
        public IActionResult Update([FromBody] UpdateBouwconceptRequest model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = GetLoggedInUser();
            if (user == null)
            {
                return UserNotLoggedInResult();
            }

            var userEntity = context.Users!
                .Include(u => u.Company)
                .ThenInclude(c => c.Catalogs)
                .First(u => u.EmailAdress == user.EmailAdress);
            var catalog = userEntity.Company.Catalogs
                .FirstOrDefault(c => c.Id == model.CatalogId);
            if (catalog is null)
            {
                return NotFound("Specified catalog not found.");
            }

            var entity = context.Bouwconcepten!
                .Include(c => c.Owner)
                .Where(c => c.Owner.Name == userEntity.Company.Name)
                .FirstOrDefault(c => c.Id.ToString() == model.Id);
            if (entity is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            entity.Name = model.Name;
            entity.Catalog = catalog;
            entity.BvoPerUnit = model.BvoPerUnit;
            entity.WoningenPerUnit = model.WoningenPerUnit;
            entity.M3PerUnit = model.M3PerUnit;
            entity.ProductieKostenPerUnit = model.ProductieKostenPerUnit;
            entity.MeerprijsBENG = model.MeerprijsBeng;
            entity.MeerprijsEPC = model.MeerprijsEpc;
            entity.GlazingFactor = model.GlazingFactor;
            entity.Stapelbaar = model.Stapelbaar;
            entity.IsPrivate = model.IsPrivate;
            entity.Width = model.Width;
            entity.Depth = model.Depth;
            entity.Height = model.Height;

            context.SaveChanges();
            return Ok();
        }


        [HttpPost("upload")]
        public IActionResult UploadGeometry([FromForm] string id, [FromForm] double modelWidth, [FromForm] double modelDepth, [FromForm] double modelHeight)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userProductEntity = context
                .EnumerateBouwconceptenForUser(user.EmailAdress, true)
                .FirstOrDefault(x => x.Id.ToString() == id);
            if (userProductEntity is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            var file = Request.Form.Files[0];

            var fileBytes = Array.Empty<byte>();
            using (var ms = new MemoryStream())
            {
                file.CopyTo(ms);
                fileBytes = ms.ToArray();
            }

            userProductEntity.Geometry.Data = fileBytes;
            userProductEntity.Width = modelWidth;
            userProductEntity.Depth = modelDepth;
            userProductEntity.Height = modelHeight;

            context.Update(userProductEntity.Geometry);
            context.SaveChanges();

            return Ok();
        }

        [HttpPut("setPrivate")]
        public IActionResult SetPrivate(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userProductEntity = context
                .EnumerateBouwconceptenForUser(user.EmailAdress, true)
                .FirstOrDefault(x => x.Id.ToString() == id);
            if (userProductEntity is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            userProductEntity.IsPrivate = true;
            context.Update(userProductEntity);
            context.SaveChanges();
            return Ok(userProductEntity);
        }
        [HttpPut("setPublic")]
        public IActionResult SetPublic(string id)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userProductEntity = context
                .EnumerateBouwconceptenForUser(user.EmailAdress, true)
                .FirstOrDefault(x => x.Id.ToString() == id);
            if (userProductEntity is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            userProductEntity.IsPrivate = false;
            context.Update(userProductEntity);
            context.SaveChanges();
            return Ok(userProductEntity);
        }

        //===== DELETE
        // DELETE api/<BouwConceptController>/5
        [HttpPost("delete")]
        public IActionResult Remove([FromBody] RemoveBouwconceptRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var user = GetLoggedInUser();
            if (user is null)
            {
                return UserNotLoggedInResult();
            }

            var userProductEntity = context
                .EnumerateBouwconceptenForUser(user.EmailAdress, true)
                .FirstOrDefault(x => x.Id.ToString() == request.Id);
            if (userProductEntity is null)
            {
                return ModelNotFoundOrForbiddenResult();
            }

            base.context.Bouwconcepten!.Remove(userProductEntity);
            base.context.BouwconceptGeometries!.Remove(userProductEntity.Geometry);
            base.context.SaveChanges();

            return Ok();
        }
    }
}