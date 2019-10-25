import React, { Component } from 'react';

import './item-status-filter.css';

export default class ItemStatusFilter extends Component {
  state = {
    filter: 'all'
  }

  onFilterChange = (event) => {
    const { setStatusFilter } = this.props;
    const status = event.target.innerText.toLowerCase();

    setStatusFilter(status);

    //===CHANGE BUTTON CLASS===\\
    for (const status in this.refs) {
      if (this.refs.hasOwnProperty(status)) {
        this.refs[status].className = 'btn btn-outline-secondary';
      }
    }
    
    event.target.className = 'btn btn-info';
  }

  render() {

    return(
      <div className="btn-group">
        <button type="button"
                className="btn btn-info"
                ref='all'
                onClick={ this.onFilterChange }>All</button>
        <button type="button"
                className="btn btn-outline-secondary"
                ref="active"
                onClick={ this.onFilterChange }>Active</button>
        <button type="button"
                className="btn btn-outline-secondary"
                ref="done"
                onClick={ this.onFilterChange }>Done</button>
    </div>
    );
  }

}