import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NotificationService } from 'src/app/service/notification.service';
import { ParceirosService } from 'src/app/service/parceiros.service';

@Component({
	selector: 'app-parceiros',
	templateUrl: './parceiros.component.html',
	styleUrls: ['./parceiros.component.css']
})
export class ParceirosComponent implements OnInit {
	title: string
	formCad: FormGroup
	id: number
	images = []
	imgImage: string
	host: string
	idEdit: number
	constructor(private _parceirosService: ParceirosService,
				private _activatedRouter: ActivatedRoute,
				private _notificationService: NotificationService
		) { }
	
	ngOnInit() {
		this.id = this._activatedRouter.snapshot.params['id'] || 0
		this.title = 'Área destinada ao cadastro de parceiros'
		this.idEdit = 0
		this.formCad = new FormGroup({			
			title: new FormControl('',{validators: [Validators.required]}),
			image: new FormControl('',{validators: [Validators.required]}),
		})
		this.getimages()
	}
	submit(){
		
		
		if( this.idEdit == 0 ){
			this.novo()
		}else{
			this.update()
		}
	}

	novo(){
		this._parceirosService
			.save(this.formCad.value)
			.subscribe((response: any)=>{
				let obj = {
					message: 'image salva com sucesso',
					status: true
				}
				this._notificationService.notify( obj )
				this.formCad.controls.image.setValue(null)
				this.formCad.controls.title.setValue(null)
				this.imgImage = null
				this.getimages()
			})
	}

	update(){
		if( this.formCad.value.image == "" || this.formCad.value.image == null)
			delete this.formCad.value.image
		
		
		this._parceirosService
			.update(this.idEdit, this.formCad.value)
			.subscribe((response: any)=>{
				let obj = {
					message: 'image salva com sucesso',
					status: true
				}
				this._notificationService.notify( obj )
				this.formCad.controls.image.setValue(null)
				this.formCad.controls.title.setValue(null)
				this.imgImage = null
				this.getimages()
			})
	}


	

	async fileChangeEvent(event) {
		var files = event.target.files;
      	var file = files[0];
		
		if (files && file) {
			let retorno: any = await this.convertToBa64(file)
			this.imgImage = `data:image/png;base64,${retorno}`
			this.formCad.controls.image.setValue( this.imgImage )
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

	getItem(item: any){
		this.formCad.get("image").clearValidators();//clear validation
		this.formCad.get("image").setErrors(null);//updating error message
		this.formCad.updateValueAndValidity();//update validation
		this.formCad.controls.title.setValue(item.title)
		this.idEdit = item.id
		//this.frmFeasibility.controls['pop_name'].setValidators([]);
		
	}

	getimages(){
		this._parceirosService
			.get(  )
			.subscribe((response: any)=>{
				this.images = response
			})
	}
	
}
