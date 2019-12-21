import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

/* Angular material 8 */
import { AngularMaterialModule } from './angular-material.module';

// Bug with mat-label
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { AutocompleteFilterComponent } from './components/autocomplete-filter/autocomplete-filter.component';
import { AutocompleteChipsComponent } from './components/autocomplete-chips/autocomplete-chips.component';
import { VmListComponent } from './components/vm-list/vm-list.component';
import { VmGridComponent } from './components/vm-grid/vm-grid.component';

import { AgGridModule } from 'ag-grid-angular';
// import { List2Module } from './list2/list2.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ListComponent,
    AutocompleteFilterComponent,
    AutocompleteChipsComponent,
    VmListComponent,
    VmGridComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AngularMaterialModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  entryComponents:[
    // List2Module,
    VmGridComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
  // schemas: [ CUSTOM_ELEMENTS_SCHEMA ]
})
export class AppModule { }
