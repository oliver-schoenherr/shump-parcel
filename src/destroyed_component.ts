import {Animation, Component} from "excalibur";

export class DestroyedComponent extends Component {
  type = 'os.destroyed'
  private _animation: Animation;
  private _started: boolean;

  constructor(animation) {
    super();
    this._animation = animation;
    this._started = false;
  }

  get animation() {
    return this._animation;
  }

  get started() {
    return this._started;
  }

  set started(flag) {
    this._started = flag;
  }
}
