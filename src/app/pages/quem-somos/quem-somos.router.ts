import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { QuemSomosComponent } from "./quem-somos.component";

const ROUTES: Routes = [
    {path: '', component: QuemSomosComponent}
]

@NgModule({
    declarations: [QuemSomosComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class QuemSomosRoutes{}