import {
  Actor,
  CollisionType,
  range,
  Sprite,
  SpriteSheet,
  vec,
  Animation,
  AnimationStrategy,
  Vector
} from "excalibur";
import {Images, Sounds} from "./resources";
import {PlayerInputComponent} from "./player_input_component";
import {PlayerLaser} from "./player_laser";
import {Asteroid} from "./asteroid";

export class ShipExplosion extends Actor {
  constructor(pos) {
    super({
      pos: pos,
      width: 240 / 4,
      height: 304 / 4,
      collisionType: CollisionType.PreventCollision,
    });
  }

  onInitialize(engine) {
    const explosionAnimation = Animation.fromSpriteSheet(SpriteSheet.fromImageSource({
      image: Images.ShipExplosion,
      grid: {
        rows: 1,
        columns: 6,
        spriteHeight: Images.ShipExplosion.height,
        spriteWidth: Images.ShipExplosion.width / (6 * 4),
      },
    }), range(0, 5), 200);
    explosionAnimation.strategy = AnimationStrategy.End;
    explosionAnimation.events.on('end', (a) => {
      this.kill();
      engine.stop();
    })

    this.graphics.use(explosionAnimation);
  }
}
