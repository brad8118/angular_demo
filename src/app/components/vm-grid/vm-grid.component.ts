import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';

@Component({
  selector: 'app-vm-grid',
  templateUrl: './vm-grid.component.html',
  styleUrls: ['./vm-grid.component.css']
})

export class VmGridComponent implements OnInit {
  @ViewChild('agGrid') agGrid: AgGridAngular;

  title = 'app';

  columnDefs = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true, supressMenu: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];


  constructor(private http: HttpClient) {

  }

  rowData: any;


  ngOnInit() {
    this.rowData = this.http.get('https://api.myjson.com/bins/15psn9');
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    console.log(selectedNodes)
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }


}
