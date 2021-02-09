import { Component, OnInit } from '@angular/core';
import { RedesSociaisService } from 'src/app/service/redes-sociais.service';
import  Swal from 'sweetalert2';
@Component({
  selector: 'app-redes-sociais',
  templateUrl: './redes-sociais.component.html',
  styleUrls: ['./redes-sociais.component.css']
})
export class RedesSociaisComponent implements OnInit {

	items: []
	constructor(private _redesSociaisService: RedesSociaisService) { }
	
	ngOnInit() {
		this.get()
	}

	get(){
		this._redesSociaisService
			.get()
			.subscribe((response: any)=>{
				this.items = response
			})
	}

	
	perguntaRemover( parametro: any ){
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${parametro.rede}`,
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
			this._redesSociaisService
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
