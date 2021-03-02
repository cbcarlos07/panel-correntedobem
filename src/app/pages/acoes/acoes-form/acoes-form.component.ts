import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-acoes-form',
  templateUrl: './acoes-form.component.html',
  styleUrls: ['./acoes-form.component.css']
})
export class AcoesFormComponent implements OnInit {
	formCad: FormGroup
	@Output() title = new EventEmitter()
	@Output() description = new EventEmitter()
	@Input() titleStr: string
	@Input() descriptionStr: string
	@Input() titleLabel: string = 'Título'
	@Input() descriptionLabel: string = 'Descrição'
	constructor() { }

	ngOnInit() {
		this.formCad = new FormGroup({
			title: new FormControl( this.titleStr ),
			description: new FormControl( this.descriptionStr )
		})
	}

	enviarTitle(  ){
		this.title.emit( this.formCad.value.title )  
	}

	enviarDescription(){
		this.description.emit( this.formCad.value.description )
	}

}
