import React from 'react';
import * as Tone from "tone";
import Keys from './Keys.jsx';
import OctaveSelect from './OctaveSelect.jsx';
import WaveSelect from './WaveSelect.jsx';
import DialKnob from './DialKnob.jsx';


class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: null,
      now: Tone.now(),
      poly: false,
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C'],
      pressed: {
        'a': false,
        'w': false,
        's': false,
        'e': false,
        'd': false,
        'f': false,
        't': false,
        'g': false,
        'y': false,
        'h': false,
        'u': false,
        'j': false,
        'k': false
      },
      options: {
        oscillator : {
          type : 'sine'
        },
        envelope : {
          attack : 0.01,
          decay : 0.1,
          sustain : 0.5,
          release : .6
        }
      }
    }
    this.playNote = this.playNote.bind(this);
    this.stopNote = this.stopNote.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  componentDidMount() {
    this.setState({
      synth: new Tone.Synth(this.state.options).toDestination()
    })
    document.addEventListener('keydown', this.playNote);
    document.addEventListener('keyup', this.stopNote);
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.waveChange !== prevState.waveChange) {
      this.setState({
        synth: new Tone.Synth(this.state.options).toDestination(),
        waveChange: false
      })
    }
    // } else if (this.state.envChange !== prevState.envChange) {
    //   this.setState({
    //     synth: new Tone.Synth(this.state.options).toDestination(),
    //     envChange: false
    //   })
    // }
    // document.addEventListener('keydown', this.playNote);
    // document.addEventListener('keyup', this.stopNote);
  }

  handlePress(key) {
    let press = this.state.pressed;
    press[key] = !press[key];
    this.setState({
      pressed: press
    })
  }

  changeWaveForm(waveform) {
    let wave = this.state.options;
    wave['oscillator']['type'] = waveform.value;
    this.setState({
      options: wave,
      waveChange: true
    })
  }

  changeAttack(val) {
    if (val * 0.01 === this.state.options['envelope']['attack']) {
      return;
    }
    let attack = this.state.options;
    attack['envelope']['attack'] = val * 0.01;
    this.setState({
      options: attack,
      synth: new Tone.Synth(attack).toDestination()
    })
  }

  changeDecay(val) {
    if (val * 0.1 !== this.state.options['envelope']['decay']) {
      let decay = this.state.options;
      decay['envelope']['decay'] = val * 0.1;
      this.setState({
        options: decay,
        synth: new Tone.Synth(decay).toDestination()
      })
    }
  }

  changeSustain(val) {
    if (val * 0.01 !== this.state.options['envelope']['sustain']) {
      let sustain = this.state.options;
      sustain['envelope']['sustain'] = val * 0.01;
      this.setState({
        options: sustain,
        synth: new Tone.Synth(sustain).toDestination()
      })
    }
  }


  playNote(e) {
    let oct = this.props.octave;
    this.handlePress(e.key);
    switch (e.key) {
      case "a":
        return this.state.synth.triggerAttack(`C${oct}` , this.state.now);
      case "w":
        return this.state.synth.triggerAttack(`C#${oct}`, this.state.now);
      case "s":
        return this.state.synth.triggerAttack(`D${oct}`, this.state.now);
      case "e":
        return this.state.synth.triggerAttack(`D#${oct}`, this.state.now);
      case "d":
        return this.state.synth.triggerAttack(`E${oct}`, this.state.now);
      case "f":
      return this.state.synth.triggerAttack(`F${oct}`, this.state.now);
      case "t":
      return this.state.synth.triggerAttack(`F#${oct}`, this.state.now);
      case "g":
      return this.state.synth.triggerAttack(`G${oct}`, this.state.now);
      case "y":
      return this.state.synth.triggerAttack(`G#${oct}`, this.state.now);
      case "h":
      return this.state.synth.triggerAttack(`A${oct}`, this.state.now);
      case "u":
      return this.state.synth.triggerAttack(`A#${oct}`, this.state.now);
      case "j":
      return this.state.synth.triggerAttack(`B${oct}`, this.state.now);
      case "k":
      return this.state.synth.triggerAttack(`C${oct+1}`, this.state.now);
      default:
        return;
    }
  }

  stopNote(e) {
    switch (e.key) {
      case "a":
      case "w":
      case "s":
      case "e":
      case "d":
      case "f":
      case "t":
      case "g":
      case "y":
      case "h":
      case "u":
      case "j":
      case "k":
        this.handlePress(e.key)
        this.state.synth.triggerRelease();
    }
  }

  render() {
    return(
      <div className="keyboard">
        <div>
          <span>octave</span>
          <OctaveSelect change={this.props.octaveChange}/>
        </div>
        <div>
          <span>waveform</span>
          <WaveSelect change={this.changeWaveForm.bind(this)}/>
        </div>
        <div className="attack">
          <DialKnob knob={'attack'} start={1} max={100} change={this.changeAttack.bind(this)} />
        </div>
        <div className="decay">
          <DialKnob knob={'decay'} start={1} max={100} change={this.changeDecay.bind(this)} />
        </div>
        <div className="sustain">
          <DialKnob knob={'sustain'} start={5} max={100} change={this.changeSustain.bind(this)} />
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['a'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>C</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['w'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>C#</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['s'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>D</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['e'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>D#</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['d'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>E</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['f'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>F</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['t'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>F#</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['g'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>G</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['y'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>G#</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['h'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>A</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['u'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>A#</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['j'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>B</button>
        </div>
        <div className="key-wrapper">
          <button className={this.state.pressed['k'] ? "key pressed" : "key"} onKeyUp={this.playNote} onKeyDown={this.stopNote}>C</button>
        </div>
      </div>
    )
  }
}

export default Keyboard;