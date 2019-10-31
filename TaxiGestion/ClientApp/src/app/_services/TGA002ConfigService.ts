import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment'
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DtoTGA002OutDA20ConfigForSelect } from '../_dto/TGA/DtoTGA002OutDA20ConfigForSelect';
import { Observable } from 'rxjs';
import { DtoTGA002InpDA20ConfigForWrite } from '../_dto/TGA/DtoTGA002InpDA20ConfigForWrite';

@Injectable(({
    providedIn: 'root',
}))
export class TGA002ConfigService {
    baseUrl = environment.apiUrl;
    httpOptions = {};

    constructor(private http: HttpClient) {
    }

    setHeaders() {
        this.httpOptions = {
        headers: new HttpHeaders({
            Authorization: 'Bearer ' + localStorage.getItem('token')
        })
        };
    }

    getConfig(): Observable<DtoTGA002OutDA20ConfigForSelect> {
        this.setHeaders();
        return this.http.get<DtoTGA002OutDA20ConfigForSelect>(this.baseUrl + 'TGA002Config/config', this.httpOptions);
    }

    postConfig(dto: DtoTGA002InpDA20ConfigForWrite) {
        this.setHeaders();
        return this.http.post<DtoTGA002InpDA20ConfigForWrite>(this.baseUrl + 'TGA002Config/config', dto, this.httpOptions);
    }
}
