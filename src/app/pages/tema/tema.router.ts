import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { TemaFormEnComponent } from "./tema-form-en/tema-form-en.component";
import { TemaFormEsComponent } from "./tema-form-es/tema-form-es.component";
import { TemaFormPtComponent } from "./tema-form-pt/tema-form-pt.component";

import { TemaComponent } from "./tema.component";

const ROUTES: Routes = [
    {path: '', component: TemaComponent}
]

@NgModule({
    declarations: [TemaComponent, TemaFormPtComponent, TemaFormEsComponent, TemaFormEnComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})

export class TemaRoutes{}