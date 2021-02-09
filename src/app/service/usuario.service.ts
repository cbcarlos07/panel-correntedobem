import { HttpClient } from '@angular/common/http';
import { EventEmitter, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { tap } from 'rxjs/operators';
@Injectable({
	providedIn: 'root'
})
export class UsuarioService {
	
	private webService: string
	private host: string
	public notifierLogin  = new EventEmitter()
	private notifierLogout = new EventEmitter()
	constructor(private _http: HttpClient,
				private _router: Router
		) { 
		this.webService = `${environment.api}/usuario`
		this.host = environment.host
  	}

	carregarNome(){
		return localStorage.getItem('name')
	}

	verifySession(){
		return localStorage.getItem('name') !=  undefined
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

	getById(id: number){
		return this._http.get(`${this.webService}/${id}`)
	}

	delete(id: number){
		return this._http.delete(`${this.webService}/${id}`)
	}

	auth(obj: any){
		return this._http.post(`${this.host}/auth`,obj)
				   .pipe(
					   	tap((result: any)=>{
							if(result.status){
								localStorage.setItem('token', result.token)
								localStorage.setItem('email', result.email)
								localStorage.setItem('name', result.name)
							}
					   	})
				   )
	}

	notifyLogin(){
		this.notifierLogin.emit(true)
	}

	sair(){
		localStorage.clear()
		this.notifierLogout.emit()
		this._router.navigate(['/'])
	}

	handleLogin(){
		this._router.navigate( ['/'] )
	}

	getToken(){
		return localStorage.getItem('token')
	}

	setToken( token ){
		localStorage.setItem('token', token)
	}

	handleForbiden(){
		this._router.navigate( ['/forbiden'] )
	}
}
