import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MenuConfigComponent } from "./menu-config.component";
import { MenuFormComponent } from "./menu-form/menu-form.component";

const ROUTES: Routes = [
    {path: '', component: MenuConfigComponent},
    {path: 'cad', component: MenuFormComponent},
    {path: 'edit/:id', component: MenuFormComponent}
]

@NgModule({
    declarations: [MenuConfigComponent,MenuFormComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})
export class MenuConfigRoutes{}