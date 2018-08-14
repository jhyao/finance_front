import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SymbolsSelectorComponent } from './symbols-selector.component';

describe('SymbolsSelectorComponent', () => {
  let component: SymbolsSelectorComponent;
  let fixture: ComponentFixture<SymbolsSelectorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SymbolsSelectorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SymbolsSelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
