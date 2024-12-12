import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  private _name: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _email: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _subject: BehaviorSubject<string> = new BehaviorSubject<string>('');
  private _message: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor() { }

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
