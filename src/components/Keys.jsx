import React from 'react';
import * as Tone from "tone";


const Keys = (props) => {
  return (
    <div className="key-wrapper">
      <button className="key" onKeyUp={props.stop} onKeyDown={props.play}>{props.note}</button>
    </div>
  )
}

export default Keys;