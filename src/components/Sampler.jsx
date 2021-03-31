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
      sampler: new Tone.Sampler({
        urls: {
          C3: "https://freesound.org/data/previews/110/110011_1537422-hq.mp3"
      }}).toDestination(),
      now: Tone.now(),
    }
    this.playSound = this.playSound.bind(this);
  }

  componentDidMount() {
    document.addEventListener('keydown', this.playSound);
    // document.addEventListener('keyup', this.stopNote);
  }


  playSound(e) {
    console.log(e.key)
    this.state.sampler.triggerAttackRelease('C2', 1);
  }


  render() {
    return(
      <div className="samplerCont">
        <button onKeyDown={this.playSound}>C</button>
        <button onClick={this.playSound}>D</button>
        <button onClick={this.playSound}>E</button>
        <button onClick={this.playSound}>F</button>
        <button onClick={this.playSound}>G</button>
        <button onClick={this.playSound}>A</button>
        <button onClick={this.playSound}>B</button>
        <button onClick={this.playSound}>C</button>
      </div>
    )
  }
}

export default Sampler;