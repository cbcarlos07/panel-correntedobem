import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/service/usuario.service';

@Component({
	selector: 'app-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
	nome = "Nome"
	status = "Online"
	classeStatus = "text-success"
	menus = []
	mostrarMenu: false
	foto: string
	semfoto = 'assets/icon.png'
	constructor(private _usuarioService: UsuarioService) { }
	
	ngOnInit() {
		this.foto = 'assets/icon.png'
		this.getName()
	}
	getName(){
		this.nome = this._usuarioService.carregarNome()				
		this.getMenu()
	}

	getMenu(){
		this.menus = [
			{url: 'area', icone: ' fa-filter', menu: 'Área'},
			{url: 'meta', icone: ' fa-pencil-square-o', menu: 'Meta'},
			{url: 'arrecadacao', icone: ' fa-money', menu: 'Transparência'},
			{url: 'menu-config', icone: ' fa-bars', menu: 'Menu'},
			{url: 'usuario', icone: ' fa-user', menu: 'Usuário'},
			{url: 'tema', icone: ' fa-heartbeat', menu: 'Tema'},
			{url: 'email-config', icone: 'fa-envelope', menu: 'Configuração de Email'},
			{url: 'contato', icone: 'fa-bell', menu: 'Contatos'},
			{url: 'dados-contato', icone: 'fa-map-pin', menu: 'Dado de Contato'},
			{url: 'redes-sociais', icone: 'fa-twitter', menu: 'Redes Sociais'},
		]
		
		
	}

	verificaSessao(){
		return true
	}
	
}
