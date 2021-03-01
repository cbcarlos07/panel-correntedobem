import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { environment } from 'src/environments/environment';
import { Tema } from '../tema.model';

@Component({
  selector: 'app-tema-form-pt',
  templateUrl: './tema-form-pt.component.html',
  styleUrls: ['./tema-form-pt.component.css']
})
export class TemaFormPtComponent implements OnInit {
	formCad: FormGroup
	imgLogo: string
	@Input() id: number
	@Output() tema = new EventEmitter()
	@Output() logo = new EventEmitter()
	@Output() description = new EventEmitter()
	@Output() textBtn = new EventEmitter()
	@Input() objTema: Tema

	constructor(private _helperService: HelperService
		) { }

	ngOnInit() {
		this.formCad = new FormGroup({				
			description: new FormControl(this.objTema.description, {validators: [Validators.required]}),			
			logo:        new FormControl(''),			
			tema:        new FormControl(this.objTema.tema,{validators: [Validators.required]}),
			text_btn:        new FormControl(this.objTema.text_btn,{validators: [Validators.required]})			
		})
		if( this.objTema.logo ) {
			let host = environment.host
			this.imgLogo = `${host}/foto/${this.objTema.logo}`
		}
	}
	
	async fileChangeEventLogo(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this._helperService.convertToBa64(file)
			this.imgLogo = `data:image/png;base64,${retorno}`
			this.formCad.controls.logo.setValue( this.imgLogo )
			this.enviarLogo()
		}
	}

	enviarTema(){		
		this.tema.emit( this.formCad.value.tema )		
	}
	enviarDescription(){		
		this.description.emit( this.formCad.value.description )		
	}
	enviarLogo(){		
		this.logo.emit( this.formCad.value.logo )
	}
	enviarTextoBtn(){		
		this.textBtn.emit( this.formCad.value.text_btn )
	}

	

}
