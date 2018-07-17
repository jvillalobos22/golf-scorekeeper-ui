import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { getGreenInReg } from '../../../../helpers/scoreCalculations';

const AccuracyPerformance = ({ par, putts, score, teeDirection }) => {
  const getTeeDirectionIcon = teeDirection => {
    if (teeDirection === 'CENTER') {
      return (
        <div className="fairway_hit">
          <FontAwesomeIcon icon="check-circle" />
          <span>Accurate</span>
        </div>
      );
    } else if (teeDirection === 'LEFT') {
      return (
        <div className="fairway_miss">
          <FontAwesomeIcon icon="arrow-left" />
          <span>Miss Left</span>
        </div>
      );
    } else {
      return (
        <div className="fairway_miss">
          <FontAwesomeIcon icon="arrow-right" />
          <span>Miss Right</span>
        </div>
      );
    }
  };

  return (
    <div className="accuracy_performance">
      {par !== 3 && (
        <h3 className="tee_direction">
          Fairway:{' '}
          <span className="tee_direction_icon">
            {getTeeDirectionIcon(teeDirection)}
          </span>
        </h3>
      )}
      <h3 className="gir">
        GIR:
        <span className="gir_icon">
          {getGreenInReg(par, putts, score) ? (
            <div className="fairway_hit">
              <FontAwesomeIcon icon="check-circle" />
              <span>Hit</span>
            </div>
          ) : (
            <div className="fairway_miss">
              <FontAwesomeIcon icon="times" />
              <span>
                {par === 3
                  ? ` ${
                      teeDirection === 'CENTER'
                        ? 'OVERSHOT GREEN'
                        : `Missed ${teeDirection}`
                    }`
                  : 'Missed'}
              </span>
            </div>
          )}
        </span>
      </h3>
    </div>
  );
};

export default AccuracyPerformance;
