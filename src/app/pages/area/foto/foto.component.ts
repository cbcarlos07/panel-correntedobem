import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AreaService } from 'src/app/service/area.service';
import { FotoService } from 'src/app/service/foto.service';
import { NotificationService } from 'src/app/service/notification.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-foto',
  templateUrl: './foto.component.html',
  styleUrls: ['./foto.component.css']
})
export class FotoComponent implements OnInit {
	title: string
	formCad: FormGroup
	area: string
	id: number
	fotos = []
	imgImage: string
	host: string
	idEdit: number
	constructor(private _fotoService: FotoService,
				private _notificationService: NotificationService,
				private _location: Location,
				private _activatedRouter: ActivatedRoute,
				private _areaService: AreaService) {
					this.host = `${environment.host}/foto`
				 }

	ngOnInit() {
		this.id = this._activatedRouter.snapshot.params['id'] || 0
		this.title = 'Adicione foto à área selecionada'
		this.idEdit = 0
		this.formCad = new FormGroup({
			area_id: new FormControl(this.id),
			foto: new FormControl('',{validators: [Validators.required]}),
			title: new FormControl(''),
			subtitle: new FormControl('')
		})

		this.getArea()

		this.getFotos()

	}

	submit(){
		console.log('idEdit',this.idEdit);
		
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
				this.formCad.controls.foto.setValue(null)
				this.formCad.controls.title.setValue(null)
				this.formCad.controls.subtitle.setValue(null)
				this.imgImage = null
				this.getFotos()
			})
	}

	update(){
		if( this.formCad.value.foto == "" || this.formCad.value.foto == null)
			delete this.formCad.value.foto
		console.log('form',this.formCad.value);
		
		this._fotoService
			.update(this.idEdit, this.formCad.value)
			.subscribe((response: any)=>{
				let obj = {
					message: 'Foto salva com sucesso',
					status: true
				}
				this._notificationService.notify( obj )
				this.formCad.controls.foto.setValue(null)
				this.formCad.controls.title.setValue(null)
				this.formCad.controls.subtitle.setValue(null)
				this.imgImage = null
				this.getFotos()
			})
	}

	getArea(){
		this._areaService
			.getById(this.id)
			.subscribe((response: any)=>{
				this.area = response.title
			})
	}

	getFotos(){
		this._fotoService
			.getById( this.id )
			.subscribe((response: any)=>{
				this.fotos = response
			})
	}

	async fileChangeEvent(event) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgImage = `data:image/png;base64,${retorno}`
			this.formCad.controls.foto.setValue( this.imgImage )
		}
	}

	convertToBa64(file: any){
		return new Promise((resolve, reject)=>{
			var reader = new FileReader();			
			reader.onload = (event: any) => {
                const binaryString  = event.target.result;
				let base64 = btoa(binaryString)
				resolve( base64 )
            }
			reader.readAsBinaryString(file);
		})
	}

	voltar(){
		this._location.back()
	}

	getItem(item: any){
		this.formCad.get("foto").clearValidators();//clear validation
		this.formCad.get("foto").setErrors(null);//updating error message
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
