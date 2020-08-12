import { HttpClient } from '@angular/common/http';

import { Injectable, Type } from "@angular/core";
import { Attribute } from '../models/attribute';
import { Method } from '../models/method';
import {Class} from '../models/class';

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

    getClassObjectFromStringRepresentation(classAsString: string): Class {
        let result:Class;
        let className;
        let attributes:Attribute[]=[];
        let methods:Method[]=[] ;
        let constu;
        let constructorFound = false;
        //clean the string
        classAsString = this.cleanString(classAsString);
        //split the string to a string array
         this.splitted = classAsString.split(" ");
        // console.log("Splitted:"+ stringify(this.splitted))
         //check the first token is the key word class
        if(this.getCurrentToken()!="class"){
            this.currentTokenRange=0;
            throw new Error("class key word expected");
        }else{
            //parse variable
            this.moveToNextToken();
            if(this.parseVariable(this.getCurrentToken())){
                className = this.getCurrentToken();
                console.log("className:"+className);
            }else{
                this.currentTokenRange=0;
                throw new Error("variable expected");
            }
            this.moveToNextToken();
            if(this.getCurrentToken()!="{"){
                this.currentTokenRange=0;
                throw new Error(" { expected");
            }
            this.moveToNextToken();
            //get the list of potentiel attribute
            try {
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
                                return new Class(className,attributes,methods);
                        }
                    }
                }
            } catch (error) {
                console.log("This error occurs because constructor and methods parsing are not implemented");
            }finally{
                //reinit the token range for the next parsing request
                this.currentTokenRange=0;
                return new Class(className,attributes,methods);
            }
        }
    }
    cleanString(classAsString: string): string {
        return classAsString.replace(/[\t]/g, ' ');
    }

    //build the attribute object from its string representation
    parseAttributeDeclaration(): Attribute {
        let result:Attribute;
        let attributeType;
        let attributeName;
        let mod;
        if( !this.isAModifier(this.getCurrentToken())){
            throw new Error("modifier expected")
        }else{
            //get the modifier
            this.markTokenIndex();
            mod = this.getCurrentToken();
            console.log("mod:"+mod);
            this.moveToNextToken();
            if(this.parseVariableWithSemiColumn( this.getCurrentToken())){
                //get the attribute name
                attributeName =  this.getCurrentToken().substring(0, this.getCurrentToken().length-1);
                console.log("Attribute Name is :"+attributeName);
            }else{
                this.getBackToMark();
                throw new Error("Attribute name expected");
            }
            //get the variable type
            this.moveToNextToken();
            if(this.isAAllowedType(this.getCurrentToken())){
                attributeType = this.getCurrentToken().substring(0,this.getCurrentToken().length-1);
                console.log("Attribute Type is :"+attributeType);
            }else{
                this.getBackToMark();
                throw new Error("Type not allowed");
            }
            this.moveToNextToken();
            result = new Attribute(mod,attributeName,attributeType);
            console.log("Attribute result:"+mod+","+result.name+","+result.type);
            return result;
        }
    }

    //check if the specified string matches with the modifier list
    isAModifier(token: string):boolean {
        let mod = ["public","protected","private"];
        return mod.indexOf(token)!=-1;
    }

    //check if the specified string matches with the list of allowed type
    isAAllowedType(token:string):boolean{
        let typeList = ["string;","int;","boolean;"];
        console.log("is allowed:"+typeList.indexOf(token));
        return typeList.indexOf(token)!=-1;
    }

    //check if the specified string is alpha numeric
    parseVariable(token: string):boolean {
        let regex = '^([a-zA-Z0-9_-]+)$';
        var pattern = new RegExp(regex);
        return pattern.test(token);
    }

    //check if the specified string is alpha numeric and ends with :
    parseVariableWithSemiColumn(token: string):boolean {
        let regex = '^([a-zA-Z0-9_-]+):$';
        var pattern = new RegExp(regex);
        return pattern.test(token);
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

    parseConstructor(): any {
        return ;
     }
 
     parseMethodDeclaration():Method {
        return;
     }

}
