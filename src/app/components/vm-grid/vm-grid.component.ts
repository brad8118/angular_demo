import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AgGridAngular } from 'ag-grid-angular';
import { FormControl, NgControl } from '@angular/forms';
import { VirtualMachineService } from '../../services/virtual-machine.service';

@Component({
  selector: 'app-vm-grid',
  templateUrl: './vm-grid.component.html',
  styleUrls: ['./vm-grid.component.css']
})

export class VmGridComponent implements OnInit {
  @ViewChild('agGrid', { static: true }) agGrid: AgGridAngular;

  title = 'app';

  columnDefs = [
    { headerName: 'Make', field: 'make', sortable: true, filter: true, checkboxSelection: true },
    { headerName: 'Model', field: 'model', sortable: true, filter: true, supressMenu: true },
    { headerName: 'Price', field: 'price', sortable: true, filter: true }
  ];

  displayedColumns: string[];
  allColumns = this.getColumns();
  columnsDDctl = new FormControl();

  private defaultColDef;

  constructor(private http: HttpClient, private _http: VirtualMachineService) {

    this.defaultColDef = { filter: true };

  }

  rowData: any;
  rowData_2: any;

  ngOnInit() {
    this.rowData_2 = this.http.get('https://api.myjson.com/bins/15psn9');
    this.rowData = this._http.getVmListAsList();
    console.log("rowdata", this.rowData);
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    console.log(selectedNodes)
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }


  // Generate columns with configurations for the columns
  getColumns() {
    let columns = [
      this.createColumn('Request Id', 'requestId', { 'checkboxSelection': true }),
      this.createColumn('Status', 'status'),
      this.createColumn('Service', 'service'),
      this.createColumn('Cluster Nodes', 'clusterNodes'),
      this.createColumn('Disks', 'disks'),
      this.createColumn('Tags', 'tags'),
      this.createColumn('Mem GB', 'memGB'),
      this.createColumn('Os Image', 'osimage'),
      this.createColumn('Ucm Bags', 'ucmbags'),
      this.createColumn('Placement ID', 'placementID'),
      this.createColumn('Placement Payload', 'placementPayload'),
      this.createColumn('Create Date', 'createDate'),
      this.createColumn('Modified Date', 'modifiedDate'),
      this.createColumn('Message', 'message'),
      this.createColumn('Correlation ID', 'correlationID')
    ]

    return columns;
  }

  createColumn(headerName: string, field: string, overRides = {}) {

    let columnConfig = {};
    columnConfig['headerName'] = headerName;
    columnConfig['field'] = field;
    columnConfig['hide'] = false;
    columnConfig['sortable'] = true;
    columnConfig['resizable'] = true;
    columnConfig['checkboxSelection'] = false;
    columnConfig['filter'] = true;

    // apply over-rides 
    for (let k in overRides) {
      columnConfig[k] = [k]
    }

    return columnConfig;
  }

  /** Coulnms function to check if list changes */
  compareWithColumns(a: any, b: any): boolean {
    // console.log("compare", a,b)
    return a.field === b.field;
  }

  columnChanged($event)  {
    if(event.isUserInput) {
      console.log(event.source.value, event.source.selected);
    }
  }
}
