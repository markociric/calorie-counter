// src/app/app.module.ts
import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule }                          from '@angular/platform-browser';
import { FormsModule }                            from '@angular/forms';
import { AppRoutingModule }                       from './app-routing-module';
import { provideCharts }                          from 'ng2-charts';
import { App }                                    from './app';
import { LoginComponent }                         from './pages/login/login.component';
import { DashboardComponent }                     from './pages/dashboard/dashboard';
import { RegisterComponent }                      from './pages/register/register';
import { HttpClientModule, HTTP_INTERCEPTORS }    from '@angular/common/http';
import { AuthInterceptor }                        from './interceptors/auth-interceptor';
import { AdminComponent }                         from './pages/admin/admin';

@NgModule({
  declarations: [
    App,
    DashboardComponent,
    LoginComponent,
    RegisterComponent,
    AdminComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideCharts(),
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [App],
})
export class AppModule {}
