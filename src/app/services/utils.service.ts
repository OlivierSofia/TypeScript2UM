import { HttpClient } from '@angular/common/http';

import { Injectable, Type } from "@angular/core";
import { Attribute } from '../models/attribute';
import { Method } from '../models/method';
import { stringify } from '@angular/compiler/src/util';

@Injectable({
    providedIn: 'root'
})

export class UtilsService {

    public BASE_SERVER_URL = 'http://localhost:4000';

    public POST_SERVER_URL = this.BASE_SERVER_URL + '/post';

    public tsClassFileName = "tsClassFileName.ts";

    splitted ;
    currentTokenRange=0;
    markIndex = -1;

    constructor(private httpClient: HttpClient) { }

    getClassName(classAsString: string): string {
         this.splitted = classAsString.split(" ");
         console.log("Splitted:"+ stringify(this.splitted))
        if(this.getCurrentToken()!="class"){
            console.log("Error:class key word expected");
            return;
        }else{
            //parse variable
            this.moveToNextToken();
            if(this.parseVariable(this.getCurrentToken())){
                let className = this.getCurrentToken();
                console.log("className:"+className);
            }else{
                console.log("Error:variable expected");
                return;
            }
            this.moveToNextToken();
            if(this.getCurrentToken()!="{"){
                console.log("Error: { expected");
                return;
            }
            this.moveToNextToken();
            //get the list of potentiel attribute
            let attributes:Attribute[]=[];
            let methods:Method[]=[] ;
            let constu;
            let constructorFound = false;
            while(this.hasNext()){
                let attr:Attribute = this.parseAttributeDeclaration();
                if(attr!=null){
                    attributes.push(attr);
                }else{
                    if(!constructorFound){
                        constu = this.parseConstructor();
                        constructorFound = true;
                    }
 
                    let method:Method = this.parseMethodDeclaration();
                    if(method!=null){
                        methods.push(attr);
                    }else{
                        if(this.getCurrentToken()=="}"){
                            this.moveToNextToken()
                            if(!this.hasNext()){
                                console.log("End of file");
                            }else{
                                console.log("End of file expected");
                            }
                        }else
                            console.log("Only attributes are parsed!");
                        return "classname";
                    }
                }
            }
        }
    }

    parseConstructor(): any {
       return ;
    }

    parseMethodDeclaration():Method {
       return;
    }



    parseAttributeDeclaration(): Attribute {
        let result:Attribute;
        let attributeType;
        let attributeName;
        if( !this.isAModifier(this.getCurrentToken())){
            console.log("Error:modifier expected")
            return;
        }else{
            //get the modifier
            this.markTokenIndex();
            let mod = this.getCurrentToken();
            console.log("mod"+mod);
            this.moveToNextToken();
            if(this.parseVariableWithSemiColumn( this.getCurrentToken())){
                //get the attribute name
                attributeName =  this.getCurrentToken().substring(0, this.getCurrentToken().length-1);
                console.log("Attribute Name is :"+attributeName);
            }else{
                console.log("Error:attribute name expected");
                this.getBackToMark();
                return;
            }
            //get the variable type
            this.moveToNextToken();
            if(this.isAAllowedType(this.getCurrentToken())){
                attributeType = this.getCurrentToken().substring(0,this.getCurrentToken().length-1);
                console.log("Attribute Type is :"+attributeType);
            }else{
                console.log("Error:type not allowed");
                this.getBackToMark();
                return;
            }
            this.moveToNextToken();
            result = new Attribute(attributeName,attributeType);
            console.log("Attribute result:"+mod+","+result.name+","+result.type);
            return result;
        }
    }

    isAModifier(token: string):boolean {
        let mod = ["public","protected","private"];
        return mod.indexOf(token)!=-1;
    }

    isAAllowedType(token:string):boolean{
        let typeList = ["string;","int;","boolean;"];
        console.log("is allowed:"+typeList.indexOf(token));
        return typeList.indexOf(token)!=-1;
    }

    parseVariable(token: string):boolean {
        let regex = '^([a-zA-Z0-9_-]+)$';
        var pattern = new RegExp(regex);
        return pattern.test(token);
    }

    parseVariableWithSemiColumn(token: string):boolean {
        let regex = '^([a-zA-Z0-9_-]+):$';
        var pattern = new RegExp(regex);
        return pattern.test(token);
    }


    public getClassAttributes(classAsString: string): Attribute[] {
        return;
    }

    public getClassMethods(classAsString: string): Method[] {
        return;
    }

    moveToNextToken():string{
        this.currentTokenRange++;
        for(let i = this.currentTokenRange; i < this.splitted.length; i++){
           // console.log("Current token:"+this.getCurrentToken())
            let nextToken = this.splitted[this.currentTokenRange];
            if(nextToken !=''){
               // console.log("returned token:"+nextToken);
                return nextToken;
            }else{
                this.currentTokenRange++;
            }
        }
    }

    getCurrentToken():string {
        if(this.currentTokenRange>= this.splitted.length){
            console.log("Error: out of the index");
            return;
        }
        let token = this.splitted[this.currentTokenRange];
        token = token.replace(/[\n\r]/g, '');
        //console.log("GetCurrentToken:["+token+"]");
        return token;
    }

    hasNext():boolean{
        return this.currentTokenRange<=this.splitted.length-1;
    }

    markTokenIndex(){
        this.markIndex = this.currentTokenRange;
    }

    getBackToMark(){
        if(this.markIndex!=-1)
            this.currentTokenRange = this.markIndex;
        this.markIndex = -1;
    }

}