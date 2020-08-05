import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { stringify } from '@angular/compiler/src/util';

import { UtilsService } from '../services/utils.service';
import { HttpClient } from '@angular/common/http';

import {Attribute} from '../models/attribute';
import { Method } from '../models/method';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  fileData: File = null;
  content: any = null;
  uploadedFilePath: string = null;
  className: string;
  fileSelected=false;  

  attributes=[{name:"attr11",type:"int"},{name:"attr12",type:"string"},{name:"attr13",type:"string"}];
  methods=[{name:"method1",params:[{name:"mattr11",type:"int"},{name:"mattr12",type:"int"}],resultType:"object"},
  {name:"method2",params:[{name:"mattr21",type:"int"},{name:"mattr22",type:"int"}],resultType:"int"}];

  constructor(private utilsService: UtilsService, private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  notifySelection(fileInput: any) {
    this.fileData = <File>fileInput.target.files[0];
    if(this.fileData != null)
      this.fileSelected =true;
    this.preview();
  }

  //setting the file content to display it
  preview() {
    let fileReader = new FileReader();
    //    fileReader.onload = (e) => {
    //      console.log(fileReader.result);
    //    }
    fileReader.readAsText(this.fileData);
    fileReader.onload = (_event) => {
      this.content = fileReader.result;
    }
  }

  //send the selected file to the server to store it 
  //in order to reuse it later on
  onSubmit() {
    //console.log(this.fileData);
    this.uploadedFilePath = this.fileData.name;
    const formData = new FormData();
    formData.append('file', this.fileData);
    this.httpClient.post(this.utilsService.POST_SERVER_URL, formData)
      .subscribe(res => {
        //console.log(res);
        alert('File Uploaded !!');
        this.generateUML();
      },
      error => console.log('Error During file upload', error))
    }

  generateUML() {
    let classAsString = "";
    //getting the file from the server
    this.getTypeScriptFile().subscribe((data: any) => {
      classAsString = data;
      this.className = this.utilsService.getClassName(classAsString);
    } );
  }

  getTypeScriptFile(): any {
    console.log("getting the ts file");
    return this.httpClient.get(this.utilsService.BASE_SERVER_URL + "/" + this.utilsService.tsClassFileName, { responseType: 'text' });
  }

  getAttributes():Attribute[]{
    return this.attributes;
  }

  getMethods():Method{
    return this.methods;
  }

}
