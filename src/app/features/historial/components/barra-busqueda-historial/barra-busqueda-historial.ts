import { Component, output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatRadioModule } from '@angular/material/radio';

@Component({
  selector: 'app-barra-busqueda-historial',
  imports: [MatRadioModule, ReactiveFormsModule],
  templateUrl: './barra-busqueda-historial.html',
  styleUrl: './barra-busqueda-historial.css'
})
export class BarraBusquedaHistorial {

  folio = output<string>();
  busquedaData = output<{fechaInicio: string, fechaFin: string}>();

  busquedaForm: FormGroup;

  constructor(private fb: FormBuilder){
    this.busquedaForm = this.fb.group({
      fechaInicio: ['', [Validators.required]],
      fechaFin: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if(this.busquedaForm.valid) {
      const formData = this.busquedaForm.value;
      this.busquedaData.emit({
      fechaInicio: formData.fechaInicio,
      fechaFin: formData.fechaFin
    });
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched(): void {
    this.busquedaForm.markAllAsTouched();
  }

    //Agregar formulario para enviar data y buscar
  emitFolio(folio: string) {
    this.folio.emit(folio);
  }


}
