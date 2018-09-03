import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { ContentPoliciesPage } from './content-policies';

@NgModule({
  declarations: [
    ContentPoliciesPage,
  ],
  imports: [
    IonicPageModule.forChild(ContentPoliciesPage),
  ],
})
export class ContentPoliciesPageModule {}
