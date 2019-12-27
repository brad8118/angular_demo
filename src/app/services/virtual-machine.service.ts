import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { VirtualMachine, vmStatus, ServiceType, OsImageType } from './virtual-machine.model';
import { VmListComponent } from '../components/vm-list/vm-list.component';

@Injectable({
  providedIn: 'root'
})

export class VirtualMachineService {

  constructor() { }

  public getVMList(): any {
    const vmListObservable = new Observable(observer => {
      setTimeout(() => {
        observer.next({ data: this.generateRandomVMs(30) });
      }, 1000);
    });

    return vmListObservable;
  }

  public getVmListAsList(){
    return this.generateRandomVMs(30);
  }

  private generateRandomVMs(numberOfVMs: number) {
    let vmList: VirtualMachine[] = []

    for (let i = 0; i < numberOfVMs; i++) {

      const randomStatus: string = vmStatus[this.randomEnum(vmStatus)];
      const randomOS: string = OsImageType[this.randomEnum(OsImageType)];
      const randomService: string = ServiceType[this.randomEnum(ServiceType)];


      vmList.push(new VirtualMachine(
        "5e7ca2a0-a912-450a-b058-f13073be4aa5", //requestId
        randomStatus, //status
        randomService, //service
        "1",  //clusterNodes
        "StandAlone", // clusterType,
        [
          { name: "log_disk", type: "VMDK", tags: null, deleteOnTermination: false, initialize: null, sizeGB: 100 },
          { name: "log_disk", type: "VMDK", tags: null, deleteOnTermination: false, initialize: null, sizeGB: 50 }
        ], //disks 
        {
          placement: null, networkZone: "ESF", portgroup: "PROD_413", lob: "GTI", env: "dev",
          tenant: "", az: "",
        }, //tags
        0, //cpu; number
        0, //memGB number
        randomOS, // osimage: string;
        [{ bagName: "" }], //ucmbags: [JSON];
        "5e7ca2a0-a912-450a-b058-f13073be4aa5", //placementID: string;
        {}, //placementPayload: JSON;
        "2018-08-23T23:19:57.825Z",  //createDate: string;
        "2018-08-23T23:19:57.825Z", //modifiedDate: string;
        "Everything is great", // message: string;
        "5e7ca2a0-a912-450a-b058-f13073be4aa5", //correlationID: string;
      ))
    }

    return vmList;
  }

  // randomly pick one of the enum values
  private randomEnum<T>(anEnum: T): T[keyof T] {
    const enumValues = Object.keys(anEnum)
      .map(n => Number.parseInt(n))
      .filter(n => !Number.isNaN(n)) as unknown as T[keyof T][]
    const randomIndex = Math.floor(Math.random() * enumValues.length)
    const randomEnumValue = enumValues[randomIndex]
    return randomEnumValue;
  }
}


