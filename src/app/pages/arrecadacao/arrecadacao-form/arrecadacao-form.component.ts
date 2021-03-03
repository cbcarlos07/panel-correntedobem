import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-arrecadacao-form',
  templateUrl: './arrecadacao-form.component.html',
  styleUrls: ['./arrecadacao-form.component.css']
})
export class ArrecadacaoFormComponent implements OnInit {
	formCad: FormGroup
	@Output() title = new EventEmitter()
	@Output() description = new EventEmitter()
	@Output() subtitleValue = new EventEmitter()
	@Output() subtitleSpent = new EventEmitter()
	@Input() titleStr: string
	@Input() descriptionStr: string
	@Input() subtitleValueStr: string
	@Input() subtitleSpentStr: string
	@Input() titleLabel?: string = 'Título'
	@Input() descriptionLabel?: string = 'Descrição'
	@Input() subtitleValueLabel?: string = 'Legenda arrecadado'
	@Input() subtitleSpentLabel?: string = 'Legenda despesa'
	constructor() { }

	ngOnInit() {
		this.formCad = new FormGroup({
			title: new FormControl( this.titleStr ),
			description: new FormControl(this.descriptionStr),
			subtitle_value: new FormControl(this.subtitleValueStr),
			subtitle_spent: new FormControl(this.subtitleSpentStr),
		})
	}

	enviarTitulo(){
		this.title.emit( this.formCad.value.title )
	}
	enviarDescricao(){
		this.description.emit( this.formCad.value.description )
	}
	enviarLegendaValor(){
		this.subtitleValue.emit( this.formCad.value.subtitle_value )
	}
	enviarDespesa(){
		this.subtitleSpent.emit( this.formCad.value.subtitle_spent )
	}



}
