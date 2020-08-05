import { Component, ViewEncapsulation, ViewChild } from "@angular/core";
import { DiagramComponent } from '@syncfusion/ej2-angular-diagrams';
import { NodeModel, UmlClassifierShapeModel } from '@syncfusion/ej2-diagrams';

@Component({
  selector: 'app-uml',
  templateUrl: './uml.component.html',
  styleUrls: ['./uml.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class UmlComponent  {


  @ViewChild("diagram")
  public diagram: DiagramComponent;

  constructor() { }

  public nodes: NodeModel[] = [
 {
  id: "Patient",
  //Position of the node
  offsetX: 200,
  offsetY: 200,
  shape: {
    type: "UmlClassifier",
    //Define class object
    class: {
      name: "Patient",
      //Define class attributes
      attributes: [{ name: "accepted", type: "Date" }],
      //Define class methods
      methods: [{ name: "getHistory", type: "getHistory" }]
    },
    classifier: "Class"
  } as UmlClassifierShapeModel
 }
];

}
