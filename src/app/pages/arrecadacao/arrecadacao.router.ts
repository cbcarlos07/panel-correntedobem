import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ArrecadacaoComponent } from "./arrecadacao.component";

const ROUTES: Routes = [
    {path: '', component: ArrecadacaoComponent}
]

@NgModule({
    declarations: [ArrecadacaoComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})

export class ArrecadacaoRoutes{}