import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AcoesService } from 'src/app/service/acoes.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-acoes',
  templateUrl: './acoes.component.html',
  styleUrls: ['./acoes.component.css']
})
export class AcoesComponent implements OnInit {
	title: string
	formCad: FormGroup
	id: number
	constructor(private _acoesService: AcoesService,
				private _notificationService: NotificationService
		) { }

	ngOnInit() {
		this.title = 'Cadastrar Informações de Área de Ação'
		this.id = 0
		this.formCad = new FormGroup({
			title: new FormControl('', {validators: [Validators.required]}),
			description: new FormControl('')
		})
		this.get()
	}

	get(){
		this._acoesService
			.get()
			.subscribe( (response: any) =>{
				if(response.length > 0){
					this.title = 'Editar Informações de Área de Ação'
					let dados = response[0]
					this.formCad.controls.title.setValue( dados.title )
					this.formCad.controls.description.setValue( dados.description )
					this.id = dados.id
				}
			})
	}

	submit(){
		if( this.id == 0){
			this.novo()
		}else{
			this.update()
		}
	}

	novo(){
		this._acoesService
			.save(this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()			
				this.get()
			})
	}

	update(){
		this._acoesService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()
				this.get()
			})
	}

	alerta(){
		let obj = {
			message: 'Item salvo com sucesso',
			status: true
		}
		this._notificationService.notify( obj )
	}

}
