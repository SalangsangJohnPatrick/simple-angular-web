import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit, OnDestroy {

  contactForm: FormGroup;
  private subscriptions: Subscription[] = [];
  // submitted: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService) {
    // Initialize the form
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    // Subscribe to form changes and update the service's BehaviorSubjects
    this.subscriptions.push(
      this.contactForm.get('name')!.valueChanges.subscribe(value => this.contactService.name = value),
      this.contactForm.get('email')!.valueChanges.subscribe(value => this.contactService.email = value),
      this.contactForm.get('subject')!.valueChanges.subscribe(value => this.contactService.subject = value),
      this.contactForm.get('message')!.valueChanges.subscribe(value => this.contactService.message = value)
    );
  }

  onSubmit(): void {
    // // Save the form data to local storage
    // localStorage.setItem('contactFormData', JSON.stringify(this.contactForm.value));
    console.log('Form data sent:', this.contactForm.value);

    // Display the SweetAlert with an interactive confirmation
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to submit the form?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, submit it!',
      cancelButtonText: 'No, cancel!',
      reverseButtons: true
    }).then((result) => {
      if (result.isConfirmed) {
        // Handle the successful confirmation (form submission)
        Swal.fire('Success!', 'Form submitted successfully!', 'success');

        this.contactService.addMailToOutbox(this.contactForm.value);

        this.contactForm.reset();

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Form submission was cancelled.', 'error');
      }
    });
  }


  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions when the component is destroyed
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
