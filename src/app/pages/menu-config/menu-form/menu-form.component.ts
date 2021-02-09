import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MenuService } from 'src/app/service/menu.service';
import { NotificationService } from 'src/app/service/notification.service';

@Component({
	selector: 'app-menu-form',
	templateUrl: './menu-form.component.html',
	styleUrls: ['./menu-form.component.css']
})
export class MenuFormComponent implements OnInit {
	formCad: FormGroup
	title: string
	id: number
	constructor(private _activatedRoute: ActivatedRoute,
			    private _menuService: MenuService,
				private _notificationService: NotificationService,
				private _location: Location
		) { }
	
	ngOnInit() {
		this.id = this._activatedRoute.snapshot.params['id'] || 0
		this.title = this.id > 0 ? 'Alterar Cadastro de Menu' : 'Cadastrar Menu'
		this.formCad = new FormGroup({
			name: new FormControl('', {validators: [Validators.required]}),
			url: new FormControl('',{validators: [Validators.required]}),
			order_item: new FormControl('',{validators: [Validators.required]})
		})

		if( this.id > 0 ) this.buscar()
	}

	buscar(){
		this._menuService
			.getById( this.id )
			.subscribe((response: any)=>{
				this.formCad.controls.name.setValue( response.name )
				this.formCad.controls.url.setValue( response.url )
				this.formCad.controls.order_item.setValue( response.order_item )
			})
	}

	submit(){
		if( this.id == 0 ){
			this.novo()
		}else{
			this.update()
		}
	}

	novo(){
		this._menuService
			.save( this.formCad.value )
			.subscribe((response: any)=>{
				this.alerta()
			})
	}

	update(){
		this._menuService
			.update(this.id, this.formCad.value)
			.subscribe((response: any)=>{
				this.alerta()
			})
	}

	alerta(){
		let obj = {
			message: 'Item salvo com sucesso',
			status: true
		}
		this._notificationService.notify( obj )
		this.voltar()
	}

	voltar(){
		this._location.back()
	}
	
}
