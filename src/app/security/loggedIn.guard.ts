import { Injectable } from "@angular/core";
import { CanLoad, CanActivate, Route,  ActivatedRouteSnapshot, RouterStateSnapshot } from "@angular/router";
import { UsuarioService } from "../service/usuario.service";

@Injectable()
export class LoggedInGuard implements CanLoad, CanActivate {
    constructor(private _userService: UsuarioService){}
    checkAuthentication(path: string): boolean {
        const loggedIn = this._userService.verifySession()
        
        if( !loggedIn ){
            this._userService.handleLogin()
        }
        return loggedIn
    }

    canLoad(route: Route): boolean{
        return this.checkAuthentication( `${route.path}` )
    }

    canActivate(activatedRouter: ActivatedRouteSnapshot, routerState: RouterStateSnapshot): boolean{
        return this.checkAuthentication( `${activatedRouter.routeConfig.path}` )
    }
}