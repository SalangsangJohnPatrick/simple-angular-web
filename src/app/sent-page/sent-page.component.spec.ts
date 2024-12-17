import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentPageComponent } from './sent-page.component';

describe('SentPageComponent', () => {
  let component: SentPageComponent;
  let fixture: ComponentFixture<SentPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
