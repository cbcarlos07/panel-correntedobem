import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { LoggedInGuard } from './security/loggedIn.guard';


const routes: Routes = [
	{
		path: '',
		component: LoginComponent
	},
	{
		path: 'area',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],		
		children: [
			{path: '', loadChildren: './pages/area/area.router#AreaRoutes'}
		]
	},
	{
		path: 'meta',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],		
		children: [
			{path: '', loadChildren: './pages/meta-dados/meta.router#MetaRoutes'}
		]
	},
	{
		path: 'arrecadacao',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],		
		children: [
			{path: '', loadChildren: './pages/arrecadacao/arrecadacao.router#ArrecadacaoRoutes'}
		]
	},
	{
		path: 'menu-config',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
		children: [
			{path: '', loadChildren: './pages/menu-config/menu-config.router#MenuConfigRoutes'}
		]
	},
	{
		path: 'usuario',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
		children: [
			{path: '', loadChildren: './pages/usuario/usuario.router#UsuarioRoutes'}
		]
	},
	{
		path: 'tema',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
		children: [
			{path: '', loadChildren: './pages/tema/tema.router#TemaRoutes'}
		]
	},
	{
		path: 'email-config',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
		children: [
			{path: '', loadChildren: './pages/email-config/email-config.router#EmaiLConfigRoutes'}
		]
	},
	{
		path: 'contato',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
		children: [
			{path: '', loadChildren: './pages/contatos/contatos.router#ContatoRoutes'}
		]
	},
	{
		path: 'dados-contato',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
		children: [
			{path: '', loadChildren: './pages/contato-dados/dados.router#DadosRoutes'}
		]
	},
	{
		path: 'redes-sociais',
		canLoad: [LoggedInGuard],
		canActivate: [LoggedInGuard],
		children: [
			{path: '', loadChildren: './pages/redes-sociais/redes-sociais.router#RedesSociaisRoutes'}
		]
	}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule { }
