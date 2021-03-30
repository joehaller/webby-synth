import React from 'react';
import * as Tone from "tone";
import Keyboard from './Keyboard.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: {
          oscillator : {
            type : 'sawtooth'
          },
          envelope : {
            attack : 0.002,
            decay : 0.1,
            sustain : 0.5,
            release : .6
          }
        },
      octave: 3,
      poly: false
    }
  }

  changeOctave(selected) {
    this.setState({
      octave: selected.value
    })
  }

  render() {
    return (
      <Keyboard  octaveChange={this.changeOctave.bind(this)} octave={this.state.octave} options={this.state.options} />
    )
  }
}

export default App;