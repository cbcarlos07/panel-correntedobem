import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { UserFormComponent } from "./user-form/user-form.component";
import { UsuarioComponent } from "./usuario.component";

const ROUTES: Routes = [
    {path: '', component: UsuarioComponent},
    {path: 'cad', component: UserFormComponent},
    {path: 'edit/:id', component: UserFormComponent},
]

@NgModule({
    declarations: [UsuarioComponent,UserFormComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})

export class UsuarioRoutes{}