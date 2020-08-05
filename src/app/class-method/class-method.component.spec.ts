import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassMethodComponent } from './class-method.component';

describe('ClassMethodComponent', () => {
  let component: ClassMethodComponent;
  let fixture: ComponentFixture<ClassMethodComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassMethodComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassMethodComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
