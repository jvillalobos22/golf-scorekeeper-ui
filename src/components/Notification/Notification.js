import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './Notification.css';

const Notification = ({ children, className }) => (
  <div className={className ? `notification ${className}` : 'notification'}>
    {children}
  </div>
);

const WarningNotification = ({ className, children, ...rest }) => (
  <Notification
    className={className ? `warning ${className}` : 'warning'}
    {...rest}
  >
    <FontAwesomeIcon icon="exclamation" />&nbsp;
    {children}
  </Notification>
);

const SuccessNotification = ({ className, children, ...rest }) => (
  <Notification
    className={className ? `success ${className}` : 'success'}
    {...rest}
  >
    <FontAwesomeIcon icon="check" />&nbsp;
    {children}
  </Notification>
);

export default Notification;
export { WarningNotification, SuccessNotification };
