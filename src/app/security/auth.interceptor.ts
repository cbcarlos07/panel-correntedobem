import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable, Injector } from "@angular/core";
import { Observable } from "rxjs";
import { UsuarioService } from "../service/usuario.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
    constructor(private injector: Injector){}
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>>{
        const userService = this.injector.get( UsuarioService )
        if( userService.verifySession() ){            
            const authRequest = request.clone({
                setHeaders: {'x-access-token': userService.getToken()}
            })
            return next.handle(authRequest)
        }
        return next.handle( request )
    }
}