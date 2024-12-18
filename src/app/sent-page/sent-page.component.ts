import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { map, Subscription } from 'rxjs';

@Component({
  selector: 'app-sent-page',
  templateUrl: './sent-page.component.html',
  styleUrls: ['./sent-page.component.css']
})
export class SentPageComponent implements OnInit, OnDestroy {

  isLoading: boolean = true;   // Track loading state
  error: string | null = null; // Track error state
  mails: any[] = [];           // Store mails locally if needed
  mailSubscription!: Subscription; // To unsubscribe later if needed

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
        subject: this.truncateText(mail.subject, 40),
        message: this.truncateText(mail.message, 100)
      }))
    )
  );

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {
    this.mailSubscription = this.mails$.subscribe({
      next: mails => {
        this.isLoading = false;  // Data loaded, stop loading spinner
        this.mails = mails;      // Store mails locally for additional operations
      },
      error: err => {
        this.isLoading = false;
        this.error = 'Failed to load mails. Please try again later.';  // Handle errors
      }
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe to prevent memory leaks
    if (this.mailSubscription) {
      this.mailSubscription.unsubscribe();
    }
  }
}
