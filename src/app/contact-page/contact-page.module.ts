import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ContactPageRoutingModule } from './contact-page-routing.module';
import { ReactiveFormsModule } from '@angular/forms';
import { ContactPageComponent } from './contact-page.component';

@NgModule({
  declarations: [
    ContactPageComponent
  ],
  imports: [
    CommonModule,
    ContactPageRoutingModule,
    ReactiveFormsModule,
  ]
})
export class ContactPageModule { } 
