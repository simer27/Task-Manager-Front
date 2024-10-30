import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { AddTaskModalComponent } from './add-task-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent, AddTaskModalComponent],
  imports: [BrowserModule, MatDialogModule],
  providers: [provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
