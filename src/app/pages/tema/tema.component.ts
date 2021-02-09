import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NotificationService } from 'src/app/service/notification.service';
import { TemaService } from 'src/app/service/tema.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-tema',
	templateUrl: './tema.component.html',
	styleUrls: ['./tema.component.css']
})
export class TemaComponent implements OnInit {
	formCad: FormGroup
	title: string	
	imgLogo: string
	id = 0
	constructor(private _temaService: TemaService,
				private _notificationService: NotificationService
		) { }
	
	ngOnInit() {
		this.formCad = new FormGroup({				
			description: new FormControl('', {validators: [Validators.required]}),			
			logo:        new FormControl(''),
			img:         new FormControl('',),
			tema:        new FormControl('',{validators: [Validators.required]}),
		})
		this.get()
	}
	async fileChangeEventLogo(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgLogo = `data:image/png;base64,${retorno}`
			this.formCad.controls.logo.setValue( this.imgLogo )
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
		delete this.formCad.value.img
		
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
		
		if( this.imgLogo ) {
			if( !this.imgLogo.includes('http') ){
				this.formCad.controls.logo.setValue( this.imgLogo )
			}
		}
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
					this.id = dados.id
					let host = environment.host
					if( dados.logo ) {
						this.imgLogo = `${host}/foto/${dados.logo}`
					}	
					
					this.formCad.controls.description.setValue( dados.description )
					this.formCad.controls.tema.setValue( dados.tema )

				}else{
					this.title = 'Cadastrar Tema'
				}

			})
	}
	
}
