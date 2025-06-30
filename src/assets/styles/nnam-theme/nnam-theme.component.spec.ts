import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NnamThemeComponent } from './nnam-theme.component';

describe('NnamThemeComponent', () => {
  let component: NnamThemeComponent;
  let fixture: ComponentFixture<NnamThemeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NnamThemeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NnamThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
