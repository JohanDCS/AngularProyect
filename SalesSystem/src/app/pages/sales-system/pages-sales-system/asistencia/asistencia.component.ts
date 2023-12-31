import { Component, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DataTableDirective, DataTablesModule } from 'angular-datatables';
import { jsPDF } from 'jspdf';
import { Subscription } from 'rxjs';
import { NotificationService } from 'src/app/services/controller/notification.service';
import { environment } from 'src/environments/environment';
import { DataTables_AjaxCallback, DataTablesResponse } from 'src/interface/DataTable.interface';
import { DataTables_Spanish } from 'src/utils/proyect.utils';

@Component({
  selector: 'app-asistencia',
  standalone: true,
  imports: [CommonModule, DataTablesModule],
  templateUrl: './asistencia.component.html',
  styleUrl: './asistencia.component.css'
})
export class AsistenciaComponent {
  dtOptions = {};
	suscriptionDataTables?: Subscription;

	constructor(
		private http: HttpClient,
		private notification: NotificationService,
		private renderer: Renderer2,
	) {}
	@ViewChild(DataTableDirective, { static: false })
	private dataTableElement?: DataTableDirective;
	private reloadDataTable() {
		this.dataTableElement?.dtInstance.then((dtIntance: DataTables.Api) => {
			dtIntance.ajax.reload();
		});
	}

	ngOnInit(): void {
		this.dtOptions = {
			serverSide: false,
			/*serverSide: true,*/
			processing: true,
			language: DataTables_Spanish,
			pagingType: 'full_numbers',
			ajax: (dataTablesParameters: any, callback: DataTables_AjaxCallback) => {
				this.suscriptionDataTables = this.http
					.get<DataTablesResponse>(`${environment.API_REST.URL}/asistencia/mostrar/load`)
					.subscribe((resp) => {
						console.log(resp);
						callback({
							recordsTotal: resp.recordsTotal,
							recordsFiltered: resp.recordsFiltered,
							data: resp.data,
						});
					});
			},
			dom: 'Bfrtip',
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
					text: 'PDF',
					extend: 'pdfFlash',
				},
				{
					text: 'Copiar',
					extend: 'copy',
				},
				{
					Text: 'Excel',
					extend: 'excel',
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
					title: 'Cargo',
					data: 'control.usuario[].persona.TipoCargo',
				},
				{
					title: 'Nombres',
					data: 'control.usuario[].persona.Nombres',
				},
				{
					title: 'Apellidos',
					data: 'control.usuario[].persona.Apellidos',
				},
				{
					title: 'DNI',
					data: 'control.usuario[].NumDoc',
				},
				{
					title: 'Hora de Registro',
					data: 'hora',
				},
				{
					title: 'Fecha',
					data: 'fecha',
				},
				{
					title: 'Estado',
					data: 'state',
				},
			],
		};
	}
	verAsistencia(data: any) {
		console.log('producto: ', data);
		const spaceTitle = 24;
		const spaceRigth = 2;
		const spaceRow = 20;
		const doc = new jsPDF({
			format: [80, 200],
		});
		doc.setFontSize(8);
		doc.setFont('Arial');

		// Array con la información
		const infoArray = [
			`Cargo: ${data.control.usuario[0].persona.TipoCargo}`,
			`Nombres: ${data.control.usuario[0].persona.Nombres}`,
			`Apellidos: ${data.control.usuario[0].persona.Apellidos}`,
			`Hora de Registro: ${data.hora}`,
			`Fecha: ${data.fecha}`,
			`Estado: ${data.state}`,
		];

		for (let i = 0; i < infoArray.length; i++) {
			doc.text(infoArray[i], spaceRigth, spaceRow + 10 * i);
		}

		// Guardar o abrir el doc (puedes personalizar esto según tus necesidades)
		//doc.save('informacion_registro.pdf');
		doc.output('dataurlnewwindow');
	}
}
