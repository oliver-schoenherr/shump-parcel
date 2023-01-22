import {ImageSource, Loader, Sound} from "excalibur";
import ship from "./images/ship.png";
import ship_explosion from "./images/ship_explosion.png";
import laser from "./images/laser.png";
import asteroid from "./images/asteroid.png";
import static_background from "./images/static_background.png";
import background_tile from "./images/background_tile.png";
import laser_sound from "./sounds/laser.mp3";
import hit_sound from "./sounds/hit.mp3";

const Images = {
  Ship: new ImageSource(ship),
  ShipExplosion: new ImageSource(ship_explosion),
  Laser: new ImageSource(laser),
  Asteroid: new ImageSource(asteroid),
  StaticBackground: new ImageSource(static_background),
  BackgroundTile: new ImageSource(background_tile),
}

const Sounds = {
  Laser: new Sound(laser_sound),
  Hit: new Sound(hit_sound),
}

const loader = new Loader([...Object.values(Images), ...Object.values(Sounds)]);

export { Images, Sounds, loader };
