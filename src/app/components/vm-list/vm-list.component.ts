import { Component, OnInit, ViewChild, NgModule } from '@angular/core';
import { FormControl, NgControl } from '@angular/forms';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import { VirtualMachine } from '../../services/virtual-machine.model';
import { VirtualMachineService } from '../../services/virtual-machine.service';


@Component({
  selector: 'app-vm-list',
  templateUrl: './vm-list.component.html',
  styleUrls: ['./vm-list.component.css']
})
export class VmListComponent implements OnInit {

  vmList: Object;

  constructor(private _http: VirtualMachineService) { }

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;


  displayedColumns: string[];
  columns = new FormControl();
  columnList: string[];
  dataSource;

  // dataSource = new MatTableDataSource<VirtualMachine>(this._http.getVMList());
  selection = new SelectionModel<VirtualMachine>(true, []);

  ngOnInit() {
    this._http.getVMList().subscribe(result => {
      // this.vmList = data;
      // console.log(this.vmList);
      console.log("Response from getVMList()", result);

      if (!result) {
        console.log("getVMlist is blank", result);
        return;
      }

      this.dataSource = new MatTableDataSource<VirtualMachine>(result.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });

    // this.vmList = this._http.getVMList();
    // this.dataSource = new MatTableDataSource<VirtualMachine>(this.vmList);
    // this.dataSource.paginator = this.paginator;
    // this.dataSource.sort = this.sort;

    this.columnList = this.getColumnList();
    // this.columnList.splice(0, 1, "select");

    // this.displayedColumns = this.getColumnList();
    // this.displayedColumns.splice(0, 1, "select");
    this.displayedColumns = this.columnList.slice();
  }

  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    if (this.dataSource) {
      const numSelected = this.selection.selected.length;
      const numRows = this.dataSource.data.length;
      return numSelected === numRows;
    }
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected() ?
      this.selection.clear() :
      this.dataSource.data.forEach(row => this.selection.select(row));
  }

  /** The label for the checkbox on the passed row */
  checkboxLabel(row?: VirtualMachine): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.correlationID}`;
  }

  /** Coulnms function to check if list changes */
  compareWithFunc(a, b) {
    // console.log("compare", a,b)
    return a === b;
  }

  // public requestId: string, //guid
  // public : string, // needs to change .. as there will be different types

  // public service: string,
  // public clusterNodes: string,
  // public clusterType: string,
  // public disks: any, //TODO maybe create disk type
  // public tags: any,
  // public cpu: number,
  // public memGB: number,
  // public osimage: string,
  // public ucmbags: any,
  // public placementID: string,
  // public placementPayload: any,
  // public createDate: string,
  // public modifiedDate: string,
  // public message: string,
  // public correlationID: string,

  getColumnList() {
    return [
      'select',
      'requestId',
      'status',
      'service',
      'clusterNodes',
      'clusterType',
      'disks',
      'tags',
      'memGB',
      'osimage',
      'ucmbags',
      'placementID',
      'placementPayload',
      'createDate',
      'modifiedDate',
      'message',
      'correlationID',
    ]
  }
}

