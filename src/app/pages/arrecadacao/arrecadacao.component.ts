import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ArrecadacaoService } from 'src/app/service/arrecadacao.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-arrecadacao',
  templateUrl: './arrecadacao.component.html',
  styleUrls: ['./arrecadacao.component.css']
})
export class ArrecadacaoComponent implements OnInit {
	formCad: FormGroup
	title: string
	id = 0
	options = { prefix: 'R$ ', thousands: '.', decimal: ',' }
	constructor(private _notificationService: NotificationService,
				private _arrecadacaoService: ArrecadacaoService) { }

	ngOnInit() {
		this.formCad = new FormGroup({			
			description: new FormControl(''),
			value:       new FormControl(''),
			spent:       new FormControl('')
		})
		this.get()
	}

	submit(){
		if( this.id == 0 ){
			this.novo()
		}else{
			this.update()
		}
	}

	update(){
		this._arrecadacaoService
			.update( this.id, this.formCad.value )
			.subscribe((response: any)=>{
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})
	}

	novo(){
		
		this._arrecadacaoService
			.save( this.formCad.value )
			.subscribe((response: any)=>{
				this.id = response.insertId
				this.title  = 'Editar dados de Transparência'
				let obj = {
					message: 'Item salvo com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})
	}

	get(){
		this._arrecadacaoService
			.get()
			.subscribe((response: any)=>{
				
				this.title = 'Cadastrar dados de Transparência'
				if( response.length > 0 ){
					let dados = response[0]
					this.id = response[0].id
					this.title = 'Editar dados de Transparência'
					this.formCad.controls.description.setValue( dados.description )
					this.formCad.controls.value.setValue( dados.value )
					this.formCad.controls.spent.setValue( dados.spent )
				}
				
			})
	}

}
