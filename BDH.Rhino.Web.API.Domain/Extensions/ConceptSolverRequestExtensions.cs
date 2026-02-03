using BDH.Rhino.Web.API.Domain.Solvers.Concept.Models;

namespace BDH.Rhino.Web.API.Domain.Extensions
{

    public static class ConceptSolverRequestExtensions
    {
        /// <summary>
        /// Splits one request into many. 
        /// One request to the controller returns one solution. 
        /// Because one block of building concepts may be split into mulitple parts, we need to split the request into more requests.
        /// Then one solution will be provided for each request and the design will be split into blocks.
        /// </summary>
        /// <param name="request"></param>
        /// <param name="random"></param>
        /// <returns></returns>
        public static IEnumerable<ConceptSolverRequest> Split(this ConceptSolverRequest request, Random random)
        {
            if (!request.AllowedColumnsTo.HasValue || request.Width <= request.AllowedColumnsTo.Value)
            {
                return new List<ConceptSolverRequest>() { request };
            }

            var widths = new List<int>();
            var remaining = request.Width;
            while (remaining > 0)
            {
                var minAllowed = request.AllowedColumnsFrom ?? 1;
                remaining = request.Width - widths.Sum(i => i + 1);
                if (remaining.IsInRange(minAllowed, true, request.AllowedColumnsTo.Value, true))
                {
                    widths.Add(remaining);
                    break;
                }
                else
                {
                    if (remaining < minAllowed)
                    {
                        break;
                    }

                    var segmentLength = random.Next(minAllowed, request.AllowedColumnsTo.Value);
                    segmentLength = Math.Max(minAllowed, segmentLength);
                    segmentLength = Math.Min(request.AllowedColumnsTo.Value, segmentLength);

                    widths.Add(segmentLength);
                }
            }

            var split = widths.Select(i =>
            {
                request.Width = i;
                return request;
            });

            return split;
        }

    }


}