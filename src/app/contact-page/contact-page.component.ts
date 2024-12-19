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

  constructor(
    private formBuilder: FormBuilder,
    private contactService: ContactService) {
    this.contactForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      subject: ['', Validators.required],
      message: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.contactForm.get('name')!.valueChanges.subscribe(value => this.contactService.name = value),
      this.contactForm.get('email')!.valueChanges.subscribe(value => this.contactService.email = value),
      this.contactForm.get('subject')!.valueChanges.subscribe(value => this.contactService.subject = value),
      this.contactForm.get('message')!.valueChanges.subscribe(value => this.contactService.message = value)
    );
  }

  onSubmit(): void {
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
        Swal.fire('Success!', 'Form submitted successfully!', 'success');

        this.contactService.addMailToOutbox(this.contactForm.value);

        this.contactForm.reset();

      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Form submission was cancelled.', 'error');
      }
    });
  }


  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
