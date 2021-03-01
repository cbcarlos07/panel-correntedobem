import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { HelperService } from 'src/app/service/helper.service';
import { environment } from 'src/environments/environment';
import { Tema } from '../tema.model';

@Component({
  selector: 'app-tema-form-en',
  templateUrl: './tema-form-en.component.html',
  styleUrls: ['./tema-form-en.component.css']
})
export class TemaFormEnComponent implements OnInit {

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
			description_en: new FormControl(this.objTema.description_en),			
			logo_en:        new FormControl(''),			
			tema_en:        new FormControl(this.objTema.tema_en),
			text_btn_en:    new FormControl(this.objTema.text_btn_en)
		})
		if( this.objTema.logo_en ) {
			let host = environment.host
			this.imgLogo = `${host}/foto/${this.objTema.logo_en}`
		}
	}
	
	async fileChangeEventLogo(event: any) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this._helperService.convertToBa64(file)
			this.imgLogo = `data:image/png;base64,${retorno}`
			this.formCad.controls.logo_en.setValue( this.imgLogo )
			this.enviarLogo()
		}
	}

	enviarTema(){		
		this.tema.emit( this.formCad.value.tema_en )		
	}
	enviarDescription(){		
		this.description.emit( this.formCad.value.description_en )		
	}
	enviarLogo(){		
		this.logo.emit( this.formCad.value.logo_en )
	}

	enviarTextoBtn(){		
		this.textBtn.emit( this.formCad.value.text_btn_en )
	}

}
