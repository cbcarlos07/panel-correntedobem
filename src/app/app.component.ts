import { Component } from '@angular/core';
import { UsuarioService } from './service/usuario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  	title = 'panel';

	constructor(private _userService: UsuarioService){}

	verifySession(){
		return this._userService.verifySession()
	}
}
