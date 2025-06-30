import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginAgriculteurComponent } from './login-agriculteur.component';

describe('LoginAgriculteurComponent', () => {
  let component: LoginAgriculteurComponent;
  let fixture: ComponentFixture<LoginAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoginAgriculteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LoginAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
