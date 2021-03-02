import { Component, OnInit } from '@angular/core';
import { AcoesItemService } from 'src/app/service/acoes-item.service';
import  Swal from 'sweetalert2';
@Component({
  selector: 'app-acoes-item',
  templateUrl: './acoes-item.component.html',
  styleUrls: ['./acoes-item.component.css']
})
export class AcoesItemComponent implements OnInit {
	items = []
	id: number
	title: string
	constructor(private _acoesItemService: AcoesItemService) { }

	ngOnInit() {
		this.getAll()
	}

	getAll(){
		this._acoesItemService
			.get()
			.subscribe((response: any)=>{
				
				this.items = response
			})
	}

	telaNovaAcao(){
		this.id = 0
		this.title = 'Adicionar nova ação'
		this.formulario({})
	}

	telaEditarAcao(obj: any){
		this.id = obj.id
		delete obj.id
		this.formulario(obj)
	}

	formulario(obj: any){
		Swal.fire({
			title: this.title,
			html: 			
			'<input id="swal-input1" class="swal2-input" placeholder="Descrição" title="Descrição">'+
			'<input id="swal-input2" class="swal2-input" placeholder="Descripción" title="Descripción">'+
			'<input id="swal-input3" class="swal2-input" placeholder="Description" title="Description">'+
			'<input id="swal-input4" class="swal2-input form-control" placeholder="Valor" title="Valor">' ,
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Salvar!',
			cancelButtonText: 'Fechar',
			focusConfirm: false,
			heightAuto: false,
			width: '400px',
			showLoaderOnConfirm: true,
			allowOutsideClick: false,
			onOpen: () =>{				
				let descricao: any = document.getElementById('swal-input1')
				let descricao_es: any = document.getElementById('swal-input2')
				let descricao_en: any = document.getElementById('swal-input3')
				let valor: any = document.getElementById('swal-input4')				
				descricao.value = `${obj.description == undefined ? '' : obj.description}`
				descricao_es.value = `${obj.description_es == undefined ? '' : obj.description_es}`
				descricao_en.value = `${obj.description_en == undefined ? '' : obj.description_en}`
				valor.value = `${obj.value == undefined ? '' : obj.value}`
			},
			preConfirm: async () => {				
				let campo_descricao: any = document.getElementById('swal-input1')
				let campo_descricao_es: any = document.getElementById('swal-input2')
				let campo_descricao_en: any = document.getElementById('swal-input3')
				let campo_valor: any = document.getElementById('swal-input4')
				let descricao = campo_descricao.value
				let descricao_es = campo_descricao_es.value
				let descricao_en = campo_descricao_en.value
				let valor = campo_valor.value				
				return await this.salvarAcao({
					description: descricao,
					description_es: descricao_es,
					description_en: descricao_en,
					value: valor,
				})
			}
		  }).then((result: any) => {
			
			if( !result.dismiss ){
			  if (result.value.status) {
				Swal.fire(
					'Muito bem',
					`${result.value.title}`,
					'success'
				).then(()=>{
					this.getAll()
				})
				setTimeout(() => {
					Swal.close();
					
				}, 3000);
			  }else{
				console.error(result.value.log);        
				Swal.fire(
					'Oops!',
					`${result.value.msg}`,
					'error'
				).then(()=>{
				})
			  }
			}
	    })
	}

	salvarAcao( obj: any ){
		
		
		if( this.id != 0){
			return this.atualizarAcao( obj )
		}else{
			return this.novaAcao( obj )
		}
	}

	novaAcao(obj: any){
		return new Promise((resolve, reject)=>{
			this._acoesItemService
				.save(obj)
				.subscribe(()=>{
					resolve({status: true, title: 'Ação adicionada com sucesso!' })
				}, err => {
					console.error('Error', err);
					reject({log: err, msg: 'Problema ao tentar adicionar'})
				})
		})
		
	}

	atualizarAcao(obj: any){
		return new Promise((resolve, reject)=>{
			this._acoesItemService
				.update(this.id, obj)
				.subscribe((response: any)=>{
					resolve({status: true, title: 'Ação atualizada com sucesso!' })		
				})

		})
	}

	perguntaRemover( parametro: any ){
		Swal.fire({
			title: 'Atenção!',
			text: `Deseja realmente remover ${parametro.description}`,
			icon: 'warning',
			showCancelButton: true,
			confirmButtonColor: '#3085d6',
			cancelButtonColor: '#d33',
			confirmButtonText: 'Sim, quero remover!',
			cancelButtonText: 'Não',
			preConfirm:  () => {
				const  r = this.remover(parametro.id)
				return r
			},
			allowOutsideClick: () => !Swal.isLoading()
		}).then((result: any) => {
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
					console.error(result.value.log);        
					Swal.fire(
					'Oops!',
					`<strong>${parametro.medidor}</strong> não foi removido(a)`,
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
			this._acoesItemService
				.delete( obj )
				.subscribe(()=>{
					resolve(true)
				}, err => {
					console.error(err);
					reject( {log: err} )
				})
		})
	}




}
