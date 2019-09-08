using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;
using TaxiGestion.Helpers;

namespace TaxiGestion.Dto.TGC
{
    public class DtoTGC002InpDC20JournalForCreate
    {
        [Required(ErrorMessage = "Le champ « {0} » est obligatoire.")]
        [DisplayName("Date de comptabilisation")]
        [CurrentDate(ErrorMessage = "Le champ « {0} » doit être supérieur à la date du jour")]
        // a faire d'autres tests (période compta par exe)
        public DateTime DateCompta { get; set; }
    }
}
