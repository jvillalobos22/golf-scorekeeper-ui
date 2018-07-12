import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Select from 'react-select';
import { doSyncUpdate } from '../../../redux/actions/playMatch';
import StoreInSyncMsg from '../StoreInSyncMsg';
import UpdateSuccessMsg from '../UpdateSuccessMsg';
import UpdateScoreErrorMsg from '../UpdateScoreErrorMsg';

import HoleSummary from './HoleSummary/HoleSummary';
import Button, { GhostButton, CloseButton } from '../../Button/Button';
import './PlayHole.css';

class PlayHole extends Component {
  setPar = newPar => {
    const newHole = { ...this.props.holeScore };
    newHole.par = newPar;
    this.props.updateScore(newHole);
  };

  setTeeDirection = newTeeDir => {
    const newHole = { ...this.props.holeScore };
    newHole.teeDirection = newTeeDir;
    this.props.updateScore(newHole);
  };

  scoreUpdate = newScore => {
    const newHole = { ...this.props.holeScore };
    newHole.score = newScore ? newScore.value : 0;
    this.props.updateScore(newHole);
  };

  puttsUpdate = newPutts => {
    const newHole = { ...this.props.holeScore };
    newHole.putts = newPutts ? newPutts.value : 0;
    this.props.updateScore(newHole);
  };

  mulligansUpdate = newMulligans => {
    const newHole = { ...this.props.holeScore };
    newHole.mulligans = newMulligans ? newMulligans.value : 0;
    this.props.updateScore(newHole);
  };

  handleFormSubmit = e => {
    const { storeInSync, match } = this.props;
    e.preventDefault();
    if (!storeInSync) {
      this.props.onScoreSubmit(match._id);
    }
  };

  render() {
    const { holeNumber, match, holeScore } = this.props;
    return holeScore ? (
      <div className="play_hole">
        <NavigateHolesButtons
          holeNumber={holeNumber}
          matchId={match._id}
          totalHoles={match.course.holes}
          completeMatch={() => console.log('Finished Match')}
        />
        <div className="hole_heading">
          <h1>Hole {holeNumber}</h1>
          <Link to={`/matches/${match._id}`} className="see_match_scorecard">
            <span>See Match Scorecard</span>
          </Link>
        </div>
        {holeScore.score > 0 && (
          <div>
            <HoleSummary holeScore={holeScore} />
          </div>
        )}
        <UpdateScoreErrorMsg />
        <UpdateSuccessMsg />
        <StoreInSyncMsg />
        <form className="hole_form" onSubmit={e => this.handleFormSubmit(e)}>
          <h2>Edit Hole</h2>
          <ParSelect
            setPar={par => this.setPar(par)}
            value={holeScore.par}
            className="some-class"
          />
          <TeeDirectionSelect
            setTeeDirection={dir => this.setTeeDirection(dir)}
            value={holeScore.teeDirection}
          />
          <ScoreSelect
            name="score"
            value={holeScore.score}
            onChange={this.scoreUpdate}
            par={holeScore.par}
          />
          <div className="input_field">
            <label>Number of Putts</label>
            <Select
              name="putts"
              value={holeScore.putts}
              clearable={true}
              onChange={this.puttsUpdate}
              options={[
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
                { value: 8, label: '8' },
                { value: 9, label: '9' },
                { value: 10, label: '10' }
              ]}
            />
          </div>
          <div className="input_field">
            <label>Mulligans</label>
            <Select
              name="score"
              value={holeScore.mulligans}
              clearable={true}
              onChange={this.mulligansUpdate}
              options={[
                { value: 0, label: '0' },
                { value: 1, label: '1' },
                { value: 2, label: '2' },
                { value: 3, label: '3' },
                { value: 4, label: '4' },
                { value: 5, label: '5' },
                { value: 6, label: '6' },
                { value: 7, label: '7' },
                { value: 8, label: '8' },
                { value: 9, label: '9' },
                { value: 10, label: '10' }
              ]}
            />
          </div>
          <div className="input_fields">
            <input className="button" type="submit" value="Save Hole" />
          </div>
        </form>
        <div className="edit_footer">
          <NavigateHolesButtons
            holeNumber={holeNumber}
            matchId={match._id}
            totalHoles={match.course.holes}
            completeMatch={() => console.log('Finished Match')}
          />
        </div>
      </div>
    ) : (
      <div />
    );
  }
}

const ScoreSelect = ({ name, value, onChange, par }) => {
  const getScoreOptions = (par, value) => {
    console.log(par);
    const parValue = Number(par);
    if (parValue === 3) {
      return [
        { value: 1, label: '1 - Hole In One!' },
        { value: 2, label: '2 - Birdie' },
        { value: 3, label: '3 - Par' },
        { value: 4, label: '4 - Bogey' },
        { value: 5, label: '5 - Double Bogey' },
        { value: 6, label: '6 - Triple Bogey' },
        { value: 7, label: '7 - +4 Bogey' },
        { value: 8, label: '8 - +5 Bogey' }
      ];
    } else if (parValue === 4) {
      return [
        { value: 1, label: '1 - Hole In One!' },
        { value: 2, label: '2 - Eagle' },
        { value: 3, label: '3 - Birdie' },
        { value: 4, label: '4 - Par' },
        { value: 5, label: '5 - Bogey' },
        { value: 6, label: '6 - Double Bogey' },
        { value: 7, label: '7 - Triple Bogey' },
        { value: 8, label: '8 - +4 Bogey' },
        { value: 9, label: '9 - +5 Bogey' }
      ];
    } else if (parValue === 5) {
      return [
        { value: 1, label: '1 - Hole In One!' },
        { value: 2, label: '2 - Albatross' },
        { value: 3, label: '3 - Eagle' },
        { value: 4, label: '4 - Birdie' },
        { value: 5, label: '5 - Par' },
        { value: 6, label: '6 - Bogey' },
        { value: 7, label: '7 - Double Bogey' },
        { value: 8, label: '8 - Triple Bogey' },
        { value: 9, label: '9 - +4 Bogey' },
        { value: 10, label: '10 - +5 Bogey' }
      ];
    } else {
      return [
        { value: 1, label: '1 - Hole In One!' },
        { value: 2, label: '2' },
        { value: 3, label: '3' },
        { value: 4, label: '4' },
        { value: 5, label: '5' },
        { value: 6, label: '6' },
        { value: 7, label: '7' },
        { value: 8, label: '8' },
        { value: 9, label: '9' },
        { value: 10, label: '10' }
      ];
    }
  };

  return (
    <div className="input_field">
      <label>Score</label>
      <Select
        name={name}
        value={value}
        clearable={true}
        onChange={onChange}
        options={getScoreOptions(par, value)}
      />
    </div>
  );
};

const ParSelect = ({ setPar, className, value }) => (
  <div className={className ? `par_buttons ${className}` : 'par_buttons'}>
    <label>Par</label>
    <button
      type="button"
      className={value === 3 ? 'selected' : ''}
      onClick={() => setPar(3)}
    >
      3
    </button>
    <button
      type="button"
      className={value === 4 ? 'selected' : ''}
      onClick={() => setPar(4)}
    >
      4
    </button>
    <button
      type="button"
      className={value === 5 ? 'selected' : ''}
      onClick={() => setPar(5)}
    >
      5
    </button>
  </div>
);

const TeeDirectionSelect = ({ setTeeDirection, className, value }) => (
  <div className={className ? `tee_direction ${className}` : 'tee_direction'}>
    <label>Tee Direction</label>
    <button
      type="button"
      className={value === 'LEFT' ? 'selected' : ''}
      onClick={() => setTeeDirection('LEFT')}
    >
      <span>Miss Left</span>
      <FontAwesomeIcon icon="arrow-left" />
    </button>
    <button
      type="button"
      className={value === 'CENTER' ? 'selected' : ''}
      onClick={() => setTeeDirection('CENTER')}
    >
      <span>Fairway Hit</span>
      <FontAwesomeIcon icon="arrow-up" />
    </button>
    <button
      type="button"
      className={value === 'RIGHT' ? 'selected' : ''}
      onClick={() => setTeeDirection('RIGHT')}
    >
      <span>Miss Right</span>
      <FontAwesomeIcon icon="arrow-right" />
    </button>
  </div>
);

const NavigateHolesButtons = ({
  holeNumber,
  matchId,
  totalHoles,
  completeMatch
}) => (
  <div
    className={`navigate_hole_btns ${
      Number(holeNumber) === 1 ? 'first_hole' : ''
    }`}
  >
    {holeNumber > 1 && (
      <Link to={`/play/${matchId}/hole/${Number(holeNumber) - 1}`}>
        <GhostButton>
          <FontAwesomeIcon icon="caret-left" />&nbsp;Prev Hole
        </GhostButton>
      </Link>
    )}
    {holeNumber < totalHoles ? (
      <Link to={`/play/${matchId}/hole/${Number(holeNumber) + 1}`}>
        <GhostButton>
          Next Hole&nbsp;<FontAwesomeIcon icon="caret-right" />
        </GhostButton>
      </Link>
    ) : (
      <Button onClick={completeMatch}>
        <FontAwesomeIcon icon="check" />&nbsp;Complete Match
      </Button>
    )}
  </div>
);

const mapDispatchToProps = dispatch => {
  return {
    onSyncUpdate: sync => dispatch(doSyncUpdate(sync))
  };
};

export default connect(
  // mapStateToProps,
  null,
  mapDispatchToProps
)(PlayHole);
