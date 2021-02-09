import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
	formLogin: FormGroup
	loginErrado: boolean
	isError: boolean
	msgError: string
	type = 'password'
	constructor(private _userService: UsuarioService,
			   private _router: Router) { }
	
	ngOnInit() {
		this.formLogin = new FormGroup({
			email: new FormControl('', {validators: [Validators.required]}),
			password: new FormControl('', {validators: [Validators.required]})
		})
	}

	onSubmit(){
		this.logar()
	}
	logar(){
		this._userService
			.auth(this.formLogin.value)
			.subscribe((response: any)=>{
				if( response.status ){
					this._router.navigate(['/area'])
					this._userService.notifyLogin()
					
					
				}else{
					this.isError = true
					this.msgError = 'Login ou senha incorretos'
				}
			})
	}

	changeType(){
		console.log('changeType');
		
		this.type = this.type == 'password' ? 'text'  : 'password'
	}
	
}
