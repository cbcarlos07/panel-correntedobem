import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { RedesFormComponent } from "./redes-form/redes-form.component";
import { RedesSociaisComponent } from "./redes-sociais.component";

const ROUTES: Routes = [
    {path: '', component: RedesSociaisComponent},
    {path: 'cad', component: RedesFormComponent},
    {path: 'edit/:id', component: RedesFormComponent},
]

@NgModule({
    declarations: [RedesSociaisComponent,RedesFormComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})

export class RedesSociaisRoutes{}