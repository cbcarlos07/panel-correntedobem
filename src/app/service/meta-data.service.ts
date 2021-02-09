import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
	providedIn: 'root'
})
export class MetaDataService {
	
	private webService: string
  	constructor(private _http: HttpClient) { 
		this.webService = `${environment.api}/meta`
	}

	save(data: any){
		return this._http.post(this.webService, data)
	}

	getAll(){
		return this._http.get(this.webService)
	}

	update(id: number, obj: any){
		return this._http.put(`${this.webService}/${id}`, obj)
	}
}
