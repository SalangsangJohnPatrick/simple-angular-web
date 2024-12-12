import { Component } from '@angular/core';
import { ContactService } from 'src/app/services/contact.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent {
  name$: Observable<string>;
  email$: Observable<string>;
  subject$: Observable<string>;
  message$: Observable<string>;

  constructor(private _contactService: ContactService) {
    this.name$ = this._contactService.name$;
    this.email$ = this._contactService.email$;
    this.subject$ = this._contactService.subject$;
    this.message$ = this._contactService.message$;
  }

  public modifyDetails(event: Event, field: 'name' | 'email' | 'subject' | 'message') {
    const input = event.target as HTMLInputElement;
    
    switch (field) {
      case 'name':
        this._contactService.name = input.value;
        break;
      case 'email':
        this._contactService.email = input.value;
        break;
      case 'subject':
        this._contactService.subject = input.value;
        break;
      case 'message':
        this._contactService.message = input.value;
        break;
    }
  }
}
