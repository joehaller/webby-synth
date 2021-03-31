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
      now: Tone.now()
    }
    this.playSound = this.playSound.bind(this);
    this.stopSound = this.stopSound.bind(this);
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
    console.log(e.key)
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
        // this.handlePress(e.key)
        this.state.sampler.triggerRelease(this.state.now);
      default:
        return;
    }
  }


  render() {
    return(
      <div className="samplerCont">
        <button onKeyUp={this.playSound} onKeyDown={this.stopSound}>C</button>
        <button onKeyUp={this.playSound} onKeyDown={this.stopSound}>D</button>
        <button onKeyUp={this.playSound} onKeyDown={this.stopSound}>E</button>
        <button onKeyUp={this.playSound} onKeyDown={this.stopSound}>F</button>
        <button onKeyUp={this.playSound} onKeyDown={this.stopSound}>G</button>
        <button onKeyUp={this.playSound} onKeyDown={this.stopSound}>A</button>
        <button onKeyUp={this.playSound} onKeyDown={this.stopSound}>B</button>
        <button onKeyUp={this.playSound} onKeyDown={this.stopSound}>C</button>
      </div>
    )
  }
}

export default Sampler;