import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AreaFormComponent } from "./area-form/area-form.component";
import { AreaComponent } from "./area.component";
import { EquipeFormComponent } from "./equipe/equipe-form/equipe-form.component";
import { EquipeComponent } from "./equipe/equipe.component";

const ROUTES: Routes = [
    {path: '', component: AreaComponent},
    {path: 'cad', component: AreaFormComponent},
    {path: 'edit/:id', component: AreaFormComponent},
    {path: 'equipe/:id', component: EquipeComponent},
    {path: 'equipe/:area/cad', component: EquipeFormComponent},
    {path: 'equipe/:area/edit/:id', component: EquipeFormComponent}
]

@NgModule({
    declarations: [AreaComponent, AreaFormComponent,EquipeComponent, EquipeFormComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})
export class AreaRoutes{}