import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-class-attribute',
  templateUrl: './class-attribute.component.html',
  styleUrls: ['./class-attribute.component.css']
})


export class ClassAttributeComponent  {
  @Input() attributeName:string;
  @Input() attributeType:string;

  constructor() { }


}
