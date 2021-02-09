import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { RedesSociaisService } from 'src/app/service/redes-sociais.service';

@Component({
  selector: 'app-redes-form',
  templateUrl: './redes-form.component.html',
  styleUrls: ['./redes-form.component.css']
})
export class RedesFormComponent implements OnInit {

	formCad: FormGroup
	title: string
	id: number
	constructor(private _activatedRoute: ActivatedRoute,
			    private _redesSociaisService: RedesSociaisService,
				private _notificationService: NotificationService,
				private _location: Location
		) { }
	
	ngOnInit() {
		this.id = this._activatedRoute.snapshot.params['id'] || 0
		this.title = this.id > 0 ? 'Alterar Cadastro de Rede Social' : 'Cadastrar Rede Social'
		this.formCad = new FormGroup({
			rede: new FormControl('', {validators: [Validators.required]}),
			url: new FormControl('',{validators: [Validators.required]})			
		})

		if( this.id > 0 ) this.buscar()
	}

	buscar(){
		this._redesSociaisService
			.getById( this.id )
			.subscribe((response: any)=>{
				this.formCad.controls.rede.setValue( response.rede )
				this.formCad.controls.url.setValue( response.url )
			})
	}

	submit(){
		if( this.id == 0 ){
			this.novo()
		}else{
			this.update()
		}
	}

	novo(){
		this._redesSociaisService
			.save( this.formCad.value )
			.subscribe((response: any)=>{
				this.alerta()
			})
	}

	update(){
		this._redesSociaisService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()
			})
	}

	alerta(){
		let obj = {
			message: 'Item salvo com sucesso',
			status: true
		}
		this._notificationService.notify( obj )
		this.voltar()
	}

	voltar(){
		this._location.back()
	}

}
