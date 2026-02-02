import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as Phaser from 'phaser';
import { MainScene } from '../../game-scenes/main-scene';

@Component({
  selector: 'app-game-cartridge',
  imports: [],
  template: `<div id="game-cartridge-holder"></div>`,
})
export class GameCartridge implements OnInit, AfterViewInit, OnDestroy {

  private _game!: Phaser.Game;

  ngOnInit() {
    const config: Phaser.Types.Core.GameConfig = {
      type: Phaser.AUTO,
      parent: 'game-cartridge-holder',
      width: 400,
      height: 600,
      physics: { default: 'arcade' },
      scene: [MainScene]
    }
    this._game = new Phaser.Game(config);
  }
  ngAfterViewInit() { }
  ngOnDestroy() {
    if (this._game) {
      this._game.destroy(true);
    }
  }
}

