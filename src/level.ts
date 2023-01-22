import {Player} from "./player";
import {Scene, vec} from "excalibur";
import {PlayerInputSystem} from "./player_input_system";
import {PlayerMovementSystem} from "./player_movement_system";
import {Asteroid} from "./asteroid";
import {BackgroundManager} from "./background_manager";
import {StaticBackground} from "./static_background";
import {DestroyedSystem} from "./destroyed_system";

export class Level extends Scene {

    onInitialize(engine) {
        this.add(new StaticBackground(engine));
        this.add(new BackgroundManager());
        this.add(new Player());
        Asteroid.startSpawner(engine);
        this.camera.vel = vec(0, -20);
        this.world.add(new PlayerInputSystem(engine));
        this.world.add(new PlayerMovementSystem());
        this.world.add(new DestroyedSystem());
    }
}
