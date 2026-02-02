
export class MainScene extends Phaser.Scene {
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
    graphics.lineBetween(200, 300, 200, 500);
    graphics.generateTexture('roadTexture', 200, 400);



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
      body.setVelocityX(-250);
    } else if (this._cursor.right.isDown) {
      body.setVelocityX(250);
    } else {
      body.setVelocity(0);
    }

    if (this._player.x < 50) this._player.x = 50;
    if (this._player.x > 350) this._player.x = 350;
  }
}
