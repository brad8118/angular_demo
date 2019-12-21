import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VmGridComponent } from './vm-grid.component';

describe('VmGridComponent', () => {
  let component: VmGridComponent;
  let fixture: ComponentFixture<VmGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VmGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VmGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
