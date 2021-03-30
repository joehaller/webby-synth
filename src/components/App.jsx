import React from 'react';
import * as Tone from "tone";
import Keyboard from './Keyboard.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
          oscillator : {
            type : 'triangle'
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
  }

  render() {
    return (
      <Keyboard octave={this.state.octave} options={this.state.options} />
    )
  }
}

export default App;