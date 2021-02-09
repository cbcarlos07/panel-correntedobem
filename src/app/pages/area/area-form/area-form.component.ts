import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/service/area.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';

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
	constructor(private _location: Location,
				private _areaService: AreaService,
				private _notificationService: NotificationService,
				private _activateRoute: ActivatedRoute  
		) { }
	ngOnInit() {
		this.id = this._activateRoute.snapshot.params['id'] || 0
		this.title = this.id != 0 ? 'Alterar Cadastro' : 'Cadastrar'
		this.formCad = new FormGroup({			
			title:       new FormControl(''),
			description: new FormControl('', {validators: [Validators.required]}),
			order_area:  new FormControl(0, {validators: [Validators.required]}),
			url:         new FormControl('', {validators: [Validators.required]}),
			parent_id:   new FormControl('', {validators: [Validators.required]}),
			logo:        new FormControl(''),
			icon:        new FormControl('')
			
		})

		this.getAll()
		if( this.id > 0 ){
			this.getById()
		}
	}

	getById(){
		this._areaService
			.getById( this.id )
			.subscribe((response: any)=>{
				var regex = /<br\s*[\/]?>/gi;
				this.formCad.controls.title.setValue( response.title )
				this.formCad.controls.order_area.setValue( response.order_area )
				this.formCad.controls.url.setValue( response.url )
				this.formCad.controls.description.setValue( response.description.replace(regex,'\n') )
				let index = this.items.findIndex( f => f.id == response.parent_id )
				this.formCad.controls.parent_id.setValue( this.items[ index ].id )
				if(response.logo)  this.imgImage = `${environment.host}/foto/${response.logo}`
				if(response.icon)  this.imgIcon = `${environment.host}/foto/${response.icon}`
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

	async fileChangeEvent(event) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgImage = `data:image/png;base64,${retorno}`
			
			
			this.formCad.controls.logo.setValue( this.imgImage )
		}
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
		if( !this.imgImage || this.imgImage.includes( 'http' )){
			delete this.formCad.value.logo
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
	

	
}
