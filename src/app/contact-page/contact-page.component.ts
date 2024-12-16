import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ContactService } from '../services/contact.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-page',
  templateUrl: './contact-page.component.html',
  styleUrls: ['./contact-page.component.css']
})
export class ContactPageComponent implements OnInit, OnDestroy {

  contactForm: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(private formBuilder: FormBuilder, private contactService: ContactService, private router: Router) {
    // Initialize the form
    this.contactForm = this.formBuilder.group({
      name: [''],
      email: [''],
      subject: [''],
      message: ['']
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
    console.log(this.contactForm.value);
    this.router.navigate(['/inbox']);
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions when the component is destroyed
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }
}
