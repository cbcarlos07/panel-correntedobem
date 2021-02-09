import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DadosContatoService } from 'src/app/service/dados-contato.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-contato-dados',
  templateUrl: './contato-dados.component.html',
  styleUrls: ['./contato-dados.component.css']
})
export class ContatoDadosComponent implements OnInit {
	formCad: FormGroup
	title: string
	id: number
	constructor(private _contatoService: DadosContatoService,
				private _notificationService: NotificationService
		) { }

	ngOnInit() {
		this.formCad = new FormGroup({
			email: new FormControl('',{validators: [Validators.required]}),
			telefone: new FormControl('',{validators: [Validators.required]}),
			endereco: new FormControl('',{validators: [Validators.required]}),
		})

		this.get()
	}

	get(){
		this._contatoService
			.get()
			.subscribe((response: any)=>{
				this.id = 0
				this.title = 'Cadastrar Contato'
				if(response.length){
					let dados = response[0]
					this.title = 'Editar dados de contato'
					this.id = dados.id
					this.formCad.controls.email.setValue( dados.email )
					this.formCad.controls.telefone.setValue( dados.telefone )
					this.formCad.controls.endereco.setValue( dados.endereco.replace('<br />','\n') )
				}
			})
	}

	submit(){
		this.formCad.value.endereco = this.formCad.value.endereco.replace(/\r?\n/g, '<br />')
		if( this.id == 0 ) this.novo()
		else this.update()
	}

	novo(){
		this._contatoService
			.save(this.formCad.value)
			.subscribe((response:any)=>{
				this.title =  'Editar dados de contato'
				this.id = response.insertId
				this.alerta()
			})
	}

	update(  ){
		this._contatoService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()
			})
	}

	alerta(){
		let obj = {
			message: 'Item salvo com sucesso!',
			status: true
		}
		this._notificationService.notify( obj )
	}



}
