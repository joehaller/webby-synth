import React from 'react';
import * as Tone from "tone";
import Keys from './Keys.jsx';
import OctaveSelect from './OctaveSelect.jsx';
import WaveSelect from './WaveSelect.jsx';
import DialKnob from './DialKnob.jsx';


class Sampler extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      sampler: this.props.currSample,
      now: Tone.now(),
      pressed: {
        '1': false,
        '2': false,
        '3': false,
        '4': false,
        '5': false,
        '6': false,
        '7': false,
        '8': false
      }
    }
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.setState({
      sampler: new Tone.Sampler({
        urls: {
          C3: this.props.currSample
      }}).toDestination()
    })
    document.addEventListener('keydown', this.playSound);
    document.addEventListener('keyup', this.stopSound);
  }

  componentDidUpdate(prevProps) {

    if (prevProps.currSample!== this.props.currSample) {
      this.setState({
        sampler: new Tone.Sampler({
          urls: {
            C3: this.props.currSample
        }}).toDestination()
      })
    }
  }


  playSound(e) {
    this.handlePress(e.key);
    if (this.state.sampler.loaded) {
      switch (e.key) {
        case "1":
          return this.state.sampler.triggerAttack('C2');
        case "2":
          return this.state.sampler.triggerAttack('D2');
        case "3":
          return this.state.sampler.triggerAttack('E2');
        case "4":
          return this.state.sampler.triggerAttack('F2');
        case "5":
          return this.state.sampler.triggerAttack('G2');
        case "6":
          return this.state.sampler.triggerAttack('A2');
        case "7":
          return this.state.sampler.triggerAttack('B2');
        case "8":
          return this.state.sampler.triggerAttack('C3');
        default:
          return;
      }
    }
  }
  stopSound(e) {
    switch (e.key) {
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
        this.handlePress(e.key)
        return this.state.sampler.triggerRelease();
      default:
        return;
    }
  }

  handlePress(key) {
    key = key.toString();
    let press = this.state.pressed;
    press[key] = !press[key];
    this.setState({
      pressed: press
    })
  }


  render() {
    return(
      <div className="samplerCont">
        <button className={this.state.pressed['1'] ? "pad pressed" : "pad"} onKeyUp={this.playSound} onKeyDown={this.stopSound}>C</button>
        <button className={this.state.pressed['2'] ? "pad pressed" : "pad"} onKeyUp={this.playSound} onKeyDown={this.stopSound}>D</button>
        <button className={this.state.pressed['3'] ? "pad pressed" : "pad"} onKeyUp={this.playSound} onKeyDown={this.stopSound}>E</button>
        <button className={this.state.pressed['4'] ? "pad pressed" : "pad"} onKeyUp={this.playSound} onKeyDown={this.stopSound}>F</button>
        <button className={this.state.pressed['5'] ? "pad pressed" : "pad"}  onKeyUp={this.playSound} onKeyDown={this.stopSound}>G</button>
        <button className={this.state.pressed['6'] ? "pad pressed" : "pad"} onKeyUp={this.playSound} onKeyDown={this.stopSound}>A</button>
        <button className={this.state.pressed['7'] ? "pad pressed" : "pad"} onKeyUp={this.playSound} onKeyDown={this.stopSound}>B</button>
        <button className={this.state.pressed['8'] ? "pad pressed" : "pad"} onKeyUp={this.playSound} onKeyDown={this.stopSound}>C</button>
      </div>
    )
  }
}

export default Sampler;