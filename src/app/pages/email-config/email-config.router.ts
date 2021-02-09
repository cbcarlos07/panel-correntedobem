import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { EmailConfigComponent } from "./email-config.component";

const ROUTES: Routes = [
    {path: '', component: EmailConfigComponent}
]

@NgModule({
    declarations: [EmailConfigComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class EmaiLConfigRoutes{}