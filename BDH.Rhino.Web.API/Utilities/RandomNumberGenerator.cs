namespace BDH.Rhino.Web.API.Utilities
{
    public class RandomNumberGenerator : IRandomNumberGenerator
    {
        public RandomNumberGenerator()
        {

        }

        public int Generate(int maxValue)
        {
            return Random.Shared.Next(maxValue);
        }
    }
}
