import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap'

import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { UnCollegueComponent } from './un-collegue/un-collegue.component';
import { TableauCollegueComponent } from './tableau-collegue/tableau-collegue.component';
import { ListCollegueComponent } from './list-collegue/list-collegue.component';
import {HttpClientModule} from '@angular/common/http';
import {CollegueService} from './shared/service/collegue.service';
import { CarrouselComponent } from './carrousel/carrousel.component';
import { ScorePipe } from './shared/pipe/score.pipe';
import { NomPipe } from './shared/filtre/nom.pipe'
import {StateService} from './shared/status-server/state.service';


const appRoutes: Routes = [
  { path: 'classique', component: ListCollegueComponent },
  { path: 'tableau',      component:  TableauCollegueComponent},// sous forme d'un tableau pseudo scor action
  { path: 'carrousel',      component: CarrouselComponent },// sous forme d'un tableau pseudo scor action
  { path: 'detail/:id',      component: UnCollegueComponent },// sous forme d'un tableau pseudo scor actionpath: 'hero/:id'
  
  { path: '**', redirectTo:'classique' }
];

@NgModule({
  declarations: [
    
    AppComponent,
    UnCollegueComponent,
    TableauCollegueComponent,
    ListCollegueComponent,
    CarrouselComponent,
    ScorePipe,
    NomPipe
  ],
  
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    NgbModule.forRoot(),
    HttpClientModule
    // other imports here
  ],
  providers: [CollegueService,StateService],
  bootstrap: [AppComponent]
})
export class AppModule { }
