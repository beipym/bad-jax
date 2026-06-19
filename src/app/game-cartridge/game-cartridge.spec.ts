import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GameCartridge } from './game-cartridge';

describe('GameCartridge', () => {
  let component: GameCartridge;
  let fixture: ComponentFixture<GameCartridge>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GameCartridge]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GameCartridge);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
