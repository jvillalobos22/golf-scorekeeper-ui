import React from 'react';
import './ErrorMessage.css';

const ErrorMessage = ({errorMsg}) => {
  return (
    <div className="error_message">
      {errorMsg}
    </div>
  )
}

export default ErrorMessage;