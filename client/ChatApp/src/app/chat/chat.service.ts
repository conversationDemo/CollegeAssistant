import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class ChatService {

  url: string = "http://localhost:6007/api/message"
  //url: string = "https://mybotapp.mybluemix.net/api/message";
  
  constructor(private http:Http) { }
  
  sendMessageWithObservable(message:string, context:string): (Observable<string[]>) {
	console.log("message: "+message)
    let headers = new Headers({ 'Content-Type': 'application/json' });
    
    let options = new RequestOptions({ headers: headers });
    console.log("sendMessageWithObservable: "+ context)
    var payload = { workspace_id: "1d2053f0-858a-4edd-8811-01c6c2d0c0f6",
		context: JSON.parse(context),
		input: {"text": message} || {}
	  };
    console.log("payload :" +JSON.stringify(payload))
    return this.http.post(this.url, payload, options)
                   .map(this.extractData)
                   .catch(this.handleErrorObservable);
  }
  
  private extractData(res: Response) {
	let body = res.json();
  console.log("response"+JSON.stringify(body));
    return ([body.output, body.context,body.intents] || [] );
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
