import {Animation, Component} from "excalibur";

export class DestroyedComponent extends Component {
    type = 'os.destroyed'

    constructor(animation) {
        super();
        this._animation = animation;
        this._started = false;
    }

    private _animation: Animation;

    get animation() {
        return this._animation;
    }

    private _started: boolean;

    get started() {
        return this._started;
    }

    set started(flag) {
        this._started = flag;
    }
}
