import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ContatoDadosComponent } from "./contato-dados.component";

const ROUTES: Routes = [
    {path: '', component: ContatoDadosComponent}
]

@NgModule({
    declarations: [ContatoDadosComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})

export class DadosRoutes{}