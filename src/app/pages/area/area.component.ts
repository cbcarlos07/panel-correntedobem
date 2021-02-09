import { Component, OnInit } from '@angular/core';
import { AreaService } from 'src/app/service/area.service';
import { UsuarioService } from 'src/app/service/usuario.service';
import { environment } from 'src/environments/environment';
import  Swal from 'sweetalert2';
@Component({
	selector: 'app-area',
	templateUrl: './area.component.html',
	styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
	items = []
	host: string
	constructor(private _areaService: AreaService, 
				private _userService: UsuarioService) {
		this.host = `${environment.host}/foto`
	//	this.escutaLogin()
	 }
	
	ngOnInit() {
		this.getAll()
	}

	getAll(){
		this._areaService
			.get()
			.subscribe((response: any) => {
				this.items = response
				
			})
	}

	escutaLogin(){
		this._userService
			.notifierLogin
			.subscribe( load => {
				setTimeout(() => {
					window.location.reload();					
				}, 500);
			})
	}


	perguntaRemover( parametro: any ){
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${parametro.title}`,
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
							this.getAll()
						})
					}else{
						
						Swal.fire(
							'Oops!',
							`<strong>${parametro.descricao}</strong> não foi removido(a)`,
							'error'
							).then(()=>{
								this.getAll()
							})
						}
						
					}
				})
			}
			
			remover( obj: any ){
				return new Promise((resolve, reject)=>{
					this._areaService
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
