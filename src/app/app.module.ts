import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WorkersComponent } from './components/workers/workers.component';
import { WorkerService } from './components/workers/worker.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';


@NgModule({
  declarations: [
    AppComponent,    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
     CommonModule,
    FormsModule,
    WorkersComponent
  ],
  providers: [WorkerService],
  bootstrap: [AppComponent]
})
export class AppModule { }

