import {
    Actor,
    Animation,
    AnimationStrategy,
    EventTypes,
    Random,
    range,
    Sprite,
    SpriteSheet,
    Timer,
    vec
} from "excalibur";
import {Images} from "./resources";
import {DestroyedComponent} from "./destroyed_component";

export class Asteroid extends Actor {
    constructor(pos) {
        super({
            pos: pos,
            width: 256 / 4,
            height: 276 / 4,
            vel: vec(0, 0),
            anchor: vec(0, 1),
        });

        this.on(EventTypes.ExitViewport, () => this.kill());
    }

    static startSpawner(engine) {
        const random = new Random(1337)
        const timer = new Timer({
            random,
            randomRange: [0, 500],
            interval: 5000,
            repeats: true,
            fcn: () => {
                engine.add(new Asteroid(vec(random.integer(0, engine.drawWidth), engine.currentScene.camera.viewport.top)))
            }
        })
        engine.add(timer);
        timer.start()
    }

    onInitialize() {
        this.graphics.use(new Sprite({
                image: Images.Asteroid,
                destSize: {
                    width: 256 / 4,
                    height: 276 / 4,
                },
            })
        );
    }

    onPostUpdate(engine, delta) {
    }

    destroy() {
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
