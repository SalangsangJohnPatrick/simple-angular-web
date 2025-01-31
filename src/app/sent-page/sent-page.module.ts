import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SentPageRoutingModule } from './sent-page-routing.module';
import { SentPageComponent } from './sent-page.component';
import { NgbAccordionModule } from '@ng-bootstrap/ng-bootstrap';

@NgModule({
  declarations: [
    SentPageComponent
  ],
  imports: [
    CommonModule,
    SentPageRoutingModule,
    NgbAccordionModule
  ]
})
export class SentPageModule { }
