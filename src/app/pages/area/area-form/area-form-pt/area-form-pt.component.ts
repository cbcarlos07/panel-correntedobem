import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';


import { HelperService } from 'src/app/service/helper.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-area-form-pt',
  templateUrl: './area-form-pt.component.html',
  styleUrls: ['./area-form-pt.component.css']
})
export class AreaFormPtComponent implements OnInit {
	formCad: FormGroup

	@Output() title = new EventEmitter()
	@Output() description = new EventEmitter()
	@Output() logo = new EventEmitter()
	@Output() short_text = new EventEmitter()
	@Input() titleStr: string
	@Input() descriptionStr: string
	@Input() logoStr: string
	@Input() short_textStr: string
	@Input() titleLabel?: string = 'Título'
	@Input() descriptionLabel?: string = 'Descrição'
	@Input() shortTextLabel?: string = 'Texto Resumido'
	@Input() logoLabel?: string = 'Logo'
	imgImage: string
	constructor(private _helperService: HelperService) { }

	ngOnInit() {
		var regex = /<br\s*[\/]?>/gi;
		this.formCad = new FormGroup({
			title: new FormControl( this.titleStr ),
			description: new FormControl( this.descriptionStr != null ? this.descriptionStr.replace(regex,'\n') : ''),
			logo: new FormControl( this.logoStr ),
			short_text: new FormControl( this.short_textStr != null ? this.short_textStr.replace(regex,'\n') : '')
		})
		if( this.logoStr != null ){
			this.imgImage = `${environment.host}/foto/${this.logoStr}`
		}
	}

	enviatTitle(){
		this.title.emit( this.formCad.value.title )
	}
	enviatDescription(){
		this.description.emit( this.formCad.value.description )
	}
	enviatLogo(){
		this.logo.emit( this.formCad.value.logo )
	}
	enviatShortText(){
		this.short_text.emit( this.formCad.value.short_text )
	}

	async fileChangeEvent(event) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this._helperService.convertToBa64(file)
			this.imgImage = `data:image/png;base64,${retorno}`
			
			
			this.formCad.controls.logo.setValue( this.imgImage )
		}
	}

}
