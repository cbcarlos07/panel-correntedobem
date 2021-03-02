import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/service/area.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';
import { Area } from './area.model';

@Component({
	selector: 'app-area-form',
	templateUrl: './area-form.component.html',
	styleUrls: ['./area-form.component.css']
})
export class AreaFormComponent implements OnInit {
	formCad: FormGroup
	id = 0
	title: string
	items = []
	imgImage: string
	imgIcon: string
	area: Area
	constructor(private _location: Location,
				private _areaService: AreaService,
				private _notificationService: NotificationService,
				private _activateRoute: ActivatedRoute  
		) { }
	ngOnInit() {
		this.id = this._activateRoute.snapshot.params['id'] || 0
		this.title = this.id != 0 ? 'Alterar Cadastro' : 'Cadastrar'
		this.formCad = new FormGroup({			
			title:          new FormControl(''),
			description:    new FormControl('', {validators: [Validators.required]}),
			short_text:     new FormControl('', {validators: [Validators.maxLength(120)]}),			
			logo:           new FormControl(''),
			title_es:       new FormControl(''),
			description_es: new FormControl(''),			
			short_text_es:  new FormControl(''),
			logo_es:        new FormControl(''),
			title_en:       new FormControl(''),
			description_en: new FormControl(''),			
			short_text_en:  new FormControl(''),
			logo_en:        new FormControl(''),
			order_area:     new FormControl(0, {validators: [Validators.required]}),
			url:         new FormControl('', {validators: [Validators.required]}),
			parent_id:   new FormControl('', {validators: [Validators.required]}),
			icon:        new FormControl(''),
		})

		this.getAll()
		if( this.id > 0 ){
			setTimeout(() => {
				this.getById()				
			}, 500);
		}
	}

	getById(){
		this._areaService
			.getById( this.id )
			.subscribe((response: any)=>{
				this.area = response
				var regex = /<br\s*[\/]?>/gi;
				this.formCad.controls.title.setValue( response.title )
				this.formCad.controls.order_area.setValue( response.order_area )
				this.formCad.controls.url.setValue( response.url )
				this.formCad.controls.description.setValue( response.description.replace(regex,'\n') )
				let index = this.items.findIndex( f => f.id == response.parent_id )
				this.formCad.controls.parent_id.setValue( this.items[ index ].id )
				if(response.logo)  this.imgImage = `${environment.host}/foto/${response.logo}`
				if(response.icon)  this.imgIcon = `${environment.host}/foto/${response.icon}`
				this.formCad.controls.short_text.setValue( response.short_text )
			})
	}

	getAll(){
		this._areaService
			.get()
			.subscribe((response: any)=>{
				this.items = response

				this.items.unshift({id: 0, title: 'Principal'})
				this.formCad.controls.parent_id.setValue( this.items[0].id )
			})
	}

	voltar(){
		this._location.back()
	}

	
	async fileChangeEvent1(event) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgIcon = `data:image/png;base64,${retorno}`
			this.formCad.controls.icon.setValue( this.imgIcon )
		}
	}

	salvar(){
		if( this.formCad.value.logo.includes( 'http' ) || this.formCad.value.logo == ''){
			delete this.formCad.value.logo
		}
		if( this.formCad.value.logo_es.includes( 'http' ) || this.formCad.value.logo_es == ''){
			delete this.formCad.value.logo_es
		}
		if( this.formCad.value.logo_en.includes( 'http' ) || this.formCad.value.logo_en == ''){
			delete this.formCad.value.logo_en
		}
		if( !this.imgIcon || this.imgIcon.includes( 'http' )){
			delete this.formCad.value.icon
		}
		this.formCad.value.description = this.formCad.value.description.replace(/\r?\n/g, '<br />')
		if( this.id == 0 ){
			this.novo()
		}else{
			this.atualizar()
		}

	}

	novo(){
		delete this.formCad.value.id
		this._areaService
			.save( this.formCad.value )
			.subscribe((response: any)=>{
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify( obj )
				this.voltar()
	
			})
	}

	convertToBa64(file: any){
		return new Promise((resolve, reject)=>{
			var reader = new FileReader();			
			reader.onload = (event: any) => {
                const binaryString  = event.target.result;
				let base64 = btoa(binaryString)
				resolve( base64 )
            }
			reader.readAsBinaryString(file);
		})
	}

	atualizar(){
		
		this._areaService
		.update( this.id, this.formCad.value )
		.subscribe((response: any)=>{
			let obj = {
				message: 'Item salvo com sucesso',
				status: true
			}
			this._notificationService.notify( obj )
			this.voltar()

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

	setShortText(value){
		this.formCad.controls.short_text.setValue( value )
	}
	setShortTextEs(value){
		this.formCad.controls.short_text_es.setValue( value )
	}
	setShortTextEn(value){
		this.formCad.controls.short_text_en.setValue( value )
	}
	setLogo(value){
		this.formCad.controls.logo.setValue( value )
	}
	setLogoEs(value){
		this.formCad.controls.logo_es.setValue( value )
	}
	setLogoEn(value){
		this.formCad.controls.logo_en.setValue( value )
	}

	
}
