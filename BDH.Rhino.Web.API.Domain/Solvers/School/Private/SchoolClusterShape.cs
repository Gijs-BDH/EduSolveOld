namespace BDH.Rhino.Web.API.Domain.Solvers.School.Private
{
    public class SchoolClusterShape
    {
        private readonly bool[,] values;

        public int Width => values.GetLength(1);
        public int Height => values.GetLength(0);
        public bool[,] Values => values;
        public IEnumerable<bool> EnumerateValues()
        {
            for (int y = 0; y < Height; y++)
            {
                for (int x = 0; x < Width; x++)
                {
                    yield return values[y, x];
                }
            }
        }

        public SchoolClusterShape(bool[,] values)
        {
            this.values = values;
        }

        public static SchoolClusterShape FromCollection(IList<bool> booleans, int shapeWidth)
        {
            if (shapeWidth == 0)
            {
                return new SchoolClusterShape(new bool[0, 0]);
            }
            var height = booleans.Count / shapeWidth;
            var values = new bool[height, shapeWidth];
            var i = 0;
            for (int y = 0; y < height; y++)
            {
                for (int x = 0; x < shapeWidth; x++)
                {
                    values[y, x] = booleans[i];
                    i++;
                }
            }
            return new SchoolClusterShape(values);
        }

        public bool GetAt(int x, int y)
        {
            return values[y, x];
        }
    }
}
