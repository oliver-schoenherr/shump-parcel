import {Component, Vector} from "excalibur";

export class PlayerInputComponent extends Component {
    type = 'os.player_input'

    constructor() {
        super();
        this._direction = Vector.Zero;
    }

    protected _direction: Vector;

    get direction() {
        return this._direction;
    }

    set direction(newDirection) {
        this._direction = newDirection;
    }

    private _fire: boolean;

    get fire() {
        return this._fire;
    }

    set fire(newFire) {
        this._fire = newFire;
    }
}
