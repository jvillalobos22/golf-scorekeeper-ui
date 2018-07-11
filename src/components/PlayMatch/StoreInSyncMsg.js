import React from 'react';
import { connect } from 'react-redux';

import { WarningNotification } from '../Notification/Notification';

const StoreInSyncMsg = ({ storeInSync }) => {
  return (
    !storeInSync && (
      <WarningNotification>
        Score's have not been saved yet. Make sure to click&nbsp;
        <strong>Save Hole</strong> to save changes to the database.
      </WarningNotification>
    )
  );
};

const mapStateToProps = state => {
  return {
    storeInSync: state.playMatchState.storeInSync
  };
};

export default connect(
  mapStateToProps,
  null
)(StoreInSyncMsg);
