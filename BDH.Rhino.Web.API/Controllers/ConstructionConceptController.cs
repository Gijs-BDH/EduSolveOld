using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Entities;
using BDH.Rhino.Web.API.Utilities;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BDH.Rhino.Web.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ConstructionConceptController : BaseController
    {
        public ConstructionConceptController(BDHRhinoWebContext context, UserUtility userUtility) : base(context, userUtility)
        {

        }



        [HttpPost("new-manufacturer")]
        public IActionResult CreateManufacturer([FromBody] NewConstructionConceptManufacturerRequest request)
        {
            if (string.IsNullOrWhiteSpace(request.Name))
            {
                return BadRequest();
            }

            var manufacturer = new ConstructionConceptProducer()
            {
                Id = Guid.NewGuid(),
                Name = request.Name
            };
            this.context.Add(manufacturer);
            this.context.SaveChanges();
            return Ok(manufacturer);
        }

        [HttpPost("new-construction-concept")]
        public IActionResult CreateConstructionConcept([FromBody] NewConstructionConceptRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var manufacturer = this.context.ConstructionConceptProducers
                .Include(c => c.Products)
                .FirstOrDefault(c => c.Id == request.ManufacturerId);
            if (manufacturer is null)
            {
                return NotFound();
            }

            var concept = new ConstructionConcept()
            {
                Id = Guid.NewGuid(),
                Name = request.Name,
                SpanLength = request.SpanLength,
                SpanWidth = request.SpanWidth
            };
            manufacturer.Products.Add(concept);
            this.context.ConstructionConcepts.Add(concept);
            this.context.SaveChanges();
            return Ok(concept);
        }



        [HttpPost("update-concept")]
        public IActionResult UpdateConcept([FromBody] UpdateConstructionConceptRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest();
            }

            var concept = this.context.ConstructionConcepts
                .FirstOrDefault(c => c.Id == request.ConceptId);
            if (concept is null)
            {
                return NotFound();
            }

            concept.Name = request.Name;
            concept.SpanLength = request.SpanLength;
            concept.SpanWidth = request.SpanWidth;
            this.context.Update(concept);
            this.context.SaveChanges();
            return Ok(concept);
        }



        [HttpGet("manufacturers")]
        public IActionResult Get()
        {
            var producers = this.context.ConstructionConceptProducers
                .Include(c => c.Products);
            return Ok(producers);
        }

        [HttpGet]
        public IActionResult Get([FromQuery] Guid manufacturerId)
        {
            if (manufacturerId.Equals(Guid.Empty))
            {
                var concepts = this.context.ConstructionConcepts;
                return Ok(concepts);
            }

            var manufacturer = this.context.ConstructionConceptProducers
                .Include(c => c.Products)
                .FirstOrDefault(c => c.Id == manufacturerId);
            if (manufacturer is null)
            {
                return BadRequest("Unknown manufacturer id");
            }

            return Ok(manufacturer.Products);
        }

        [HttpGet("component")]
        public IActionResult GetComponent([FromQuery] Guid conceptId)
        {
            var component = this.context.ConstructionConcepts
                .FirstOrDefault(c => c.Id == conceptId);
            if (component is null)
            {
                return NotFound();
            }

            return Ok(component);
        }



        [HttpDelete("component")]
        public IActionResult DeleteComponent([FromQuery] Guid id)
        {
            var component = this.context.ConstructionConcepts
                .FirstOrDefault(c => c.Id == id);
            if (component is null)
            {
                return NotFound();
            }

            this.context.Remove(component);
            this.context.SaveChanges();

            return Ok();
        }

        [HttpDelete("manufacturer")]
        public IActionResult DeleteManufacturer([FromQuery] Guid id)
        {
            var manufacturer = this.context.ConstructionConceptProducers
               .Include(c => c.Products)
               .FirstOrDefault(c => c.Id == id);
            if (manufacturer is null)
            {
                return BadRequest("Unknown manufacturer id");
            }

            this.context.RemoveRange(manufacturer.Products);
            this.context.Remove(manufacturer);
            this.context.SaveChanges();

            return Ok();
        }
    }

    public class NewConstructionConceptManufacturerRequest
    {
        public string Name { get; set; } = null!;
    }

    public class NewConstructionConceptRequest
    {
        public string Name { get; set; } = null!;
        public double SpanWidth { get; set; }
        public double SpanLength { get; set; }
        public Guid ManufacturerId { get; set; }
    }

    public class UpdateConstructionConceptRequest
    {
        public Guid ConceptId { get; set; }
        public string Name { get; set; } = null!;
        public double SpanWidth { get; set; }
        public double SpanLength { get; set; }
    }
}
