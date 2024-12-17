import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home-page/home-page.module').then(m => m.HomePageModule)
  },
  {
    path: 'contact',
    loadChildren: () => import('./contact-page/contact-page.module').then(m => m.ContactPageModule)
  },
  {
    path: 'sent',
    loadChildren: () => import('./sent-page/sent-page.module').then(m => m.SentPageModule)
  }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
