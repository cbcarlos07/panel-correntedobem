import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcoesService } from 'src/app/service/acoes.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Acoes } from './acoes.model';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css']
})
export class AcoesComponent implements OnInit {
	title: string
	formCad: FormGroup
	id: number
	acoes: Acoes
	constructor(private _acoesService: AcoesService,
				private _notificationService: NotificationService
		) { }

	ngOnInit() {
		this.title = 'Cadastrar Informações de Área de Ação'
		this.id = 0
		this.formCad = new FormGroup({
			title: new FormControl('', {validators: [Validators.required]}),
			title_es: new FormControl(''),
			title_en: new FormControl(''),
			description: new FormControl(''),
			description_es: new FormControl(''),
			description_en: new FormControl('')
		})
		this.get()
	}

	get(){
		this._acoesService
			.get()
			.subscribe( (response: any) =>{
				if(response.length > 0){
					this.title = 'Editar Informações de Área de Ação'
					let dados = response[0]
					this.acoes = dados
					this.formCad.controls.title.setValue( dados.title )
					this.formCad.controls.title_es.setValue( dados.title_es )
					this.formCad.controls.title_en.setValue( dados.title_en )
					this.formCad.controls.description.setValue( dados.description )
					this.formCad.controls.description_es.setValue( dados.description_es )
					this.formCad.controls.description_en.setValue( dados.description_en )
					this.id = dados.id
				}
			})
	}

	submit(){
		if( this.id == 0){
			this.novo()
		}else{
			this.update()
		}
	}

	novo(){
		this._acoesService
			.save(this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()			
				this.get()
			})
	}

	update(){
		this._acoesService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()
				this.get()
			})
	}

	alerta(){
		let obj = {
			message: 'Item salvo com sucesso',
			status: true
		}
		this._notificationService.notify( obj )
	}

	setTitle(value){
		this.formCad.controls.title.setValue( value )
	}
	setTitleEs(value){
		this.formCad.controls.title_es.setValue( value )
	}
	setTitleEn(value){
		
		
		this.formCad.controls.title_en.setValue( value )
	}
	setDescription(value){
		this.formCad.controls.description.setValue( value )
	}
	setDescriptionEs(value){
		this.formCad.controls.description_es.setValue( value )
	}
	setDescriptionEn(value){
		this.formCad.controls.description_en.setValue( value )
	}

}
