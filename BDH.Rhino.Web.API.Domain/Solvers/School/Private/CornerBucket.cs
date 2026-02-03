namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class CornerBucket
    {
        public double Y { get; }
        public int Valence { get; set; }

        public bool SearchedFromNorthEast { get; set; }
        public bool SearchedFromSouthEast { get; set; }
        public bool SearchedFromSouthWest { get; set; }
        public bool SearchedFromNorthWest { get; set; }

        public CornerBucket(double y)
        {
            Y = y;
        }

        public void Increment(SearchDirection searchDirection)
        {
            Valence++;
            switch (searchDirection)
            {
                case SearchDirection.NorthEast:
                    SearchedFromNorthEast = true;
                    break;
                case SearchDirection.SouthEast:
                    SearchedFromSouthEast = true;
                    break;
                case SearchDirection.SouthWest:
                    SearchedFromSouthWest = true;
                    break;
                case SearchDirection.NorthWest:
                    SearchedFromNorthWest = true;
                    break;
                default:
                    throw new NotImplementedException();
            }
        }
    }
}
