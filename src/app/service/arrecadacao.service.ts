import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ArrecadacaoService {

	private webService: string
	constructor(private _http: HttpClient) { 
		this.webService = `${environment.api}/arrecadacao`
  	}

	get(){
		return this._http.get(this.webService)
	}

	save(data: any){
		return this._http.post(this.webService, data)
	}

	update(id, data){
		return this._http.put(`${this.webService}/${id}`, data)
	}
}
