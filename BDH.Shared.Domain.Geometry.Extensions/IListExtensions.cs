namespace BDH.Shared.Domain.Geometry.Extensions
{
    public static class IListExtensions
    {
        /// <summary>
        /// Returns the next safe index of a collection. 
        /// This method wraps the negative indices as well, so -2 in a collection with the size of 5 should return 4.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="collection"></param>
        /// <param name="index"></param>
        /// <returns></returns>
        public static int NextSafeIndex<T>(this IList<T> collection, int index)
        {
            if (collection.Count == 1)
            {
                throw new Exception("Cannot calculate the next safe index if the collection has a size of 0");
            }
            var indexOfNext = index + 1;

            while (indexOfNext < 0)
                indexOfNext += collection.Count;

            indexOfNext %= collection.Count;

            return indexOfNext;
        }

        /// <summary>
        /// Returns the previous safe index of a collection. 
        /// This method wraps the negative indices as well, so -2 in a collection with the size of 5 should return 2.
        /// </summary>
        /// <typeparam name="T"></typeparam>
        /// <param name="collection"></param>
        /// <param name="index"></param>
        /// <returns></returns>
        public static int PreviousSafeIndex<T>(this IList<T> collection, int index)
        {
            if (collection.Count == 1)
            {
                throw new Exception("Cannot calculate the previous index if the collection has a size of 0");
            }
            var indexOfPrevious = index - 1;

            while (indexOfPrevious < 0)
                indexOfPrevious += collection.Count;

            indexOfPrevious %= collection.Count;

            return indexOfPrevious;
        }
    }
}