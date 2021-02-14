import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AwsService } from 'src/app/service/aws.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-aws',
  templateUrl: './aws.component.html',
  styleUrls: ['./aws.component.css']
})
export class AwsComponent implements OnInit {
	formCad: FormGroup
	title: string	
	id: number
	constructor(private _awsService: AwsService,
				private _notificationService: NotificationService
		) { }

	ngOnInit() {
		this.id = 0
		this.title = 'Cadastrar Dados AWS'
		this.formCad = new FormGroup({
			key_id: new FormControl('', {validators: [Validators.required]}),
			access_key: new FormControl('', {validators: [Validators.required]}),
			s3_bucket: new FormControl('',{validators: [Validators.required]}),
			region: new FormControl('',{validators: [Validators.required]})
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
		
		this._awsService
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
		
		
		this._awsService
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
		
		this._awsService
			.get()
			.subscribe(async(response: any)=>{				
				
				if(response.length > 0){
					this.title = 'Editar Cadastro'
					let dados = response[0]
					this.id = dados.id					
					this.formCad.controls.key_id.setValue( dados.key_id )
					this.formCad.controls.access_key.setValue( dados.access_key )
					this.formCad.controls.s3_bucket.setValue( dados.s3_bucket )
					this.formCad.controls.region.setValue( dados.region )

				}

			},error => {
				
			})
	}

}
