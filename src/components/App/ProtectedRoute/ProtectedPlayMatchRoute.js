import React from 'react';
import { Route } from 'react-router-dom';
import PlayMatch from '../../PlayMatch/PlayMatch';

const ProtectedPlayMatchRoute = () => (
  <Route
    path="/play/:matchId/hole/:holeNumber"
    render={({ match }) => {
      return (
        <PlayMatch
          matchId={match.params.matchId}
          holeNumber={match.params.holeNumber}
        />
      );
    }}
  />
);

export default ProtectedPlayMatchRoute;
