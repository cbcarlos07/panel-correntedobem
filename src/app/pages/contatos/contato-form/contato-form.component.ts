import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ContatoService } from 'src/app/service/contato.service';

@Component({
	selector: 'app-contato-form',
	templateUrl: './contato-form.component.html',
	styleUrls: ['./contato-form.component.css']
})
export class ContatoFormComponent implements OnInit {
	formCad: FormGroup	
	id: 0
	title = 'Visualizar mensagem'
	loading: false
	constructor(private _contatoService: ContatoService,
				private _location: Location,
				private _activatedRoute: ActivatedRoute
		) { }
	
	ngOnInit() {
		this.id = this._activatedRoute.snapshot.params['id'] || 0
		if( this.id == 0 ) this.voltar()
		this.formCad = new FormGroup({
			name: new FormControl(''),
			email: new FormControl(''),
			message: new FormControl('')
		})

		this.getById()
	}
	
	getById(){
		this._contatoService
			.getById( this.id )
			.subscribe((response: any)=>{
				console.log('response',response);
				
				this.formCad.controls.name.setValue( response.name )
				this.formCad.controls.email.setValue( response.email )
				this.formCad.controls.message.setValue( response.message.replace('<br />','\n') )
			})

	}

	voltar(){
		this._location.back()
	}

	reenviar(){
		this._contatoService
			.reenviar(this.id)
			.subscribe((response: any)=>{
				
			})
	}
}
