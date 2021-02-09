import { CommonModule, registerLocaleData } from "@angular/common";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule, ModuleWithProviders, LOCALE_ID } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { RouterModule } from "@angular/router";
import { NgxCurrencyModule } from "ngx-currency";
import { HeaderComponent } from "../common/header/header.component";
import { MenuComponent } from "../common/menu/menu.component";
import { InputComponent } from "./input/input.component";
import { SnackbarComponent } from "./snackbar/snackbar.component";
import { CustomCurrencyMaskConfig } from './CustomCurrencyMaskConfig'
import { NotificationService } from "../service/notification.service";
import localePt from '@angular/common/locales/pt'
import { AuthInterceptor } from "../security/auth.interceptor";
import { LoggedInGuard } from "../security/loggedIn.guard";
registerLocaleData(localePt, 'pt-BR')
@NgModule({
    declarations: [
        HeaderComponent,
        MenuComponent,
        SnackbarComponent,
        InputComponent
    ],
    imports: [
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCurrencyModule.forRoot(CustomCurrencyMaskConfig),
    ],
    exports: [
        HeaderComponent,
        MenuComponent,
        SnackbarComponent,
        InputComponent,
        CommonModule,
        RouterModule,
        HttpClientModule,
        FormsModule,
        ReactiveFormsModule,
        NgxCurrencyModule
    ]
})

export class SharedModule{
    static forRoot(): ModuleWithProviders{
        return {
            ngModule: SharedModule,
            providers: [
                NotificationService,
                LoggedInGuard,
                {provide: LOCALE_ID, useValue: 'pt-BR'},
                {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true}
            ]
        }
    }
}