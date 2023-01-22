import {Engine, System, SystemType, TransformComponent, Vector} from "excalibur";
import {PlayerInputComponent} from "./player_input_component";

export class PlayerInputSystem extends System {
    types = ["os.player_input", 'ex.transform'];
    priority = 98;
    systemType = SystemType.Update
    private engine: Engine;
    private buttonPressed: boolean;

    constructor(engine) {
        super();
        this.engine = engine;
        this.buttonPressed = false;

        engine.input.pointers.primary.on('down', function (evt) {
            this.buttonPressed = true;
        }.bind(this))
        engine.input.pointers.primary.on('up', function (evt) {
            this.buttonPressed = false;
        }.bind(this))
    }

    update(entities, delta) {
        let pointer = this.engine.screenToWorldCoordinates(this.engine.input.pointers.primary.lastScreenPos);

        for (let entity of entities) {
            const transform = entity.get(TransformComponent);
            const input = entity.get(PlayerInputComponent);

            if (transform.pos.distance(pointer) > 10) {
                input.direction = pointer.sub(transform.pos).normalize();
            } else {
                input.direction = Vector.Zero;
            }

            input.fire = this.buttonPressed;
        }
    }
}
