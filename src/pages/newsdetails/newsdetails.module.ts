import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NewsdetailsPage } from './newsdetails';

@NgModule({
  declarations: [
    NewsdetailsPage,
  ],
  imports: [
    IonicPageModule.forChild(NewsdetailsPage),
  ],
  exports: [
    NewsdetailsPage
  ]
})
export class NewsdetailsPageModule {}
