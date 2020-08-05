import { Component, OnInit, Input } from '@angular/core';
import { ClassAttributeComponent } from '../class-attribute/class-attribute.component';

@Component({
  selector: 'app-class-method',
  templateUrl: './class-method.component.html',
  styleUrls: ['./class-method.component.css']
})
export class ClassMethodComponent implements OnInit {

  @Input() name:string ;
  @Input() params:ClassAttributeComponent[];
  @Input() resultType:string;
  
  constructor() { }

  ngOnInit(): void {
  }

}
