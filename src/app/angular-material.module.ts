
import { NgModule } from '@angular/core';
// import { MatTableModule } from '@angular/material/table';
// import { MatPaginatorModule, MatSortModule, MatCheckboxModule } from '@angular/material';

import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCardModule,
  MatCheckboxModule,
  MatChipsModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatExpansionModule,
  MatGridListModule,
  MatIconModule,
  MatInputModule,
  MatListModule,
  MatMenuModule,
  MatNativeDateModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatRadioModule,
  MatRippleModule,
  MatSelectModule,
  MatSidenavModule,
  MatSliderModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatStepperModule,
  MatTableModule,
  MatTabsModule,
  MatToolbarModule,
  MatTooltipModule,
} from '@angular/material';

@NgModule({
  imports: [
     MatTableModule,
     MatPaginatorModule,
     MatSortModule,
     MatCheckboxModule,
     MatSelectModule
  ],
  exports: [
     MatTableModule,
     MatPaginatorModule,
     MatSortModule,
     MatCheckboxModule,
     MatSelectModule
  ]
})

export class AngularMaterialModule {}