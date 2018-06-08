import React, {Component} from 'react';
import MatchCard from '../MatchCard/MatchCard';
import './Matches.css';

class Matches extends Component {
  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { matches } = this.props;
    return(
      <div className="pg_width">
        <div className="matches_list flex_container">
          {matches.map(match =>
            <MatchCard key={match.id} match={match} className="flex_card" />
          )}
        </div>
      </div>
    )
  }
}

export default Matches;