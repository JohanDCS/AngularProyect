import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesSalesSystemComponent } from './pages.sales-system.component';
import { HomeSalesSystemComponent } from './home/home.sales-system.component';
import { ClientsComponent } from './clients/clients.component';
import { AsistenciaComponent } from './asistencia/asistencia.component';
import { AuthGuard } from 'src/app/services/guard/auth.guard';

const routes: Routes = [
	{
		path: 'sales-system',
		component: PagesSalesSystemComponent,
		children: [
			{ path: 'home', component: HomeSalesSystemComponent, canActivate: [AuthGuard] },
			{ path: 'users', component: ClientsComponent, canActivate: [AuthGuard] },
			{ path: 'asistencia', component: AsistenciaComponent, canActivate: [AuthGuard] }
		],
	},
];

@NgModule({
	imports: [CommonModule, RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class SalesSystemRoutingModule {}
