import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AcoesFormComponent } from "./acoes-form/acoes-form.component";
import { AcoesItemComponent } from "./acoes-item/acoes-item.component";
import { AcoesComponent } from "./acoes.component";

const ROUTES: Routes = [
    {path: '', component: AcoesComponent}
]

@NgModule({
    declarations: [AcoesComponent, AcoesItemComponent, AcoesFormComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})

export class AcoesRoutes{}