import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { MetaComponent } from "./meta.component";

const ROUTES = [
    {path: '', component: MetaComponent}
]

@NgModule({
    declarations: [MetaComponent],
    imports: [SharedModule, RouterModule.forChild( ROUTES )]
})

export class MetaRoutes{}