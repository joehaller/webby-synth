// You can try Basic, White, Silver or HighContrast skins
import React, {useState} from 'react';
import { White } from 'react-dial-knob';

// const update = () => {
//   props.change(this.value);
// }

const DialKnob = (props) => {
  const [value, setValue] = React.useState(1)
  props.change(value);
  return (<White
        diameter={45}
        min={props.start}
        max={props.max}
        step={1}
        value={value}
        theme={{
            donutColor: 'plum'
        }}
        style={{
          position: 'relative',
          margin: '100px auto',
          width: '30px'
        }}
        onValueChange={setValue}
        ariaLabelledBy={'knob'}
        spaceMaxFromZero={true}
    >
        <label className={'knob'} style={{
          textAlign: 'center',
          width: '30px',
          display: 'block',
          padding: '10px 0'
        }}>{props.knob}</label>
    </White>)
}

export default DialKnob;