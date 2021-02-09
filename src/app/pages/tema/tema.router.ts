import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { TemaComponent } from "./tema.component";

const ROUTES: Routes = [
    {path: '', component: TemaComponent}
]

@NgModule({
    declarations: [TemaComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})

export class TemaRoutes{}