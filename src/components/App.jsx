import React from 'react';
import * as Tone from "tone";
import Keyboard from './Keyboard.jsx';
import axios from 'axios';
import Sampler from './Sampler.jsx';


class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      octave: 3,
      poly: false,
      searchText: '',
      soundLib: [],
      sample: "https://freesound.org/data/previews/524/524528_11630708-lq.mp3",
      currentSound: null,
      sampler: null,
      now: Tone.now(),
      favs: []
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
        <div className="top">
          <div className="finderLabel">find sounds</div>
          <div className="finder">
            <form onSubmit={this.handleSubmit}>
              <input onChange={this.handleSearchText} value={this.state.searchText} className="input" type='text' placeholder="search for a sound" />
              <input type="submit" value="Submit" />
            </form>
          </div>
          <div className="soundLabel">sounds</div>
          <div className="soundz">
          {this.state.soundLib.map((sound, i) => {
            return <div onClick={() => this.handleSoundClick(sound.id)} className="sound" key={i}>{sound.name}</div>
          })}
          </div>
          <br></br>
          <div className="currSound">
            <div>current sound: {this.state.currentSound ? this.state.currentSound : "Piano113.mp3"}</div>
          </div>
          <br></br>
          <div className="playSounds">
            <button onClick={this.playSample}>play</button>
            <button onClick={this.stopSample}>stop</button>
          </div>
        </div>
        <div className="keysContainer">
          <Keyboard currSample={this.state.sample} octaveChange={this.changeOctave.bind(this)} octave={this.state.octave} options={this.state.options} />
        </div>
      </div>
    )
  }
}

export default App;