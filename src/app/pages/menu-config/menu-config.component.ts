import { Component, OnInit } from '@angular/core';
import { MenuService } from 'src/app/service/menu.service';
import  Swal from 'sweetalert2';
@Component({
	selector: 'app-menu-config',
	templateUrl: './menu-config.component.html',
	styleUrls: ['./menu-config.component.css']
})
export class MenuConfigComponent implements OnInit {
	items: []
	constructor(private _menuService: MenuService) { }
	
	ngOnInit() {
		this.get()
	}

	get(){
		this._menuService
			.get()
			.subscribe((response: any)=>{
				this.items = response
			})
	}

	
	perguntaRemover( parametro: any ){
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${parametro.name}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, quero remover!',
			cancelButtonText: 'Não',
			preConfirm:  () => {
				const  r = this.remover(parametro)
				return r
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result) => {
			if (result.value) {
				if( result.value ){
					Swal.fire(
						'Removido!',
						`${parametro.descricao} removido com sucesso`,
						'success'
						).then(()=>{
							this.get()
						})
					}else{
						
						Swal.fire(
							'Oops!',
							`<strong>${parametro.descricao}</strong> não foi removido(a)`,
							'error'
							).then(()=>{
								this.get()
							})
						}
						
					}
				})
			}
			
			remover( obj: any ){
				return new Promise((resolve, reject)=>{
					this._menuService
					.delete( obj.id )
					.subscribe(()=>{
						resolve(true)
					}, err => {
						console.error(err);
						reject( {log: err} )
					})
				})
			}
	
}
