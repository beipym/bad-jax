
export class MainScene extends Phaser.Scene {

  private _player!: Phaser.GameObjects.Rectangle;

  private _road!: Phaser.GameObjects.TileSprite;

  private _cursor!: Phaser.Input.Pointer;

  private _scraps!: Phaser.Physics.Arcade.Group;
  private _playerBullets!: Phaser.Physics.Arcade.Group;
  private _enemyBullets!: Phaser.Physics.Arcade.Group;

  private _playerShootInterval: number = 100;
  private _enemyShootingInterval: number = 300;
  private _playerShootTimer: number = 50;
  private _enemyShootTimer: number = 300;
  private _spawnTime: number = 0;

  constructor() {
    super('MainScene');
  }

  payload() { }


  create() {
    // keep access to width and height
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
    (this._player.body as Phaser.Physics.Arcade.Body).setCollideWorldBounds(true);

    this._scraps = this.physics.add.group();
    this._playerBullets = this.physics.add.group();
    this._enemyBullets = this.physics.add.group();

    this.physics.add.overlap(this._playerBullets, this._scraps, (bullet, scrap) => {
      bullet.destroy();
      scrap.destroy();
    })

    this.physics.add.overlap(this._player, this._enemyBullets, () => {
      console.log("jax is shot!");
      this.scene.pause();
      setTimeout(() => {
        this.scene.restart();
      }, 1000);
    })

    this.physics.add.overlap(this._player, this._scraps, () => {
      console.log("CRASHED!");
      this.scene.pause();
      setTimeout(() => {
        this.scene.restart();
      }, 1000);
    })

    this._cursor = this.input.activePointer;
  }

  override update(time: number, delta: number): void {

    if (this._cursor.isDown) {

      this._road.tilePositionY -= 5;
      const playerBody = this._player.body as Phaser.Physics.Arcade.Body;

      playerBody.x = Phaser.Math.Linear(playerBody.x, this._cursor.x, 0.2);
      this._playerBullets.setVelocityY(-600);
      this._scraps.setVelocityY(400);
      this.firePlayerBullet(delta);
      this.spawnScrap(delta);
      this.physics.resume();
      console.log("hello", this._cursor.x);


    } else {
      this._scraps.setVelocityY(0);
      this._playerBullets.setVelocityY(0);

      this.physics.pause()
    }


    this._scraps.children.entries.forEach((scrap: any) => {
      if (scrap.y > 950) {
        scrap.destroy();
      }
    })

    if (this._player.x < 150) this._player.x = 150;
    if (this._player.x > this.scale.width - 150) this._player.x = this.scale.width - 150;
  }

  spawnScrap(delta: number) {
    this._spawnTime += delta;
    if (this._spawnTime > 1000) {
      const x = Phaser.Math.Between(140, this.scale.width - 140);
      const scrap = this.add.rectangle(x, -50, 30, 30, 0x999999);
      this._scraps.add(scrap);
      const scrapBody = scrap.body as Phaser.Physics.Arcade.Body;
      scrapBody.setVelocityY(400);
      this._spawnTime = 0;
    }
  }

  firePlayerBullet(delta: number) {
    this._playerShootInterval += delta;
    if (this._playerShootInterval > this._playerShootTimer) {

      const bullet = this.add.rectangle(this._player.x, this._player.y, 6, 15, 0x00ffff);
      this._playerBullets.add(bullet);

      const bulletBody = bullet.body as Phaser.Physics.Arcade.Body;
      bulletBody.setVelocityY(-600);
      this._playerShootInterval = 0;
    }
  }

  /**
   * TODO::// implementation sucks!
   * */
  fireEnemyBullet(delta: number, enemy: Phaser.Physics.Arcade.Body) {
    this._enemyShootingInterval += delta;
    if (this._enemyShootingInterval > this._enemyShootTimer) {

      const bullet = this.add.rectangle(enemy.x, enemy.y, 6, 15, 0xff0000);
      this._enemyBullets.add(bullet);

      const bulletBody = bullet.body as Phaser.Physics.Arcade.Body;
      bulletBody.setVelocityY(600);
      this._playerShootInterval = 0;
    }

  }
}
