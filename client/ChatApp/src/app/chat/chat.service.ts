import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

  url: string = "http://localhost:6003/api/message"
  //url: string = "https://mybotapp.mybluemix.net/api/message";
  
  context: string = '{}'
  
  constructor(private http:Http) { }
  
  sendMessageWithObservable(message:string): (Observable<string[]>) {
	console.log("message: "+message)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    let options = new RequestOptions({ headers: headers });
    console.log("sendMessageWithObservable: "+ this.context)
    var payload = { workspace_id: "4f4e9e5e-6b8a-492f-9bb4-356e92078557",
		context: JSON.parse(this.context),
		input: {"text": message} || {}
	  };
    console.log("payload :" +JSON.stringify(payload))
    return this.http.post(this.url, payload, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
  }
  
  private extractData(res: Response) {
	let body = res.json();
    this.context = JSON.stringify( body.context )
    return ( body.output.text || [] );
  }
    
  private handleErrorObservable (error: Response | any) {
	console.error(error.message || error);
	return Observable.throw(error.message || error);
  }
  
  private handleErrorPromise (error: Response | any) {
	console.error(error.message || error);
	return Promise.reject(error.message || error);
  }	

 
}
