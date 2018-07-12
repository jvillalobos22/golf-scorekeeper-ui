import React from 'react';
import { connect } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SuccessNotification } from '../Notification/Notification';
import { doPatchScoreUpdateSuccessClear } from '../../redux/actions/playMatch';

const UpdateSuccessMsg = ({ updateScoreSuccess, onClearSuccessMessage }) => {
  return (
    updateScoreSuccess && (
      <SuccessNotification className="update_success">
        Score's have been successfully updated.
        <button type="button" onClick={() => onClearSuccessMessage()}>
          <FontAwesomeIcon icon="window-close" />
        </button>
      </SuccessNotification>
    )
  );
};

const mapStateToProps = state => {
  return {
    updateScoreSuccess: state.playMatchState.updateScoreSuccess
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onClearSuccessMessage: () => dispatch(doPatchScoreUpdateSuccessClear())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateSuccessMsg);
