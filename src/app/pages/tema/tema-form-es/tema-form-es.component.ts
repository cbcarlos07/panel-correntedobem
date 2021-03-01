import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { environment } from 'src/environments/environment';
import { Tema } from '../tema.model';

@Component({
  selector: 'app-tema-form-es',
  templateUrl: './tema-form-es.component.html',
  styleUrls: ['./tema-form-es.component.css']
})
export class TemaFormEsComponent implements OnInit {

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
			description_es: new FormControl(this.objTema.description_es),			
			logo_es:        new FormControl(''),			
			tema_es:        new FormControl(this.objTema.tema_es),
			text_btn_es:    new FormControl(this.objTema.text_btn_es)
		})
		if( this.objTema.logo_es ) {
			let host = environment.host
			this.imgLogo = `${host}/foto/${this.objTema.logo_es}`
		}
	}
	
	async fileChangeEventLogo(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this._helperService.convertToBa64(file)
			this.imgLogo = `data:image/png;base64,${retorno}`
			this.formCad.controls.logo_es.setValue( this.imgLogo )
			this.enviarLogo()
		}
	}

	enviarTema(){		
		this.tema.emit( this.formCad.value.tema_es )		
	}
	enviarDescription(){		
		this.description.emit( this.formCad.value.description_es )		
	}
	enviarLogo(){		
		this.logo.emit( this.formCad.value.logo_es )
	}
	enviarTextoBtn(){		
		this.textBtn.emit( this.formCad.value.text_btn_es )
	}

}
