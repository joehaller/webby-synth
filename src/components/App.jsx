import React from 'react';
import * as Tone from "tone";


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: null,
      options: {
          oscillator : {
            type : 'square'
          },
          envelope : {
            attack : 0.002,
            decay : 0.1,
            sustain : 0.5,
            release : .6
          }
        },
      now: Tone.now(),
      octave: 3,
      poly: false
    }
    this.playNote = this.playNote.bind(this);
    this.stopNote = this.stopNote.bind(this);
  }

  componentDidMount() {
    this.setState({
      synth: new Tone.Synth(this.state.options).toDestination()
    })
    document.addEventListener('keydown', this.playNote);
    document.addEventListener('keyup', this.stopNote);
  }


  playNote(e) {
    let oct = this.state.octave;
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
        this.state.synth.triggerRelease();
    }
  }

  render() {
    return(
      <div className="keyboard">
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>C</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>C#</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>D</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>D#</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>E</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>F</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>F#</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>G</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>G#</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>A</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>A#</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>B</button>
        </div>
        <div className="key-wrapper">
          <button className="key" onKeyUp={this.stopNote} onKeyDown={this.playNote}>C</button>
        </div>
      </div>
    )
  }
}

export default App;