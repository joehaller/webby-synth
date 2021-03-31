import React from 'react';
import * as Tone from "tone";
import Keyboard from './Keyboard.jsx';
import axios from 'axios';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      octave: 3,
      poly: false,
      searchText: '',
      soundLib: [],
      sample: "https://freesound.org/data/previews/110/110011_1537422-hq.mp3",
      currentSound: null,
      sampler: null,
      now: Tone.now()
    }
    this.handleSearchText = this.handleSearchText.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSoundClick = this.handleSoundClick.bind(this);
    this.playSample = this.playSample.bind(this);
    this.stopSample = this.stopSample.bind(this);
  }

  componentDidMount() {
    this.setState({
      sampler: new Tone.Player(this.state.sample).toDestination()
    })
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.state.sample !== prevState.sample) {
      this.setState({
        sampler: new Tone.Player(this.state.sample).toDestination()
      })
    }
  }


  changeOctave(selected) {
    this.setState({
      octave: selected.value
    })
  }

  handleSearch(text) {
    axios.get('/sound', {params: {query: text}})
      .then((results) => {
        this.setState({
          soundLib: results.data
        })
      });
  }

  handleSearchText(e) {
    this.setState({
      searchText: e.target.value
    })
  }

  handleSubmit(e) {
    e.preventDefault()
    this.handleSearch(this.state.searchText);
  }

  handleSoundClick(id) {
    axios.get('/sample', {params: {query: id}})
      .then(results => {
        this.setState({
          sample: results.data.previews['preview-lq-mp3'],
          currentSound: results.data.name
        })
      })

 }

 playSample() {
   Tone.loaded().then(() => {
     this.state.sampler.start(this.state.now);
   });
 }

 stopSample(e) {
   this.state.sampler.stop();
 }

  render() {
    return (
      <div className="main">
        <div>find soundz
          <br></br>
          <form onSubmit={this.handleSubmit}>
            <input onChange={this.handleSearchText} value={this.state.searchText} type='text' placeholder="search for a sound" />
            <input type="submit" value="Submit" />
          </form>
        </div>
        <div>soundz</div>
        <div className="soundz">
         {this.state.soundLib.map((sound, i) => {
           return <div onClick={() => this.handleSoundClick(sound.id)} className="sound" key={i}>{sound.name}</div>
         })}
        </div>
        <div>samples
          <div>{this.state.currentSound ? this.state.currentSound : 'meow'}</div>
        </div>
        <div className="sampler">
          <button onClick={this.playSample}>play</button>
          <button onClick={this.stopSample}>stop</button>
        </div>
        <div className="keysContainer">
          <Keyboard octaveChange={this.changeOctave.bind(this)} octave={this.state.octave} options={this.state.options} />
        </div>
      </div>
    )
  }
}

export default App;