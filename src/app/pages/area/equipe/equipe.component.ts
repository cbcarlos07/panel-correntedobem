import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EquipeService } from 'src/app/service/equipe.service';
import  Swal from 'sweetalert2';
@Component({
	selector: 'app-equipe',
	templateUrl: './equipe.component.html',
	styleUrls: ['./equipe.component.css']
})
export class EquipeComponent implements OnInit {
	items = []
	id = 0
	constructor(private _equipeService: EquipeService,
				private _activatedRoute: ActivatedRoute,
				private _location: Location
		) { }
	
	ngOnInit() {
		this.id = this._activatedRoute.snapshot.params['id'] || 0
		this.getEquipe()
	}

	getEquipe(){
		this._equipeService
			.getArea( this.id )
			.subscribe((response: any)=>{
				this.items = response
			})
	}

	voltar(){
		this._location.back()
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
							this.getEquipe()
						})
					}else{
						
						Swal.fire(
							'Oops!',
							`<strong>${parametro.descricao}</strong> não foi removido(a)`,
							'error'
							).then(()=>{
								this.getEquipe()
							})
						}
						
					}
				})
			}
			
			remover( obj: any ){
				return new Promise((resolve, reject)=>{
					this._equipeService
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
