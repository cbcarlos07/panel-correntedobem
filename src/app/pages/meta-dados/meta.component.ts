import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MetaDataService } from 'src/app/service/meta-data.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-meta',
	templateUrl: './meta.component.html',
	styleUrls: ['./meta.component.css']
})
export class MetaComponent implements OnInit {
	formCad: FormGroup
	title: string	
	imgLogo: string
	imgImage: string
	id = 0
	
	constructor(private _metaService: MetaDataService,
			    private _notificationService: NotificationService) { }
	
	ngOnInit() {
		this.formCad = new FormGroup({
			id:          new FormControl( '' ),			
			description: new FormControl('', {validators: [Validators.required]}),			
			logo:        new FormControl(''),
			image:        new FormControl('')
		})
		this.get()
	}

	async fileChangeEventLogo(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgLogo = `data:image/png;base64,${retorno}`
			
		}
	}

	async fileChangeEventImg(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgImage = `data:image/png;base64,${retorno}`
			
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
		console.log('submit', this.id);
		
		if( this.id == 0 ){
			this.novo()
		}else{
			this.edit()
		}

	}

	novo(){
		
		let obj: any = {
			description: this.formCad.value.description
		}
		if( this.imgLogo ) obj.logo = this.imgLogo
		if( this.imgImage ) obj.image = this.imgImage
		
		this._metaService
			.save( obj )
			.subscribe((response: any)=>{
				console.log('response',response);
				this.id = response.insertId
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})

	}

	edit(){
		let obj: any = {
			description: this.formCad.value.description
		}
		if( this.imgLogo ) {
			if( !this.imgLogo.includes('http') ){
				obj.logo = this.imgLogo
			}
		}
		if( this.imgImage ) {
			if( !this.imgImage.includes('http') ){
				obj.image = this.imgImage
			}

		}

		this._metaService
			.update(this.id, obj)
			.subscribe((response: any)=>{
				console.log('update',response);
				
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})
	}

	get(){
		this._metaService
			.getAll()
			.subscribe(async(response: any)=>{				
				
				if(response.length > 0){
					this.title = 'Editar texto da meta'
					let dados = response[0]
					this.id = dados.id
					let host = environment.host
					if( dados.logo ) {
						this.imgLogo = `${host}/foto/${dados.logo}`
					}	
					if( dados.image ) {
						this.imgImage = `${host}/foto/${dados.image}`
					}						
					this.formCad.controls.description.setValue( dados.description )
				}
			})
	}

	
	
}
