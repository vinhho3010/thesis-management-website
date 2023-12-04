import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PublicLayoutComponent } from './public-layout/public-layout.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { PublicRoutingModule } from './public-routing.module';
import { LandingComponent } from 'src/app/pages/public/landing/landing.component';
import { NotFoundComponent } from 'src/app/pages/public/not-found/not-found.component';



@NgModule({
  declarations: [
    PublicLayoutComponent,
    LandingComponent,
    NotFoundComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    PublicRoutingModule
  ]
})
export class PublicModule { }
