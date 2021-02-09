import { Component, OnInit } from '@angular/core';
import { ContatoService } from 'src/app/service/contato.service';

@Component({
  selector: 'app-contatos',
  templateUrl: './contatos.component.html',
  styleUrls: ['./contatos.component.css']
})
export class ContatosComponent implements OnInit {
	items = []
    constructor(private _contatoService: ContatoService) { }

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

}
