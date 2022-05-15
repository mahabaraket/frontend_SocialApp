import { Component, Input, OnInit } from '@angular/core';
import { ChatService } from 'src/app/services/chat.service';
import { ProfilePicService } from 'src/app/services/profile-pic.service';
import { SharingService } from 'src/app/services/sharing.service';
import { UserService } from 'src/app/services/user.service';
import { UtilsService } from 'src/app/services/utils.service';
import { Chat } from 'src/models/chat';

@Component({
  selector: 'app-chat-list',
  templateUrl: './chat-list.component.html',
  styleUrls: ['./chat-list.component.css']
})
export class ChatListComponent implements OnInit {

  @Input() currentUserId : any;
  
  chatList : any[] = []
  resizbale: boolean=false;
  showChat: boolean=false;
  userChat: any;
  pfpPath: any;
  message:any;
  conversation: Chat[] = [];
  reciverId: any;
  senderId: any;

  constructor(
    private userService : UserService,
    public share:SharingService,
    public profilePicService:ProfilePicService,
    public utilService:UtilsService,
    public chatService:ChatService) { }

  ngOnInit(): void {
  
    //getting users for chat list 
    this.getUsers();
    this.chatService.getSingleChat(this.senderId,this.reciverId).subscribe((value)=>{
      this.conversation=value
      console.log("conversation in list",this.conversation)
    
    })
    

  }

  

  getUsers(){
    this.userService.getUsers().subscribe({
      next : (res : any) => {
        this.chatList = res;
      },
      error : (err : any) => {
        console.log("Error getting users for chat list")
      }
    })
  }

   emitUserInfo(chatElem:any)
  {
    this.senderId = this.share.getUserSettings()._id
      this.reciverId = this.share.reciverChatId
    this.showChat=true
this.chatService.getSingleChat(this.senderId,this.reciverId).subscribe((value)=>{
  this.conversation=value
  console.log("conversation in list",this.conversation)

})
    
      this.conversation= this.share.conversation
    if(this.conversation.length==0)
    {
      this.conversation= this.share.conversation

    console.log("conversation in list",this.conversation.length)

    }
    console.log("user info",chatElem)
    this.userChat=chatElem
    this.pfpPath=this.share.userPic

    
  }

  chatResize()
  {
    console.log("chat",this.resizbale)
    if(this.resizbale==true)
    {
      this.resizbale=false
    }else{

      this.resizbale=true


    }

    
  }

 
 

  closeChat()
  {
    this.showChat=false
  }




  prepareChat()
  {
    this.senderId = this.share.getUserSettings()._id
    this.reciverId = this.share.reciverChatId

    console.log("sender  id",this.senderId)
    console.log("reciver id user",this.reciverId)
    console.log("chat prepare")
    let chat:any={
      "message":this.message,
      "userDistId":this.senderId,
    }
    let conversation=new Chat(this.senderId,this.reciverId,chat)
    this.chatService.createChat(this.senderId,this.reciverId,conversation).subscribe(()=>{
      console.log("message saved")
      this.chatService.getSingleChat(this.senderId,this.reciverId).subscribe((value)=>{
        this.conversation=value
        console.log("conversation in list",this.conversation)
      
      })
      this.message=""
      
    })
  }

}
