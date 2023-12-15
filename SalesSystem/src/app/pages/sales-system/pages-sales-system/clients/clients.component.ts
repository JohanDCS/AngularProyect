import { Component, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from 'src/app/services/controller/notification.service';
import { Subscription } from 'rxjs';
import { DataTables_Spanish } from 'src/utils/proyect.utils';
import { DataTablesResponse, DataTables_AjaxCallback } from 'src/interface/DataTable.interface';
import { environment } from 'src/environments/environment';
import { DataTableDirective } from 'angular-datatables';
import { jsPDF } from 'jspdf';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
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
					.get<DataTablesResponse>(`${environment.API_REST.URL}`)
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
					title: 'code',
					data: 'code',
				},
				{
					title: 'name',
					data: 'name',
				},
				{
					title: 'detalles',
					data: 'details',
				},
				{
					title: 'marca',
					data: 'marca',
				},
				{
					title: 'unit',
					data: 'unit',
				},
				{
					title: 'precio producto',
					data: 'priceProduct',
				},
				{
					title: 'Acciones',
					data: null,
					render: (data: any, type: any, full: any) => {
						return `
						<div class="table-action"><a class="cursor-pointer dataTablever">ver</a></div>
					  `;
					},
					createdCell: (
						cell: Node,
						cellData: any,
						rowData: any,
						rowIndex: number,
						colIndex: number,
					) => {
						$(cell).on('click', 'a.dataTablever', () => {
							this.verProducto(cellData);
						});
					},
				},
			],
		};
	}
	verProducto(data: any) {
		console.log('producto: ', data);
		const spaceTitle = 24;
		const spaceRigth = 2;
		const spaceRow = 10;
		const doc = new jsPDF({
			format: [80, 200],
		});
		doc.setFontSize(8);
		doc.setFont('Arial');

		// Array con la información
		const infoArray = [
			`Código: ${data.code}`,
			`Nombre: ${data.name}`,
			`Detalles: ${data.details}`,
			`Marca: ${data.marca}`,
			`Unidad: ${data.unit}`,
			`Precio Producto: ${data.priceProduct}`,
		];

		for (let i = 0; i < infoArray.length; i++) {
			doc.text(infoArray[i], spaceRigth, spaceRow + 10 * i);
		}

		// Guardar o abrir el doc (puedes personalizar esto según tus necesidades)
		//doc.save('informacion_registro.pdf');
		doc.output('dataurlnewwindow');
	}
}
