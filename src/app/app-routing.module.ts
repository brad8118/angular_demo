import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from 'src/app/home/home.component';
import { ListComponent } from "src/app/list/list.component";
import { VmGridComponent } from './components/vm-grid/vm-grid.component';
import { VmDetailsComponent } from './components/vm-details/vm-details.component';


// import { List2Module } from 'src/app/list2/list2.module';

const routes: Routes = [
  {path: '' , component: HomeComponent },
  {path: 'list' , component: ListComponent },
  {path: 'grid' , component: VmGridComponent },
  {path: 'vm/:id' , component: VmDetailsComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
