import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { QuemSomosFotosComponent } from "./quem-somos-fotos/quem-somos-fotos.component";
import { QuemSomosComponent } from "./quem-somos.component";

const ROUTES: Routes = [
    {path: '', component: QuemSomosComponent},
    {path: 'fotos', component: QuemSomosFotosComponent},
]

@NgModule({
    declarations: [QuemSomosComponent,QuemSomosFotosComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class QuemSomosRoutes{}