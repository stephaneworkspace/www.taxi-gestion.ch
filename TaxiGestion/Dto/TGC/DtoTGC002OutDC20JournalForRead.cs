using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace TaxiGestion.Dto.TGC
{
    public class DtoTGC002OutDC20JournalForRead
    {
        public int NoJournal { get; set; }
        public DateTime DateJournalisation { get; set; }
        public List<DtoTGC002OutDC21EcrituresForList> Ecriture { get; set; }
    }
}
