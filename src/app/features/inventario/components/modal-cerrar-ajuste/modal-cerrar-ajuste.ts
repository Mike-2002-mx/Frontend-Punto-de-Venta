import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-modal-cerrar-ajuste',
  imports: [],
  templateUrl: './modal-cerrar-ajuste.html',
  styleUrl: './modal-cerrar-ajuste.css'
})
export class ModalCerrarAjuste {

  public dialogRef = inject(MatDialogRef);
  data = inject(MAT_DIALOG_DATA);
  
  closeModal() {
    this.dialogRef.close();
  }
  
  clicAceptar() {
    console.log("Se ha cerrado el ajuste con los siguientes datos: ", this.data);
    const cerrado = true;
    this.dialogRef.close(cerrado);
  }
}
