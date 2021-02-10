import { Component, OnInit } from '@angular/core';
import { ContatoService } from 'src/app/service/contato.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {
	items = []
    constructor(private _contatoService: ContatoService,
				private _notificationService: NotificationService
		) { }

    ngOnInit() {
		this.get()
    }

	get(){
		this._contatoService
			.getAll()
			.subscribe((response: any)=>{
				this.items = response
			})
	}

	reenviar(obj: any){
		console.log('reenviar',obj);
		
		this._contatoService
			.reenviar(obj.id)
			.subscribe((response: any)=>{
				let obj = {
					message: 'Reenviado com sucesso',
					status: true
				}
				this._notificationService.notify(obj)
			})
	}

}
