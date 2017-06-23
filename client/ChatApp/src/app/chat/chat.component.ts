import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { ChatMessage } from './chat-message'
import { ChatService } from './chat.service'

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css'],
  providers: [ ChatService ]
})

export class ChatComponent implements OnInit {

  messages: ChatMessage[] = [];
  chatMessages: string = "";
  lastMessage: string = "";
  errorMessage: string = "";
  context: string = '{}'

  constructor(private chatService: ChatService) { }

  ngOnInit() {
    //this.messages.push(new ChatMessage("Bot", "Welcome, I am your Banking Assistant") );
    this.sendMessage( this.lastMessage );
  }
  
  onSubmit(event)  {
    this.chatMessages = this.chatMessages + "You: " + this.lastMessage;
    this.messages.push(new ChatMessage("User", this.lastMessage) );
    console.log(this.messages);
    
    this.sendMessage( this.lastMessage );
    
    this.lastMessage = "";
  }
  
  sendMessage(message: string) {
    
    //if ( !message ) { return; }
    
    console.log("sendMessage : "+this.context)
    this.chatService.sendMessageWithObservable(this.lastMessage, this.context).subscribe(
                       (result)  => this.processOutput(result),
                       error =>  this.errorMessage = <any>error);
  }
  
  processOutput( result ) {
   
  let output = result[0]
  console.log(JSON.stringify(output));
  let context = result[1]
  let intent = result[2];

  if (intent.length) {
      if (intent[0].intent === 'holiday_info') {
        this.context = JSON.stringify(context);
      }
    }

  else if(output.action === "student_count") {
      
      context['student_count'] = 2
      this.context = JSON.stringify(context);
      
      console.log("processOutput: "+ this.context)
  }
  else {
      this.context = '{}'
  }
    
    this.showReplies(output.text)
  }
  
  showReplies(replies: string[]) {
  
    for(var i = 0; i < replies.length; i++) {
        this.messages.push(new ChatMessage("Bot", replies[i]) );
    }
  }
  
}
