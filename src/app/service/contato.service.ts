import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContatoService {

	private webService: string
	constructor(private _http: HttpClient) { 
		this.webService = `${environment.api}/email-contact`
	}

	getAll(){
		return this._http.get(this.webService)
	}

	getById(id: number){
		return this._http.get(`${this.webService}/${id}`)
	}

	reenviar(id: number){
		return this._http.get(`${this.webService}/reenviar/${id}`)
	}
}
