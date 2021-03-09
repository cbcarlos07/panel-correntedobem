import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { EquipeService } from 'src/app/service/equipe.service';
import { HelperService } from 'src/app/service/helper.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-equipe-form',
	templateUrl: './equipe-form.component.html',
	styleUrls: ['./equipe-form.component.css']
})
export class EquipeFormComponent implements OnInit {
	formCad: FormGroup
	id = 0
	title: string
	items = []
	area: 0
	photoImg: string
	host: string
	constructor(private _location: Location,
				private _notificationService: NotificationService,
				private _activateRoute: ActivatedRoute,
				private _equipeService: EquipeService,
				private _helperService: HelperService
		) { 
			this.host = environment.host
		}
	
	ngOnInit() {
		this.id  = this._activateRoute.snapshot.params['id'] || 0
		this.area = this._activateRoute.snapshot.params['area'] 
		this.title = this.id != 0 ? 'Alterar Cadastro' : 'Cadastrar'
		this.formCad = new FormGroup({
			id:          new FormControl( this.id ),
			name:        new FormControl('',{validators: [Validators.required]}),			
			order_item:  new FormControl(0, {validators: [Validators.required]}),			
			parent_id:   new FormControl('', {validators: [Validators.required]}),
			area_id:     new FormControl(this.area),
			photo:        new FormControl(''),
			subtitle:    new FormControl('')
		})
		this.getEquipe()
		setTimeout(() => {
			if( this.id > 0 ) this.getById()			
		}, 100);
	}

	getEquipe(){
		this._equipeService
			.getArea( this.area )
			.subscribe((response: any)=>{
				this.items = response
				this.items.unshift({id: 0, name: 'É Equipe'})
				this.formCad.controls.parent_id.setValue( this.items[0].id )
			})	
	}

	getById(){
		this._equipeService
			.getById(this.id)
			.subscribe((response: any)=>{
				this.formCad.controls.name.setValue( response.name )
				this.formCad.controls.order_item.setValue( response.order_item )
				let index = this.items.findIndex( (i: any) => i.id == response.parent_id)
				this.formCad.controls.parent_id.setValue( this.items[ index ].id )
				this.formCad.controls.subtitle.setValue( response.subtitle )
				if( response.photo != null ){
					this.photoImg = `${this.host}/foto/${response.photo}`
				}
				
			})
	}

	voltar(){
		this._location.back()
	}

	salvar(){
		delete this.formCad.value.id
		if( this.photoImg ){
			if( this.photoImg.includes('http') || this.formCad.value.photo == '' ){
				delete this.formCad.value.photo
			}
		}else{
			delete this.formCad.value.photo
		}
		if( this.id == 0 ){
			this.novo(  )
		}else{
			this.update()
		}
	}

	update(){
		this._equipeService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				this.retorno()
			})
	}

	novo(){
		this._equipeService
			.save(this.formCad.value)
			.subscribe((response: any) => {
				this.retorno()
			})
	}

	retorno(){
		let obj = {
			message: 'Item salvo com sucesso',
			status: true
		}
		this._notificationService.notify( obj )
		this.voltar()
	}

	async fileChangeEvent(event) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this._helperService.convertToBa64(file)
			this.photoImg = `data:image/png;base64,${retorno}`
			this.formCad.controls.photo.setValue( this.photoImg )
		}
	}

	removerFoto(){
		this._equipeService
			.removerFoto( this.id )
			.subscribe(()=>{
				let obj = {
					message: 'Foto removida',
					status: true
				}
				this._notificationService.notify(obj)
				this.photoImg = ''
			})
	}
	
}
