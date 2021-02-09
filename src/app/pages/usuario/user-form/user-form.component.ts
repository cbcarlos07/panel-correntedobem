import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
	formCad: FormGroup
	id: number
	title: string
	type1: string = 'password'
	type2: string = 'password'
	constructor(private _activatedRouter: ActivatedRoute,
				private _userService: UsuarioService,
				private _location: Location,
				private _notificationService: NotificationService
		) { }
	ngOnInit() {
		this.id = this._activatedRouter.snapshot.params['id'] || 0
		this.title = this.id == 0 ? 'Cadastrar Usuário' : 'Editar usuário'
		const minLength = 6
		this.formCad = new FormGroup({
			name: new FormControl('', {validators: [Validators.required]}),
			email: new FormControl('', {validators: [Validators.required, Validators.email]}),
			password: new FormControl('', {validators: [Validators.required, Validators.min(minLength)]}),
			confirmPassword: new FormControl('', {validators: [Validators.required, Validators.min(minLength)]})
		},{
			validators: this.password.bind(this)
		})
	}

	password(formGroup: FormGroup) {
		const { value: password } = formGroup.get('password');
		const { value: confirmPassword } = formGroup.get('confirmPassword');
		return password === confirmPassword ? null : { passwordNotMatch: true };
	  }

	
	validarSenha(){
		return !this.formCad.hasError('passwordNotMatch')  && this.formCad.get('password').valid
	}
	changeType(){
		this.type1 = this.type1 == 'password' ? 'text' : 'password'
	}
	changeType1(){
		this.type2 = this.type2 == 'password' ? 'text' : 'password'
	}

	submit(){
		delete this.formCad.value.confirmPassword
		if( this.id == 0 ) this.novo()
		else this.update()
	}

	novo(){
		this._userService
			.save(this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()
			})
	}

	update(){
		this._userService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()
			})
	}

	alerta(){
		let obj = {
			message: 'Items salvo com sucesso!',
			status: true
		}
		this._notificationService.notify( obj )
		this.voltar()
	}

	voltar(){
		this._location.back()
	}


}
