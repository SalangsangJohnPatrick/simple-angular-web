import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { InboxPageRoutingModule } from './inbox-page-routing.module';
import { InboxPageComponent } from './inbox-page.component';

@NgModule({
  declarations: [
    InboxPageComponent
  ],
  imports: [
    CommonModule,
    InboxPageRoutingModule,
  ]
})
export class InboxPageModule { }
