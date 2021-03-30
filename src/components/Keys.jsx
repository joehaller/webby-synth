import React from 'react';
import * as Tone from "tone";


class Keys extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pressed: false
    }
    this.handlePress = this.handlePress.bind(this);

  }

  handlePress() {
    this.setState({
      pressed: !this.state.pressed
    })
  }

  keyDown(e) {
    this.handlePress();
    this.props.play(e);
  }
  keyUp(e) {
    this.handlePress();
    this.props.stop(e);
  }

  render() {
    if (this.state.pressed) {
      return (
        <div className="key-wrapper">
          <button className="key pressed" onKeyUp={this.keyUp.bind(this)} onKeyDown={this.keyDown.bind(this)}>{this.props.note}</button>
        </div>
      )
    } else {
      return (
       <div className="key-wrapper">
         <button className="key" onKeyUp={this.keyUp.bind(this)} onKeyDown={this.keyDown.bind(this)}>{this.props.note}</button>
       </div>
      )
    }
  }
}

export default Keys;