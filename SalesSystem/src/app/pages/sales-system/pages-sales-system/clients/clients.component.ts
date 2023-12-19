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
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/api/auth.service';

@Component({
	selector: 'app-clients',
	templateUrl: './clients.component.html',
	styleUrl: './clients.component.css',
})
export class ClientsComponent implements OnInit {
	form: FormGroup = this.formGroup.group({
		nombres: [
			'',
			[Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.min(0)],
		],
		apellidos: [
			'',
			[Validators.required, Validators.pattern(/^[A-Za-z ]+$/), Validators.min(0)],
		],
		dni: [
			'',
			[Validators.required, Validators.pattern(/^[0-9]+(\.[0-9]+)?$/), Validators.min(0)],
		],
		password: [
			'',
			[Validators.required, Validators.min(0)],
		],
		TipoCargo: [
			'',
			[Validators.required],
		],
		TipoDocIdentidad: [
			'',
			[Validators.required],
		],
		TipoUsuario: [
			'',
			[Validators.required],
		],
		turno: [
			'',
			[Validators.required],
		],
	});
	dtOptions = {};
	suscriptionDataTables?: Subscription;

	constructor(
		private http: HttpClient,
		private formGroup: FormBuilder,
		private authservice: AuthService,
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
					.get<DataTablesResponse>(`${environment.API_REST.URL}/auth/load`)
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
					title: 'Nombres',
					data: 'persona.Nombres',
				},
				{
					title: 'Apellidos',
					data: 'persona.Apellidos',
				},
				{
					title: 'Tipo de Documento',
					data: 'persona.TipoDocumento',
				},
				{
					title: 'Tipo de cargo',
					data: 'persona.TipoCargo',
				},
				{
					title: 'Tipo de Usuario',
					data: 'TipoUsuario',
				},
				{
					title: 'Turno',
					data: 'persona.turno.denominacion',
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
	passwordVisible: Boolean = false;
	registerAttendance() {
		console.log(this.form.value)
		const Nombres = this.form.get('nombres')?.value;
		const Apellidos = this.form.get('apellidos')?.value;
		const NumDoc = this.form.get('dni')?.value;
		const password = this.form.get('password')?.value;
		const TipoCargo = this.form.get('TipoCargo')?.value;
		const TipoDocIdentidad = this.form.get('TipoDocIdentidad')?.value;
		const TipoUsuario = this.form.get('TipoUsuario')?.value;
		const turno = this.form.get('turno')?.value;

		this.authservice.register({
			Nombres: Nombres,
			Apellidos: Apellidos,
			NumDoc: NumDoc,
			password: password,
			TipoCargo: TipoCargo,
			TipoDocIdentidad: TipoDocIdentidad,
			TipoUsuario: TipoUsuario,
			turno: turno
		}).subscribe({
			next: (value) => {
				console.log(value)
				this.notification.success(value.message);
			},
			error: (value) => {
				this.notification.errorEvent(value);
			},
		});
	}
}
