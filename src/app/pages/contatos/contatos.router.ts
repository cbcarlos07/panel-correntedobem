import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ContatoFormComponent } from "./contato-form/contato-form.component";
import { ContatosComponent } from "./contatos.component";

const ROUTES: Routes = [
    {path: '', component: ContatosComponent},
    {path: 'view/:id', component: ContatoFormComponent}
]

@NgModule({
    declarations:[ContatosComponent, ContatoFormComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})

export class ContatoRoutes{}