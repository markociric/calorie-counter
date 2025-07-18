import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing-module';
import { provideCharts } from 'ng2-charts';
import { App } from './app';
import { LoginComponent } from './pages/login/login.component';
import { DashboardComponent } from './pages/dashboard/dashboard';
import { RegisterComponent } from './pages/register/register';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [App, DashboardComponent, LoginComponent, RegisterComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideBrowserGlobalErrorListeners(), provideCharts()],
  bootstrap: [App],
})
export class AppModule {}
