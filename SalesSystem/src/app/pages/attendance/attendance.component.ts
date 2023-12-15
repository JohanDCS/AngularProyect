import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DataTableDirective } from 'angular-datatables';
import { Subscription } from 'rxjs';
import { AsistenciaService } from 'src/app/services/api/asistencia.service';
import { AttendanceService } from 'src/app/services/api/attendance.service';
import { NotificationService } from 'src/app/services/controller/notification.service';
import { environment } from 'src/environments/environment';
import { DataTablesResponse, DataTables_AjaxCallback } from 'src/interface/DataTable.interface';
import { DataTables_Spanish } from 'src/utils/proyect.utils';

@Component({
	selector: 'app-attendance',
	templateUrl: './attendance.component.html',
	styleUrls: ['./attendance.component.css'],
})
export class AttendanceComponent implements OnInit, OnDestroy {
	form: FormGroup = this.formGroup.group({
		dni: [
			0,
			[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/), Validators.min(0)],
		],
	});
	dtOptions = {};
	suscriptionDataTables?: Subscription;
	get nowDate() {
		const nowDate = new Date();
		const dateStringInSpanish = nowDate.toLocaleDateString('es-ES', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
		return dateStringInSpanish;
	}
	constructor(
		private formGroup: FormBuilder,
		private http: HttpClient,
		private notification: NotificationService,
		private renderer: Renderer2,
		private attendanceService: AsistenciaService,
	) {}
	@ViewChild(DataTableDirective, { static: false })
	private dataTableElement?: DataTableDirective;
	private reloadDataTable() {
		this.dataTableElement?.dtInstance.then((dtIntance: DataTables.Api) => {
			dtIntance.ajax.reload();
		});
	}
	ngOnDestroy(): void {
		this.renderer.removeClass(document.body, 'body-for-selector-login');
		this.suscriptionDataTables?.unsubscribe();
		this.suscriptionDataTables = undefined;
	}
	ngOnInit(): void {
		this.renderer.addClass(document.body, 'body-for-selector-login');
		this.dtOptions = {
			serverSide: false,
			/*serverSide: true,*/
			processing: true,
			language: DataTables_Spanish,
			ajax: (dataTablesParameters: any, callback: DataTables_AjaxCallback) => {
				const customParameters = {
					...dataTablesParameters,
					date: new Date(),
				};
				this.suscriptionDataTables = this.http
					.get<DataTablesResponse>(
						`${environment.API_REST.URL}/asistencia/mostrar/load`,
					)
					.subscribe((resp) => {
						callback({
							recordsTotal: resp.recordsTotal,
							recordsFiltered: resp.recordsFiltered,
							data: resp.data,
						});
					});
			},
			// Declare the use of the extension in the dom parameter
			dom: 'Bfrtip',
			// Configure the buttons 'colvis', 'csv', 'excel', 'pdf', 'print'
			buttons: [
				{
					text: 'Recargar',
					action: (e: any, dt: any, node: any, config: any) => {
						this.reloadDataTable();
						this.notification.success('Se sincroniza la tabla con la base de datos.');
					},
				},
				{
					text: 'Visualización',
					extend: 'colvis',
				},
				{
					text: 'Exportar',
					extend: 'collection',
					buttons: [
						{
							text: 'Copiar',
							extend: 'copy',
						},
						{
							text: 'Excel',
							extend: 'excel',
						},
						{
							text: 'PDF',
							extend: 'pdf',
						},
						{
							text: 'CSV',
							extend: 'csv',
						},
						{
							text: 'Imprimir',
							extend: 'print',
						},
					],
				},
			],
			drawCallback: (settings: any) => {
				this.dataTableElement?.dtInstance.then((dtIntance: DataTables.Api) => {
					// filtrado
					dtIntance.columns().every(function () {
						const that = this;
						$('input', this.footer()).on('keyup change', function () {
							if (that.search() !== (this as HTMLInputElement).value) {
								that.search((this as HTMLInputElement).value).draw();
							}
						});
					});
				});
			},
			columns: [
				{
					title: '#',
					render: function (data: any, type: any, full: any, meta: any) {
						return meta.row + 1; // Genera el número correlativo
					},
				},
				{
					title: 'Nombre',
					data: 'control.usuario[].persona.Nombres',
				},
				{
					title: 'Fecha',
					data: 'fecha',
				},
				{
					title: 'Hora',
					data: 'hora',
				},
			],
		};
	}
	addDNI() {
		const dni = this.form.get('dni')?.value;
		const fecha = new Date();
		if (dni && this.form.valid) {
			this.attendanceService.markAttendance({
				NumDoc: dni,
				Fecha: fecha,
			}).subscribe({
				next: (value) => {
					this.notification.success(value.message);
					this.reloadDataTable();
				},
				error: (value) => {
					this.notification.errorEvent(value);
				},
			});
		}
	}
}
