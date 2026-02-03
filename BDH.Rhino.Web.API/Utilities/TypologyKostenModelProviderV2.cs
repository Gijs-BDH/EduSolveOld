using BDH.Rhino.Web.API.Data;
using BDH.Rhino.Web.API.Domain.Interfaces;

namespace BDH.Rhino.Web.API.Utilities
{
    public class TypologyKostenModelProviderFromDataBase : ITypologieKostenModelProvider
    {
        private readonly BDHRhinoWebContext context;
        private readonly UserUtility userUtility;

        public TypologyKostenModelProviderFromDataBase(BDHRhinoWebContext context, UserUtility userUtility)
        {
            this.context = context;
            this.userUtility = userUtility;
        }


        public bool Request(string name, out ITypologieKostenModel? model)
        {
            var user = userUtility.GetLoggedInUser();
            if (user is null)
            {
                model = context.EnumerateBouwconceptenAnonymous(false).FirstOrDefault(c => c.Name == name)?.ToTypology();
            }
            else
            {
                model = context.EnumerateBouwconceptenForUser(user.EmailAdress, false).FirstOrDefault(c => c.Name == name)?.ToTypology();
            }

            return model != null;
        }
    }
}
