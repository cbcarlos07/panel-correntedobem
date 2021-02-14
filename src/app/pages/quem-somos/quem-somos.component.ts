import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { QuemSomosService } from 'src/app/service/quem-somos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quem-somos',
  templateUrl: './quem-somos.component.html',
  styleUrls: ['./quem-somos.component.css']
})
export class QuemSomosComponent implements OnInit {
	formCad: FormGroup
	title: string	
	id: number
	imgLogo: string
	imgImage: string
	constructor(private _quemSomosService: QuemSomosService,
				private _notificationService: NotificationService
		) { }

	ngOnInit() {
		this.id = 0
		this.title = 'Cadastrar Dados'
		this.formCad = new FormGroup({
			title: new FormControl('', {validators: [Validators.required]}),
			description: new FormControl('', {validators: [Validators.required]}),
			image: new FormControl('')
		})
		this.get()
	}

	submit(){
		
		
		if( this.id == 0 ){
			this.novo()
		}else{
			this.edit()
		}

	}

	novo(){
		
		this._quemSomosService
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
		
		if( this.imgImage ) {
			if( this.imgImage.includes('http') ){
				delete this.formCad.value.image
			}
		}else{
			delete this.formCad.value.image
		}
		
		this._quemSomosService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				
				
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
				
			})
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

	get(){
		
		this._quemSomosService
			.getAll()
			.subscribe(async(response: any)=>{				
				
				if(response.length > 0){
					this.title = 'Editar Cadastro'
					let dados = response[0]
					this.id = dados.id
					let host = environment.host
					
					if( dados.image ) {
						this.imgImage = `${host}/foto/${dados.image}`
					}	

					
					this.formCad.controls.description.setValue( dados.description )
					this.formCad.controls.title.setValue( dados.title )

				}

			},error => {
				
			})
	}

}
