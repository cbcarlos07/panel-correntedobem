import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ArrecadacaoService } from 'src/app/service/arrecadacao.service';
import { NotificationService } from 'src/app/service/notification.service';
import { Arrecadacao } from './arrecadacao.model';

@Component({
  selector: 'app-arrecadacao',
  templateUrl: './arrecadacao.component.html',
  styleUrls: ['./arrecadacao.component.css']
})
export class ArrecadacaoComponent implements OnInit {
	formCad: FormGroup
	title: string
	id = 0
	options = { prefix: 'R$ ', thousands: '.', decimal: ',' }
	arrecadacao: Arrecadacao
	constructor(private _notificationService: NotificationService,
				private _arrecadacaoService: ArrecadacaoService) { }

	ngOnInit() {
		this.formCad = new FormGroup({			
			title: new FormControl('', {validators: [Validators.required]}),
			title_es: new FormControl(''),
			title_en: new FormControl(''),
			description: new FormControl('', {validators: [Validators.required]}),
			description_es: new FormControl(''),
			description_en: new FormControl(''),
			value:       new FormControl(''),
			spent:       new FormControl(''),
			subtitle_value: new FormControl('', {validators: [Validators.required]}),
			subtitle_value_es: new FormControl(''),
			subtitle_value_en: new FormControl(''),
			subtitle_spent: new FormControl('', {validators: [Validators.required]}),
			subtitle_spent_es: new FormControl(''),
			subtitle_spent_en: new FormControl(''),

		})
		this.get()
	}

	submit(){
		if( this.id == 0 ){
			this.novo()
		}else{
			this.update()
		}
	}

	update(){
		this._arrecadacaoService
			.update( this.id, this.formCad.value )
			.subscribe((response: any)=>{
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})
	}

	novo(){
		
		this._arrecadacaoService
			.save( this.formCad.value )
			.subscribe((response: any)=>{
				this.id = response.insertId
				this.title  = 'Editar dados de Transparência'
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})
	}

	get(){
		this._arrecadacaoService
			.get()
			.subscribe((response: any)=>{
				
				this.title = 'Cadastrar dados de Transparência'
				if( response.length > 0 ){
					let dados = response[0]
					this.arrecadacao = dados
					this.id = response[0].id
					this.title = 'Editar dados de Transparência'
					this.formCad.controls.title.setValue( dados.title )
					this.formCad.controls.title_es.setValue( dados.title_es )
					this.formCad.controls.title_en.setValue( dados.title_en )
					this.formCad.controls.description.setValue( dados.description )
					this.formCad.controls.description_es.setValue( dados.description_es )
					this.formCad.controls.description_en.setValue( dados.description_en )
					this.formCad.controls.value.setValue( dados.value )
					this.formCad.controls.spent.setValue( dados.spent )
				}
				
			})
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
	setSubTitleValue(value){
		this.formCad.controls.subtitle_value.setValue( value )
	}
	setSubTitleValueEs(value){
		this.formCad.controls.subtitle_value_es.setValue( value )
	}
	setSubTitleValueEn(value){
		this.formCad.controls.subtitle_value_en.setValue( value )
	}
	setSubTitleSpent(value){
		this.formCad.controls.subtitle_spent.setValue( value )
	}
	setSubTitleSpentEs(value){
		this.formCad.controls.subtitle_spent_es.setValue( value )
	}
	setSubTitleSpentEn(value){
		this.formCad.controls.subtitle_spent_en.setValue( value )
	}

}
