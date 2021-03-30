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
            attack : 0.005,
            decay : 0.1,
            sustain : 0.9,
            release : .8
          }
        },
      now: Tone.now()
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
    switch (e.key) {
      case "a":
        return this.state.synth.triggerAttack(`C4`, this.state.now);
      case "w":
        return this.state.synth.triggerAttack(`C#4`, this.state.now);
      case "s":
        return this.state.synth.triggerAttack(`D4`, this.state.now);
      case "e":
        return this.state.synth.triggerAttack(`D#4`, this.state.now);
      case "d":
        return this.state.synth.triggerAttack(`E4`, this.state.now);
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
      </div>
    )
  }
}

export default App;