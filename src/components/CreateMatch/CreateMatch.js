import React, { Component } from 'react';
import { GhostButton } from '../Button/Button';
import { Link } from 'react-router-dom';

class CreateMatch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      form: ''
    };
  }

  render() {
    return (
      <div className="pg_width">
        <div>Create New Match</div>
      </div>
    );
  }
}

const CreateMatchButton = () => {
  return (
    <Link to="/new-match">
      <GhostButton>+ New Match</GhostButton>
    </Link>
  );
};

export default CreateMatch;
export { CreateMatchButton };
