import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { ParceirosListaComponent } from "./parceiros-lista/parceiros-lista.component";
import { ParceirosComponent } from "./parceiros.component";

const ROUTES: Routes = [
    {path: '', component: ParceirosComponent}
]

@NgModule({
    declarations: [ParceirosComponent, ParceirosListaComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class ParceirosRoutes{}