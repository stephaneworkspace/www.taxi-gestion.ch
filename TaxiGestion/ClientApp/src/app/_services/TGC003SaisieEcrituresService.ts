import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple as DtoDC31ForWriteEcritureSimple } from '../_dto/TGC/DtoTGC003InpDC31EcritureCollectiveJournalForWriteEcritureSimple';

@Injectable({
    providedIn: 'root'
})
export class TGC003SaisieEcritureService {
    baseUrl = environment.apiUrl;
    httpOptions = {};

    constructor(private http: HttpClient) {}

    setHeaders() {
        this.httpOptions = {
        headers: new HttpHeaders({
            'Authorization': 'Bearer ' + localStorage.getItem('token')
        })
        };
    }

    inscription(dto: DtoDC31ForWriteEcritureSimple) {
        this.setHeaders();
        return this.http.post<DtoDC31ForWriteEcritureSimple>(this.baseUrl + 'TGC003SaisieEcritures/saisie-ecriture-simple/', dto, this.httpOptions);
    }
}