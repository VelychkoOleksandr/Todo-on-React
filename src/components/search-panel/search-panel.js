import React, { Component } from 'react';

import './search-panel.css';

export default class SearchPanel extends Component {
  state = {
    searchPanelText: ''
  }

  onSearchPanelTextChange = (event) => {
    const { setSearchText } = this.props;
    const searchText = event.target.value;
    this.setState({
      searchPanelText: event.target.value
    });

    setSearchText(searchText);
  }
  
  render() {
    return (
      <input type="text"
                className="form-control search-input"
                placeholder="type to search"
                onChange = { this.onSearchPanelTextChange }
                value = { this.state.searchPanelText } 
                />
    );
  }
}