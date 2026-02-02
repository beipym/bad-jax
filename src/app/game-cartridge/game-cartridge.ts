import { Component, OnInit, AfterViewInit, OnDestroy } from '@angular/core';
import * as Phaser from 'phaser';

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

class MainScene extends Phaser.Scene {
  private _player!: Phaser.GameObjects.Rectangle;
  private _road!: Phaser.GameObjects.TileSprite;
  private _cursor!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('MainSene');
  }

  payload() { }


  create() {
    const graphics = this.make.graphics({ x: 0, y: 0 })

    graphics.fillStyle(0x333333);
    graphics.fillRect(0, 0, 400, 600);
    graphics.lineStyle(2, 0xffee00);
    graphics.lineBetween(200, 0, 200, 600);
    graphics.generateTexture('roadTexture', 400, 600);



    this._road = this.add.tileSprite(200, 300, 400, 600, 'roadTexture');

    this._player = this.add.rectangle(200, 500, 40, 60, 0xff4444);
    this.physics.add.existing(this._player);


    if (this.input.keyboard) {
      this._cursor = this.input.keyboard.createCursorKeys();
    }
  }

  override update(time?: number, delta?: number): void {
    this._road.tilePositionY -= 5;
    const body = this._player.body as Phaser.Physics.Arcade.Body;

    if (this._cursor.left.isDown) {
      body.setVelocityX(-200);
    } else if (this._cursor.right.isDown) {
      body.setVelocityX(200);
    } else {
      body.setVelocity(0);
    }

    if (this._player.x < 50) this._player.x = 50;
    if (this._player.x > 350) this._player.x = 350;
  }
}
