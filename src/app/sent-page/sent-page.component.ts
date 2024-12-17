import { Component, OnInit } from '@angular/core';
import { ContactService } from '../services/contact.service';

@Component({
  selector: 'app-sent-page',
  templateUrl: './sent-page.component.html',
  styleUrls: ['./sent-page.component.css']
})
export class SentPageComponent implements OnInit {

  // Expose messages as an observable
  mails$ = this.contactService.mails$;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.mails$.subscribe(mails => {
      console.log(mails);
    })
  }
}
