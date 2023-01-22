import {Actor, Animation, AnimationStrategy, CollisionType, range, Sprite, SpriteSheet, vec} from "excalibur";
import {Images, Sounds} from "./resources";
import {PlayerInputComponent} from "./player_input_component";
import {PlayerLaser} from "./player_laser";
import {Asteroid} from "./asteroid";
import {DestroyedComponent} from "./destroyed_component";

export class Player extends Actor {
    private delayFire: boolean;

    constructor() {
        super({
            pos: vec(150, 150),
            width: 240 / 4,
            height: 304 / 4,
            collisionType: CollisionType.Passive,
        });

        this.delayFire = false;
    }

    onInitialize(engine) {
        this.addComponent(new PlayerInputComponent());
        this.on('collisionstart', this.onCollisionStart.bind(this))
        this.on('kill', () => {
            engine.stop();
        })

        this.graphics.use(new Sprite({
                image: Images.Ship,
                destSize: {
                    width: 240 / 4,
                    height: 304 / 4,
                },
            })
        );
    }

    onCollisionStart(evt) {
        if (evt.other instanceof Asteroid) {
            Sounds.Hit.play();
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

            this.addComponent(new DestroyedComponent(explosionAnimation))
        }
    }

    onPostUpdate(engine, delta) {
        const input = this.get(PlayerInputComponent);

        if (input && input.fire) {
            this.fire(engine);
        }
    }

    fire(engine) {
        this.debounce(() => {
            engine.add(new PlayerLaser(this.pos));
            Sounds.Laser.play();
        }, engine, 300)
    }

    debounce(fn, engine, timeout) {
        if (!this.delayFire) {
            fn()
            this.delayFire = true;

            engine.clock.schedule(() => {
                this.delayFire = false;
            }, timeout);
        }
    }
}
