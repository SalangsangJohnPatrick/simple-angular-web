import { Component, OnInit, OnDestroy } from '@angular/core';
import { ContactService } from '../services/contact.service';
import { map, Subscription } from 'rxjs';
import Swal from 'sweetalert2';

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

  private truncateText(text: string, maxLength: number): string {
    if (text.length > maxLength) {
      return text.substring(0, maxLength) + '...';
    }
    return text;
  }

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
    if (this.mailSubscription) {
      this.mailSubscription.unsubscribe();
    }
  }

  deleteMail(mailId: number): void {
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this mail?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        this.contactService.deleteMail(mailId).subscribe({
          next: () => {
            this.mails = this.mails.filter(mail => mail.id !== mailId);
            Swal.fire('Deleted!', 'The mail has been deleted.', 'success');
          },
          error: () => {
            Swal.fire('Failed!', 'Failed to delete the mail.', 'error');
          }
        });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'The mail deletion was cancelled.', 'error');
      }
    });
  }
}
