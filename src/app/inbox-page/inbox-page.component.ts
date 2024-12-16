import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { combineLatest } from 'rxjs';
import { BehaviorSubject } from 'rxjs';

@Component({
  selector: 'app-inbox-page',
  templateUrl: './inbox-page.component.html',
  styleUrls: ['./inbox-page.component.css']
})
export class InboxPageComponent implements OnInit {

  // Initialize a BehaviorSubject to store the messages
  private messagesSubject = new BehaviorSubject<{ name: string, email: string, subject: string, message: string }[]>([]);
  
  // Expose messages as an observable
  messages$ = this.messagesSubject.asObservable();

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    // Use combineLatest to get the latest values from each observable
    combineLatest([
      this.contactService.name$,
      this.contactService.email$,
      this.contactService.subject$,
      this.contactService.message$
    ]).subscribe(([name, email, subject, message]) => {
      // Push a new message object to the existing messages array
      const currentMessages = this.messagesSubject.value;
      currentMessages.push({ name, email, subject, message });

      // Emit the updated array of messages
      this.messagesSubject.next(currentMessages);
    });
  }
}
