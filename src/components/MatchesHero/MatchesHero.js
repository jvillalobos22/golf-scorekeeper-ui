import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import OverallStats from '../OverallStats/OverallStats';
import './MatchesHero.css';

const MatchesHero = () => {
  return (
    <div className="matches_hero">
      <div className="pg_width">
        <OverallStats />
        <div className="hero_quote">
          <p>
            <FontAwesomeIcon icon="quote-left" />The harder I practice, the
            luckier I get.<FontAwesomeIcon icon="quote-right" />
          </p>
          <span>- Arnold Palmer</span>
        </div>
      </div>
    </div>
  );
};

export default MatchesHero;
