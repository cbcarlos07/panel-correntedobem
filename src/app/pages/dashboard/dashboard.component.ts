import { Component, OnInit } from '@angular/core';
import { AcoesItemService } from 'src/app/service/acoes-item.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
	recebidas: 0
	atendimento: 0
	alta: 0
	psicologia: 0
	fisioterapia: 0
	atd_medico: 0
	remedios: 0
	cestas: 0
	voluntarios: 0
	constructor(private _acoesItemService: AcoesItemService) { }

	ngOnInit() {
		this.get()
	}

	get(){
		this._acoesItemService
			.get()
			.subscribe((response: any)=>{
				
				this.recebidas = response[0].value
				this.atendimento = response[1].value
				this.alta = response[2].value
				this.psicologia = response[3].value
				this.fisioterapia = response[4].value
				this.atd_medico = response[5].value
				this.remedios = response[6].value
				this.cestas = response[7].value
				this.voluntarios = response[8].value
				
				
			})
	}

}
