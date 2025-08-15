import { Component, ElementRef, inject, OnInit, output, signal, ViewChild } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-ajuste',
  imports: [],
  templateUrl: './modal-ajuste.html',
  styleUrl: './modal-ajuste.css'
})
export class ModalAjuste {

  public dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);

  @ViewChild('nuevaData') inputData!: ElementRef<HTMLInputElement>;

  closeModal():void{
    this.dialogRef.close();
  }

  clicAceptar(): void {
    const valor = Number(this.inputData.nativeElement.value);
    if (isNaN(valor) || valor <= 0) {
      alert("La nueva existencia debe ser mayor a 0 y numérica");
      return;
    }
    console.log("la nueva existencia = ", valor);
    this.dialogRef.close(valor);
  }

}
