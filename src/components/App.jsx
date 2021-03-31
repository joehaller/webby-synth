import React from 'react';
import * as Tone from "tone";
import Keyboard from './Keyboard.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // options: {
      //     oscillator : {
      //       type : 'sine'
      //     },
      //     envelope : {
      //       attack : 0.002,
      //       decay : 0.1,
      //       sustain : 0.5,
      //       release : .6
      //     }
      //   },
      octave: 3,
      poly: false
    }
  }


  changeOctave(selected) {
    this.setState({
      octave: selected.value
    })
  }
  //WHAT'S GOING ON HERE????
  // changeWaveForm(waveform) {
  //   console.log(waveform.value);
  //   let wave = this.state.options;
  //   wave['oscillator']['type'] = waveform.value;
  //   console.log(wave);
  //   this.setState({
  //     options: wave
  //   })
  // }

  render() {
    return (
      <Keyboard octaveChange={this.changeOctave.bind(this)} octave={this.state.octave} options={this.state.options} />
    )
  }
}

export default App;