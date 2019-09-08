import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import * as Material from '@angular/material';
import { MatToolbar } from '@angular/material';




@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    Material.MatGridListModule, // for grid column
    Material.MatFormFieldModule, // form
    Material.MatInputModule, // input
    Material.MatRadioModule, // mat-radio-group - radio button
    Material.MatDatepickerModule, // matDatepicker - datepicker
    Material.MatNativeDateModule, // required for datepicker
    Material.MatSelectModule, // mat-select - dropdown
    Material.MatCheckboxModule, // mat-checkbox - checkbox
    Material.MatButtonModule, // for button
    Material.MatToolbarModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule
  ],
  exports: [
    Material.MatGridListModule,
    Material.MatFormFieldModule,
    Material.MatInputModule,
    Material.MatRadioModule,
    Material.MatDatepickerModule,
    Material.MatNativeDateModule,
    Material.MatSelectModule,
    Material.MatCheckboxModule,
    Material.MatButtonModule,
    Material.MatToolbarModule,
    Material.MatSnackBarModule,
    Material.MatTableModule,
    Material.MatIconModule,
    Material.MatPaginatorModule,
    Material.MatSortModule
  ]
})
export class MaterialModule { }
