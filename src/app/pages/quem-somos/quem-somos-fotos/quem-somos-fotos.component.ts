import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/service/area.service';
import { HelperService } from 'src/app/service/helper.service';
import { NotificationService } from 'src/app/service/notification.service';
import { QuemSomosFotosService } from 'src/app/service/quem-somos-fotos.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-quem-somos-fotos',
  templateUrl: './quem-somos-fotos.component.html',
  styleUrls: ['./quem-somos-fotos.component.css']
})
export class QuemSomosFotosComponent implements OnInit {

	title: string
	formCad: FormGroup
	area: string
	id: number
	fotos = []
	imgImage: string
	host: string
	idEdit: number
	constructor(private _fotoService: QuemSomosFotosService,
				private _notificationService: NotificationService,
				private _location: Location,
				private _activatedRouter: ActivatedRoute,
				private _helperService: HelperService) {
					this.host = `${environment.host}/foto`
				 }

	ngOnInit() {
		this.id = this._activatedRouter.snapshot.params['id'] || 0
		this.title = 'Adicione foto à área selecionada'
		this.idEdit = 0
		this.formCad = new FormGroup({
			photo: new FormControl('',{validators: [Validators.required]}),
			title: new FormControl(''),
			subtitle: new FormControl('')
		})

		

		this.getFotos()

	}

	submit(){
		
		
		if( this.idEdit == 0 ){
			this.novo()
		}else{
			this.update()
		}
	}

	novo(){
		this._fotoService
			.save(this.formCad.value)
			.subscribe((response: any)=>{
				let obj = {
					message: 'Foto salva com sucesso',
					status: true
				}
				this._notificationService.notify( obj )
				this.formCad.controls.photo.setValue(null)
				this.formCad.controls.title.setValue(null)
				this.formCad.controls.subtitle.setValue(null)
				this.imgImage = null
				this.getFotos()
			})
	}

	update(){
		if( this.formCad.value.photo == "" || this.formCad.value.photo == null)
			delete this.formCad.value.photo
		
		
		this._fotoService
			.update(this.idEdit, this.formCad.value)
			.subscribe((response: any)=>{
				let obj = {
					message: 'Foto salva com sucesso',
					status: true
				}
				this._notificationService.notify( obj )
				this.formCad.controls.photo.setValue(null)
				this.formCad.controls.title.setValue(null)
				this.formCad.controls.subtitle.setValue(null)
				this.imgImage = null
				this.getFotos()
			})
	}

	

	getFotos(){
		this._fotoService
			.get()
			.subscribe((response: any)=>{
				this.fotos = response
			})
	}

	async fileChangeEvent(event) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this._helperService.convertToBa64(file)
			this.imgImage = `data:image/png;base64,${retorno}`
			this.formCad.controls.photo.setValue( this.imgImage )
		}
	}



	voltar(){
		this._location.back()
	}

	getItem(item: any){
		this.formCad.get("photo").clearValidators();//clear validation
		this.formCad.get("photo").setErrors(null);//updating error message
		this.formCad.updateValueAndValidity();//update validation
		this.formCad.controls.title.setValue(item.title)
		this.formCad.controls.subtitle.setValue(item.subtitle)
		this.idEdit = item.id
		//this.frmFeasibility.controls['pop_name'].setValidators([]);
	}

	remover(item: any){
		this._fotoService	
			.delete(item.id)
			.subscribe((response: any)=>{
				this.getFotos()
			})
	}

}
