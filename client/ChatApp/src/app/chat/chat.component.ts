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
    
    this.chatService.sendMessageWithObservable(this.lastMessage).subscribe(
                       replies  => this.showReplies(replies),
                       error =>  this.errorMessage = <any>error);
  }
  
  showReplies(replies: string[]) {
  
    for(var i = 0; i < replies.length; i++) {
        this.messages.push(new ChatMessage("Bot", replies[i]) );
    }
  }
  
}
