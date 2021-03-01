import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment';
import { Tema } from './tema.model';

@Component({
	selector: 'app-tema',
	templateUrl: './tema.component.html',
	styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
	title: string	
	formCad: FormGroup
	imgImage: string
	imgImageSmall: string
	id = 0
	tema: Tema
	constructor(private _temaService: TemaService,
				private _notificationService: NotificationService
		) { }
	
	ngOnInit() {
		this.formCad = new FormGroup({							
			image:       	new FormControl(''),			
			image_small: 	new FormControl(''),
			description: 	new FormControl(''),			
			logo:        	new FormControl(''),			
			tema:       	new FormControl(''),
			description_es: new FormControl(''),			
			logo_es:        new FormControl(''),			
			tema_es:        new FormControl(''),		
			description_en: new FormControl(''),			
			logo_en:        new FormControl(''),			
			tema_en:        new FormControl(''),
			text_btn:       new FormControl(''),
			text_btn_es:    new FormControl(''),
			text_btn_en:    new FormControl(''),
		})
		this.get()
	}
	
	async fileChangeEventImg(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgImage = `data:image/png;base64,${retorno}`
			this.formCad.controls.image.setValue( this.imgImage )
		}
	}

	async fileChangeEventImgSmall(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgImageSmall = `data:image/png;base64,${retorno}`
			this.formCad.controls.image_small.setValue( this.imgImageSmall )
		}
	}


	convertToBa64(file){
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

	

	submit(){
		console.log(this.formCad.value);
		
		if( this.formCad.value.logo == "" || this.formCad.value.logo.includes('http') ){
				delete this.formCad.value.logo				
		}

		if( this.formCad.value.logo_es == "" || this.formCad.value.logo_es.includes('http') ){
			delete this.formCad.value.logo_es	
		}
		if( this.formCad.value.logo_en == "" || this.formCad.value.logo_en.includes('http') ){
			delete this.formCad.value.logo_en	
		}

		
		if( this.imgImage ) {
			if( this.imgImage.includes('http') ){
				delete this.formCad.value.image
			}
		}
		if( this.imgImageSmall ) {
			if( this.imgImageSmall.includes('http') ){
				delete this.formCad.value.image_small
			}	
		}


		
		if( this.id == 0 ){
			this.novo()
		}else{
			this.edit()
		}

	}

	

	novo(){
		
		this._temaService
			.save( this.formCad.value )
			.subscribe((response: any)=>{
				console.log('response',response);
				this.id = response.insertId
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
				this.get()
			})

	}

	edit(){
		
		
		this._temaService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				
				
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
				
			})
	}
	

	get(){
		
		this._temaService
			.get()
			.subscribe(async(response: any)=>{				
				
				if(response.length > 0){
					this.title = 'Editar Cadastro do Tema'
					let dados = response[0]
					this.tema = dados

					this.id = dados.id
					let host = environment.host
						
					if( dados.image ) {
						this.imgImage = `${host}/foto/${dados.image}`
					}	

					if( dados.image_small ) {
						this.imgImageSmall = `${host}/foto/${dados.image_small}`
					}
					
					this.formCad.controls.description.setValue( dados.description )
					this.formCad.controls.description_es.setValue( dados.description_es )
					this.formCad.controls.description_en.setValue( dados.description_en )
					this.formCad.controls.tema.setValue( dados.tema )
					this.formCad.controls.tema_es.setValue( dados.tema_es )
					this.formCad.controls.tema_en.setValue( dados.tema_en )
					this.formCad.controls.text_btn.setValue( dados.text_btn )
					this.formCad.controls.text_btn_es.setValue( dados.text_btn_es )
					this.formCad.controls.text_btn_en.setValue( dados.text_btn_en )

				}else{
					this.title = 'Cadastrar Tema'
				}

			},error => {
				
			})
	}

	getTema(data){
		this.formCad.controls.tema.setValue( data )
	}
	getTemaEs(data){
		this.formCad.controls.tema_es.setValue( data )
	}
	getTemaEn(data){
		this.formCad.controls.tema_en.setValue( data )
	}
	getLogo(data){		
		this.formCad.controls.logo.setValue( data )
	}
	getLogoEs(data){		
		this.formCad.controls.logo_es.setValue( data )
	}
	getLogoEn(data){		
		this.formCad.controls.logo_en.setValue( data )
	}
	getDescription(data){		
		this.formCad.controls.description.setValue( data )
	}
	getDescriptionEs(data){
		this.formCad.controls.description_es.setValue( data )
	}
	getDescriptionEn(data){		
		this.formCad.controls.description_en.setValue( data )
	}

	getTextBtn(data){
		this.formCad.controls.text_btn.setValue(data)
	}
	getTextBtnEs(data){
		this.formCad.controls.text_btn_es.setValue(data)
	}
	getTextBtnEn(data){
		this.formCad.controls.text_btn_en.setValue(data)
	}
	
	
}
