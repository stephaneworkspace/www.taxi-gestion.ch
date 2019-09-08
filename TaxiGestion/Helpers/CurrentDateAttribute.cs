using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Helpers
{
    public class CurrentDateAttribute : ValidationAttribute
    {
        public CurrentDateAttribute()
        {
        }

        // Simple comparaison, il faut aussi tester la période compta, la il faut s'accrocher il y a des requête à faire
        public override bool IsValid(object value)
        {
            // Date value
            var dt = (DateTime)value;
            var dtDate = int.Parse(dt.ToString("yyyyMMdd"));
            DateTime now = DateTime.Now;
            var dateNow = int.Parse(now.ToString("yyyyMMdd"));
            if (dtDate >= dateNow) //dt >= DateTime.Now])
            {
                return true;
            }
            return false;
        }
    }
}
