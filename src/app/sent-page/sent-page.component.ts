import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { map } from 'rxjs';

@Component({
  selector: 'app-sent-page',
  templateUrl: './sent-page.component.html',
  styleUrls: ['./sent-page.component.css']
})
export class SentPageComponent implements OnInit {

  // Truncate helper function
  private truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

  // Use pipe operator to transform data with RxJS
  mails$ = this.contactService.mails$.pipe(
    map(mails =>
      mails.map(mail => ({
        ...mail,
        subject: this.truncateText(mail.subject, 30),  // Truncate subject to 30 characters
        message: this.truncateText(mail.message, 50)   // Truncate message to 50 characters
      }))
    )
  );

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.mails$.subscribe(mails => {
      console.log(mails);
    })
  }
}
