import {Attribute} from "./attribute";
import {Method} from "./method";
//this class represents a class object
export class Class {

constructor(public name:string,public attributes:Attribute[], public methods:Method[]){}

}