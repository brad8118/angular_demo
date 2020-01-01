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

  title = 'ICP VMS 3.0 - The future is here!!';

  displayedColumns: string[];
  allColumns = [];
  columnsDDctl = new FormControl();

  private defaultColDef;

  constructor(private http: HttpClient, private _http: VirtualMachineService ) {

    this.defaultColDef = { filter: true };
  }

  rowData: any;

  ngOnInit() {
    this.rowData = this._http.getVmListAsList();
    console.log("rowdata", this.rowData);
    this.allColumns = this.createColumnDefs();
    this.showRows();
  }

  onGridReady(params) {
  }

  showRows() {
    this.displayedColumns = this.allColumns.filter(x => x.hide === false).slice();
  }

  getSelectedRows() {
    const selectedNodes = this.agGrid.api.getSelectedNodes();
    console.log(selectedNodes)
    const selectedData = selectedNodes.map(node => node.data);
    const selectedDataStringPresentation = selectedData.map(node => node.make + ' ' + node.model).join(', ');
    alert(`Selected nodes: ${selectedDataStringPresentation}`);
  }


  // Generate columns with configurations for the columns
  createColumnDefs() {
    let columns = [
      this.columnDefTemplate('Request Id', 'requestId', {
        checkboxSelection: true, pinned: 'left',
        disabledInColumnSelector: true, rowDrag: false,
        cellRenderer: (params) =>
          `<a href="/vm/${params.data.requestId}" >${params.data.requestId}</a>`
      },
      ),
      this.columnDefTemplate('Status', 'status'),
      this.columnDefTemplate('Service', 'service'),
      this.columnDefTemplate('Cluster Nodes', 'clusterNodes'),
      this.columnDefTemplate('Disks', 'disks'),
      this.columnDefTemplate('Tags', 'tags'),
      this.columnDefTemplate('Mem GB', 'memGB'),
      this.columnDefTemplate('Os Image', 'osimage'),
      this.columnDefTemplate('Ucm Bags', 'ucmbags', { hide: true }),
      this.columnDefTemplate('Placement ID', 'placementID', { hide: true }),
      this.columnDefTemplate('Placement Payload', 'placementPayload', { hide: true }),
      this.columnDefTemplate('Create Date', 'createDate'),
      this.columnDefTemplate('Modified Date', 'modifiedDate'),
      this.columnDefTemplate('Message', 'message'),
      this.columnDefTemplate('Correlation ID', 'correlationID')
    ]

    return columns;
  }

  columnDefTemplate(headerName: string, field: string, overRides = {}) {

    let columnConfig = {};
    columnConfig['headerName'] = headerName;
    columnConfig['field'] = field;
    columnConfig['hide'] = false;
    columnConfig['sortable'] = true;
    columnConfig['resizable'] = true;
    columnConfig['checkboxSelection'] = false;
    columnConfig['filter'] = true;
    columnConfig['resizable'] = true;
    columnConfig['disabled'] = false;

    // apply over-rides 
    for (let k in overRides) {
      columnConfig[k] = overRides[k];
    }

    return columnConfig;
  }

  /** Coulnms function to check if list changes */
  compareWithColumns(a: any, b: any): boolean {
    // console.log("compare", a, b)
    return a.field === b.field;
  }

  onSelectionChange(event) {
    if (event.isUserInput) {
      console.log(event.source.value, event.source.selected);
      event.source.value.hide = !event.source.selected;
      this.agGrid.columnApi.setColumnVisible(event.source.value.field, event.source.selected)
    }
  }
}
