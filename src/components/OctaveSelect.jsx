import React from 'react';
import Select from 'react-select';


const colourStyles = {
  control: styles => ({ ...styles, backgroundColor: 'white' }),
  option: (styles, { data, isDisabled, isFocused, isSelected }) => {
    return {
      ...styles,
      backgroundColor: isDisabled ? 'red' : 'blue',
      color: '#FFF',
      cursor: isDisabled ? 'not-allowed' : 'default',

    };
  },

};

const options = [
  {value: 1, label: '1'},
  {value: 2, label: '2'},
  {value: 3, label: '3'},
  {value: 4, label: '4'},
  {value: 5, label: '5'},
  {value: 6, label: '6'},
  {value: 7, label: '7'},
  {value: 8, label: '8'},
];

class OctaveSelect extends React.Component {
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
        placeholder={'3'}
        isSearchable={false}
        value={selected}
        onChange={this.handleChange.bind(this)}
        options={options}
      />
    )
  }
}

export default OctaveSelect;