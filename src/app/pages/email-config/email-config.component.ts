import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { EmailConfigService } from 'src/app/service/email-config.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
	selector: 'app-email-config',
	templateUrl: './email-config.component.html',
	styleUrls: ['./email-config.component.css']
})
export class EmailConfigComponent implements OnInit {
	formCad: FormGroup
	title: string
	id = 0
	imgLogo: string	
	constructor(private _emailConfigService: EmailConfigService,
				private _notificationService: NotificationService
		) { }
	
	ngOnInit() {
		this.formCad = new FormGroup({
			name: new FormControl('', {validators: [Validators.required]}),
			username: new FormControl('', {validators: [Validators.required]}),
			email: new FormControl('', {validators: [Validators.required]}),
			password: new FormControl('', {validators: [Validators.required]}),
			port: new FormControl('', {validators: [Validators.required]}),
			host: new FormControl('', {validators: [Validators.required]}),
			secure: new FormControl(false, {validators: [Validators.required]}),
			copy: new FormControl(''),
			text_send: new FormControl('', {validators: [Validators.required]}),
			subject_send: new FormControl('', {validators: [Validators.required]}),
			subject_response: new FormControl('', {validators: [Validators.required]}),
			text_response: new FormControl('', {validators: [Validators.required]}),
			logo: new FormControl(''),
			file: new FormControl('')
		})
		this.get()
	}

	submit(){
		delete this.formCad.value.file
		if( this.id == 0 ){
			this.novo()
		}else{
			this.update()
		}
	}

	update(){
		if( this.imgLogo ) {
			if( !this.imgLogo.includes('http') ){
				this.formCad.controls.logo.setValue( this.imgLogo )
			}else{
				delete this.formCad.value.logo
			}
		}
		this._emailConfigService
			.update( this.id, this.formCad.value )
			.subscribe((response: any)=>{
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})
	}

	async fileChangeEvent(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgLogo = `data:image/png;base64,${retorno}`
			this.formCad.controls.logo.setValue( this.imgLogo )
		}
	}

	removerImagem(){
		this.formCad.controls.logo.setValue( '' )
		this.imgLogo = null
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

	novo(){
		
		this._emailConfigService
			.save( this.formCad.value )
			.subscribe((response: any)=>{
				this.id = response.insertId
				this.title  = 'Editar dados de Email'
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})
	}

	get(){
		this._emailConfigService
			.getAll()
			.subscribe((response: any)=>{
				
				this.title = 'Cadastrar dados de Email'
				if( response.length > 0 ){
					let dados = response[0]
					this.id = response[0].id
					this.title = 'Editar dados de Email'
					this.formCad.controls.name.setValue( dados.name )
					this.formCad.controls.username.setValue( dados.username )
					this.formCad.controls.email.setValue( dados.email )
					this.formCad.controls.password.setValue( dados.password )
					this.formCad.controls.port.setValue( dados.port )
					this.formCad.controls.host.setValue( dados.host )
					this.formCad.controls.secure.setValue( dados.secure == 0 ? false : true  )
					this.formCad.controls.copy.setValue( dados.copy )
					this.formCad.controls.text_send.setValue( dados.text_send )
					this.formCad.controls.text_response.setValue( dados.text_response )
					//this.formCad.controls.logo.setValue( dados.logo )
					this.imgLogo = `${environment.host}/foto/${dados.logo}`
				}
				
			})
	}
	
}
