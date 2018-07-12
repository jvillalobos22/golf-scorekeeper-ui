import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import { doClearError } from '../../redux/actions/playMatch';

const UpdateScoreErrorMsg = ({ updateScoreError, onClearError }) => {
  return (
    updateScoreError && (
      <div className="connection_error">
        <ErrorMessage errorMsg="There was an issue saving to the database. It may be due to a poor connection. Continue playing and try to save your scores again later. CAUTION: Refreshing your page may wipe out any scores that have not been saved." />
        <button type="button" onClick={() => onClearError()}>
          <FontAwesomeIcon icon="window-close" />
        </button>
      </div>
    )
  );
};

const mapStateToProps = state => {
  return {
    updateScoreError: state.playMatchState.updateScoreError
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearError: () => dispatch(doClearError())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateScoreErrorMsg);
