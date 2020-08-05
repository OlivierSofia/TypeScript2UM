import { HttpClient } from '@angular/common/http';

import { Injectable } from "@angular/core";
import { Attribute } from '../models/attribute';
import { Method } from '../models/method';

@Injectable({
    providedIn: 'root'
})

export class UtilsService {

    public BASE_SERVER_URL = 'http://localhost:4000';

    public POST_SERVER_URL = this.BASE_SERVER_URL + '/post';

    public tsClassFileName = "tsClassFileName.ts";

    constructor(private httpClient: HttpClient) { }

    getClassName(classAsString: string): string {
        let result = classAsString.split('class').pop().split('{')[0];
        //check if there no space in the got string
        console.log("Result: "+result);
        console.log("Has space: "+result.indexOf(' '));

        return result;
    }


    public getClassAttributes(classAsString: string): Attribute[] {
        return;
    }

    public getClassMethods(classAsString: string): Method[] {
        return;
    }


}