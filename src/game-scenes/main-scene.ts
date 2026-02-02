
export class MainScene extends Phaser.Scene {
  private _player!: Phaser.GameObjects.Rectangle;
  private _road!: Phaser.GameObjects.TileSprite;
  private _cursor!: Phaser.Types.Input.Keyboard.CursorKeys;

  constructor() {
    super('MainSene');
  }

  payload() { }


  create() {
    const width = this.scale.width;
    const height = this.scale.height;

    const graphics = this.make.graphics({ x: 0, y: 0 })

    graphics.fillStyle(0x222222);
    graphics.fillRect(0, 0, width, height);


    graphics.fillStyle(0x443322);
    graphics.fillRect(0, 0, 100, height);
    graphics.fillRect(width - 100, 0, 100, height);

    graphics.lineStyle(2, 0xffee00);
    graphics.lineBetween(width / 2, 150, width / 2, height);
    graphics.generateTexture('roadTexture', width, height);



    this._road = this.add.tileSprite(width / 2, height / 2, width, height, 'roadTexture');

    this._player = this.add.rectangle(width / 2, height - 150, 20, 40, 0xff4444);
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
      body.rotation = -10;
    } else if (this._cursor.right.isDown) {
      body.setVelocityX(250);
      body.rotation = +10;
    } else {
      body.setVelocity(0);
      body.rotation = 0;
    }

    if (this._player.x < 150) this._player.x = 150;
    if (this._player.x > this.scale.width - 150) this._player.x = this.scale.width - 150;
  }
}
