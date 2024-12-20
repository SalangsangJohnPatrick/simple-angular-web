import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _name: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _email: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _subject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _message: BehaviorSubject<string> = new BehaviorSubject<string>('');

  private _mails: BehaviorSubject<{ id: number, name: string, email: string, subject: string, message: string }[]> =
    new BehaviorSubject<{ id: number, name: string, email: string, subject: string, message: string }[]>([]);

  private nextMailId = 1;  // Start ID counter at 1 or wherever you'd like

  constructor() { }

  addMailToOutbox(newMail: { name: string, email: string, subject: string, message: string }) {
    const currentMessages = this._mails.getValue();
    
    // Ensure the new mail has a unique ID
    const mailWithId = { id: this.nextMailId++, ...newMail };

    this._mails.next([...currentMessages, mailWithId]);

    console.log('Added new mail:', mailWithId);  // Log the added mail for debugging
  }

  deleteMail(mailId: number): Observable<void> {
    const currentMessages = this._mails.getValue();
    
    console.log('Current mails before deletion:', currentMessages);

    // Filter out the mail with the specific mailId
    const updatedMessages = currentMessages.filter(mail => mail.id !== mailId);

    console.log('Updated mails after deletion:', updatedMessages);

    // Update the BehaviorSubject with the new array
    this._mails.next(updatedMessages);

    return of();  // Simulate successful deletion
  }

  get mails$(): Observable<{ id: number, name: string, email: string, subject: string, message: string }[]> {
    return this._mails.asObservable();
  }

  get name$(): Observable<string> {
    return this._name.asObservable();
  }

  get email$(): Observable<string> {
    return this._email.asObservable();
  }

  get subject$(): Observable<string> {
    return this._subject.asObservable();
  }

  get message$(): Observable<string> {
    return this._message.asObservable();
  }

  set name(value: string) {
    this._name.next(value);
  }

  set email(value: string) {
    this._email.next(value);
  }

  set subject(value: string) {
    this._subject.next(value);
  }

  set message(value: string) {
    this._message.next(value);
  }
}
