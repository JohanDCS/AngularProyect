import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthModule } from './auth/auth.module';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { PagesModule } from './pages/pages.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { AuthTokenInterceptor } from './services/guard/auth-token.interceptor';

@NgModule({
	declarations: [AppComponent],
	imports: [
		BrowserModule,
		HttpClientModule,
		AppRoutingModule,
		AuthModule,
		PagesModule,
		NgbModule,
		BrowserAnimationsModule, // required animations module
		ToastrModule.forRoot(), // ToastrModule added
	],
	providers: [
		// Registra el interceptor como un proveedor
		{ provide: HTTP_INTERCEPTORS, useClass: AuthTokenInterceptor, multi: true },
	],
	bootstrap: [AppComponent],
})
export class AppModule {}
