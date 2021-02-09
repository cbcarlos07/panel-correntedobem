import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DadosContatoService {

	private webService: string
	constructor(private _http: HttpClient) { 
		this.webService = `${environment.api}/contato`
	}

	save(data: any){
		return this._http.post(this.webService, data)
	}

	get(){
		return this._http.get(this.webService)
	}

	update(id: number, obj: any){
		return this._http.put(`${this.webService}/${id}`, obj)
	}
}
