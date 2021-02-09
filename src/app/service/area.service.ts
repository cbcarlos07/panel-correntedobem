import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AreaService {
	private webService: string
  	constructor(private _http: HttpClient) { 
		this.webService = `${environment.api}/area`
	}

	get(){
		return this._http.get( this.webService )
	}

	save(obj: any){
		return this._http.post(this.webService, obj)
	}

	getById(id: number){
		return this._http.get(`${this.webService}/${id}`)
	}

	update(id: number, obj: any){
		return this._http.put(`${this.webService}/${id}`, obj)
	}

	delete(id: number){
		return this._http.delete(`${this.webService}/${id}`)
	}
}
