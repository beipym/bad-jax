import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArcadeCabinet } from './arcade-cabinet';

describe('ArcadeCabinet', () => {
  let component: ArcadeCabinet;
  let fixture: ComponentFixture<ArcadeCabinet>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArcadeCabinet]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ArcadeCabinet);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
