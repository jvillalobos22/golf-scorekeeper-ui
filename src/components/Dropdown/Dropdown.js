import React, { Component } from 'react';
import uuidv4 from 'uuid/v4';

class Dropdown extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false
    };

    this.toggleOpenClose = this.toggleOpenClose.bind(this);
  }

  toggleOpenClose = () => {
    this.setState((prevState, props) => {
      return { isOpen: !prevState.isOpen };
    });
  };

  render() {
    const { isOpen } = this.state;
    const { children, className, listArray } = this.props;
    return (
      <div
        className={`dropdown ${className ? className : ''}`}
        onMouseLeave={this.closeDropdown}
      >
        <button type="button" onClick={this.toggleOpenClose}>
          {children}
        </button>
        {isOpen && (
          <div className="dropdown_items">
            <ul>
              {listArray.map(link => {
                return (
                  <li key={uuidv4()}>
                    <button onClick={link.onClick}>{link.label}</button>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </div>
    );
  }
}

export default Dropdown;
