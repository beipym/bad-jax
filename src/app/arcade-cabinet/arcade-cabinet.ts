import { Component } from '@angular/core';
import { GameCartridge } from "../game-cartridge/game-cartridge";

@Component({
  selector: 'app-arcade-cabinet',
  imports: [GameCartridge],
  templateUrl: './arcade-cabinet.html',
})
export class ArcadeCabinet {

}
