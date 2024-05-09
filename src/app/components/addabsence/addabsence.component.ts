import { Component } from '@angular/core';

import { AbsencesService } from '../../services/absences.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { TranslateService, TranslateModule } from "@ngx-translate/core"; //TODO Quitarlo?
import { MatIcon } from '@angular/material/icon';
import { MatFabButton } from '@angular/material/button';
import { MatTabsModule } from '@angular/material/tabs';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatStepperModule } from '@angular/material/stepper';
import { MatButtonModule } from '@angular/material/button';
import { FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';

import { AlertComponent } from '../alert/alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-addabsence',
  standalone: true,
  imports: [FormsModule, MatCardModule, MatDatepickerModule, MatSelectModule, ReactiveFormsModule, MatIcon,
    MatFabButton, MatTabsModule, MatInputModule, MatFormFieldModule, MatStepperModule, MatButtonModule, TranslateModule],
  providers: [provideNativeDateAdapter()],
  templateUrl: './addabsence.component.html',
  styleUrl: './addabsence.component.css'
})
export class AddabsenceComponent {

  tipos = [
    {value: 'holiday', viewValue: 'Vacaciones'},
    {value: 'medical', viewValue: 'Medica'},
    {value: 'other', viewValue: 'Otro'},
  ];

  start_time: Date | null = null;
  end_time: Date | null = null;
  type: any = "";
  notes = "";
  minDate: Date = new Date();

  isManager: boolean = false;

  //TODO Traducir esto
  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });

  filtroFechas = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    // Evitar que el sabado y domingo sean seleccionados
    return day !== 0 && day !== 6;
  };

  constructor(private absencesService: AbsencesService, private translate: TranslateService, public dialogRef: MatDialogRef<AddabsenceComponent>, private _snackBar: MatSnackBar, private _formBuilder: FormBuilder, public dialog: MatDialog) { }

  ngOnInit(): void {
    
  }

  addAbsence(){
    // console.log("Tipo: " + this.type);
    // console.log("Fecha inicio: " + this.start_time);
    // console.log("Fecha fin: " + this.end_time);
    // console.log("Notas: " + this.notes);

    if(this.validarDatos()){
      //TODO Cerrar y actualizar mensajes si la llamada esta ok, sino cerrar y mostrar mensaje error?

    this.absencesService.addAbsence(this.type, (this.start_time as Date).toLocaleDateString('zh-Hans-CN'), (this.end_time as Date).toLocaleDateString('zh-Hans-CN'), this.notes).subscribe(resultado =>{

        console.log(resultado);
        if(resultado.sucess){
          this._snackBar.open(this.translate.instant('ADD_ABSENCE.successfully_created_snack'), this.translate.instant('CONFIG.accept_snack'), {
            duration: 3 * 1000, // 3 Segundos
          });

        }else{
          this._snackBar.open(this.translate.instant('ADD_ABSENCE.error_creating_snack'), this.translate.instant('CONFIG.accept_snack'), {
            duration: 3 * 1000, // 3 Segundos
          });
        }
        this.dialogRef.close("Success");
      });

    }else{
      //TODO Cambiar mensaje error
      this.dialog.open(AlertComponent, {
        height: '200px',
        width: '400px',
        data: {btn: 1, msg: this.translate.instant('ADD_ABSENCE.error_creating_snack'), title: this.translate.instant('ALERT.label_error').toUpperCase()}
      });
    }
    
  }

  validarDatos(): boolean{
    let valido = true;
    //TODO
    return valido;
  }

}
