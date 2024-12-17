import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentPageRoutingModule } from './sent-page-routing.module';
import { SentPageComponent } from './sent-page.component';

@NgModule({
  declarations: [
    SentPageComponent
  ],
  imports: [
    CommonModule,
    SentPageRoutingModule,
  ]
})
export class SentPageModule { }
