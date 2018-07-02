import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './ErrorMessage.css';

const ErrorMessage = ({ errorMsg }) => {
  return <div className="error_message">{errorMsg}</div>;
};

const ClosableErrorMessage = ({
  className,
  errorMsg,
  onClearError,
  ...rest
}) => {
  return (
    <div className={`closable_error ${className ? className : ''}`}>
      <ErrorMessage errorMsg={errorMsg} {...rest} />
      <button type="button" onClick={onClearError}>
        <FontAwesomeIcon icon="window-close" />
      </button>
    </div>
  );
};

export default ErrorMessage;
export { ClosableErrorMessage };
