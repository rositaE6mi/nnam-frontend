import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterAgriculteurComponent } from './register-agriculteur.component';

describe('RegisterAgriculteurComponent', () => {
  let component: RegisterAgriculteurComponent;
  let fixture: ComponentFixture<RegisterAgriculteurComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterAgriculteurComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RegisterAgriculteurComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
