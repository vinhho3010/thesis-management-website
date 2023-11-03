import { Location } from '@angular/common';
import { Component, ElementRef, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import { ChatService } from 'src/app/services/chat.service';
import { ToastService } from 'src/app/services/local/toast.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {
  @ViewChild('chatContainer', { static: false }) chatContainer!: ElementRef;

  currentUserId = this.authService.getUser()._id;
  inputForm = new FormGroup({
    message: new FormControl('')
  });
  chatList: any[] = [];

  selectedChat: any;
  selectedUserChatId?: any;
  messages: any[] = [];

  constructor(
    private chatService: ChatService,
    private authService: AuthService,
    private location: Location,
    private toastService: ToastService,
  ) {}

  ngOnInit(): void {
    this.loadChatList();
    this.listenMessages();
    this.scrollToBottom();
  }

  checkIfGoFromClass() {
    //a user is selected from class component
    const selectedFromClass = this.location.getState() as any;
    if(selectedFromClass?.user) {
      const selectedChat = this.chatList.find((chat: any) => chat.friend._id === selectedFromClass?.user?._id);

      if(selectedChat) { //if chat room is existed
        this.onChangeChat(selectedChat);
      } else { //if chat room is not existed, create new chat room
        this.createNewChatRoom(this.selectedUserChatId);
      }

    }
  }

  createNewChatRoom(friendId: string) {
    this.chatService.createChatRoom(friendId, this.currentUserId).subscribe((data: any) => {
      this.loadChatList();
      this.selectedChat = data;
    });
  }

  loadChatList() {
    this.chatService.getChatList(this.currentUserId).subscribe({
      next: (data: any) => {
        this.chatList = data;
        this.chatList = this.chatList.map((chat: any) => {
          return {
            ...chat,
            friend: chat.participants.find((participant: any) => participant._id !== this.currentUserId)
          }
        });

        this.checkIfGoFromClass();

      },
      error: (err) => {
        this.toastService.showErrorToast(err.error.message);
      }
    })
  }

  sendMessage() {
    if (this.inputForm.controls['message'].value) {
      const message = {
        from: this.currentUserId,
        to: this.selectedUserChatId,
        message: this.inputForm.controls['message'].value
      }
      this.chatService.sendMessage(message);
      this.messages.push(message);
      this.inputForm.reset();
      this.scrollToBottom();
    }
  }

  listenMessages() {
    return this.chatService.getMessage().subscribe((data: any) => {
      this.messages.push(data);
      this.scrollToBottom();
    });
  }

  onChangeChat(chat: any) {
    this.selectedUserChatId = chat.friend._id;
    if(this.selectedChat?._id !== chat._id) {
      this.selectedChat = chat;
      this.loadMessages(this.selectedChat._id);
    }
    this.scrollToBottom();
  }

  loadMessages(selectedChatId: string) {
    this.chatService.getMessageByRoom(selectedChatId).subscribe((data: any) => {
      this.messages = data.messages;
    });
  }

  scrollToBottom(): void {
    if(this.chatContainer) {
      const chatContainer = this.chatContainer.nativeElement;
    chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }
}
