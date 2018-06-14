import React from "react";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import ShowMatchDetails from "../ShowMatchDetails/ShowMatchDetails";

import "./MatchDetail.css";

const MatchDetail = ({ matches, matchId }) => {
  const getThisMatch = (matches, matchId) => {
    return matches.find(match => match._id === matchId);
  };

  const thisMatchResult = getThisMatch(matches, matchId);

  return (
    <div>
      {thisMatchResult ? (
        <div className="pg_width">
          <ShowMatchDetails match={thisMatchResult} />
        </div>
      ) : (
        <div className="pg_width">
          <ErrorMessage
            errorMsg={`A match with the id ${matchId} was not found.`}
          />
        </div>
      )}
    </div>
  );
};

export default MatchDetail;
