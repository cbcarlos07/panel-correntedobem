import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class EquipeService {
	private webService: string
  	constructor(private _http: HttpClient) { 
		this.webService = `${environment.api}/equipe`
	}

	getArea(id: number){
		return this._http.get(`${this.webService}/team/area/${id}`)
	}

	save(dados: any){
		return this._http.post(`${this.webService}`, dados)
	}

	getById(id: number){
		return this._http.get(`${this.webService}/${id}`)
	}

	update(id: number, dados: any){
		return this._http.put(`${this.webService}/${id}`, dados)
	}

	delete(id: number){
		return this._http.delete(`${this.webService}/${id}`)
	}
}
