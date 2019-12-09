
interface IVirtualMachine {
    requestId: string; //guid
    status: string; // needs to change .. as there will be different types
  
    service: string;
    clusterNodes: string;
    clusterType: string;
    disks:  any; //TODO maybe create disk type
    tags: any;
    cpu: number;
    memGB: number;
    osimage: string;
    ucmbags: any;
    placementID: string;
    placementPayload: any;
    createDate: string;
    modifiedDate: string;
    message: string;
    correlationID: string;
  }
  
  export enum OsImageType {
    "RHEL 6.10",
    "RHEL 7.4",
    "RHEL 7.5",
    "RHEL 7.6",
    "RHEL 7.7",
  }
  
  export enum vmStatus {
    "TF_ALL_FAILED",
    "BUILDING",
    "FAILED",
    "COMPLETED"
  }
  
  export enum ServiceType {
    "GOLD",
    "PLATINUM",
    "BRONZE"
  }
  
  export class VirtualMachine implements IVirtualMachine {
    constructor(
      public requestId: string, //guid
      public status: string, // needs to change .. as there will be different types
  
      public service: string,
      public clusterNodes: string,
      public clusterType: string,
      public disks: any, //TODO maybe create disk type
      public tags: any,
      public cpu: number,
      public memGB: number,
      public osimage: string,
      public ucmbags: any,
      public placementID: string,
      public placementPayload: any,
      public createDate: string,
      public modifiedDate: string,
      public message: string,
      public correlationID: string,
    ) {
    }
  }