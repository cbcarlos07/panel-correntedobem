import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { SharedModule } from "src/app/shared/shared.module";
import { AwsComponent } from "./aws.component";

const ROUTES: Routes = [
    {path: '', component: AwsComponent}
]

@NgModule({
    declarations: [AwsComponent],
    imports: [SharedModule, RouterModule.forChild(ROUTES)]
})
export class AwsRoutes{}