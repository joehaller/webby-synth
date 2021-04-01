import React from 'react';
import Select from 'react-select';


const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? 'red' : 'blue',
      color: 'grey',
      cursor: isDisabled ? 'not-allowed' : 'default',

    };
  },

};

const options = [
  {value: 'sine', label: 'sine'},
  {value: 'square', label: 'square'},
  {value: 'triangle', label: 'triangle'},
  {value: 'sawtooth', label: 'sawtooth'}
];

class WaveSelect extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      selected: null
    }
  }

  handleChange(selected) {
    this.setState({
      selected: selected
    }, () => this.props.change(selected))
  }


  render() {
    let { selected } = this.state;
    return (
      <Select
        noOptionsMessage={true}
        // styles={colourStyles}
        placeholder={'sine'}
        isSearchable={false}
        value={selected}
        onChange={this.handleChange.bind(this)}
        options={options}
      />
    )
  }
}

export default WaveSelect;