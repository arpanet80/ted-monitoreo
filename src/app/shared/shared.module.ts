import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";

import { PipesModule } from "../pipes/pipes.module";
import { BreadcrumbsComponent } from "./breadcrumbs/breadcrumbs.component";
import { HeaderComponent } from "./header/header.component";
import { NopagefoundComponent } from "./nopagefound/nopagefound.component";
import { SidebarComponent } from "./sidebar/sidebar.component";
import { FooterComponent } from './footer/footer.component';

@
NgModule({
  imports: [
    PipesModule,
    RouterModule,
    CommonModule
  ],
  declarations: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ],
  exports: [
    NopagefoundComponent,
    HeaderComponent,
    SidebarComponent,
    BreadcrumbsComponent,
    FooterComponent,
  ]
})

export  class ShareModule {}
