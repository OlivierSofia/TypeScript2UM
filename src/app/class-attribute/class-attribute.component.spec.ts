import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClassAttributeComponent } from './class-attribute.component';

describe('ClassAttributeComponent', () => {
  let component: ClassAttributeComponent;
  let fixture: ComponentFixture<ClassAttributeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClassAttributeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClassAttributeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
