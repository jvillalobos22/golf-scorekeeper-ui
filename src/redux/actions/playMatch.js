import {
  STORE_DB_SYNC,
  PATCH_SCORE_UPDATE,
  PATCH_SCORE_UPDATE_SUCCESS,
  PATCH_SCORE_UPDATE_ERROR,
  PATCH_SCORE_UPDATE_ERROR_CLEAR,
  PATCH_SCORE_UPDATE_SUCCESS_CLEAR
} from './actionTypes';

const doSyncUpdate = sync => ({
  type: STORE_DB_SYNC,
  sync
});

const doScoreUpdate = (matchId, newScores) => ({
  type: PATCH_SCORE_UPDATE,
  payload: {
    matchId,
    newScores
  }
});

const doPatchScoreUpdateSuccess = match => ({
  type: PATCH_SCORE_UPDATE_SUCCESS,
  match
});

const doPatchScoreUpdateError = error => ({
  type: PATCH_SCORE_UPDATE_ERROR,
  error
});

const doClearError = () => ({
  type: PATCH_SCORE_UPDATE_ERROR_CLEAR
});

const doPatchScoreUpdateSuccessClear = () => ({
  type: PATCH_SCORE_UPDATE_SUCCESS_CLEAR
});

export {
  doSyncUpdate,
  doScoreUpdate,
  doPatchScoreUpdateSuccess,
  doPatchScoreUpdateError,
  doClearError,
  doPatchScoreUpdateSuccessClear
};
