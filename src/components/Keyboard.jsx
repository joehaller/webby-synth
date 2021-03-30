import React from 'react';
import * as Tone from "tone";
import Keys from './Keys.jsx';
import OctaveSelect from './OctaveSelect.jsx';


class Keyboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      synth: null,
      now: Tone.now(),
      poly: false,
      notes: ['C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#', 'A', 'A#', 'B', 'C']

    }
    this.playNote = this.playNote.bind(this);
    this.stopNote = this.stopNote.bind(this);
  }

  componentDidMount() {
    this.setState({
      synth: new Tone.Synth(this.props.options).toDestination()
    })
    document.addEventListener('keydown', this.playNote);
    document.addEventListener('keyup', this.stopNote);
  }




  playNote(e) {
    let oct = this.props.octave;
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
        <div>
          <span>octave</span>
          <OctaveSelect change={this.props.octaveChange}/>

        </div>
        <React.Fragment>
          {this.state.notes.map((notes, i) => {
            if (notes[i] === '#') {
              return (<Keys sharp={true} stop={this.stopNote} key={i} play={this.playNote} note={notes} />)
            }
            return (<Keys sharp={false} stop={this.stopNote} key={i} play={this.playNote} note={notes} />)
          })}
        </React.Fragment>

      </div>
    )
  }
}

export default Keyboard;