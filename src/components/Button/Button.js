import React from 'react';
import './Button.css';

const Button = ({ children, onClick, className }) => {
  const getOnClick = () => {
    if (onClick) {
      return onClick;
    } else {
      return () => {};
    }
  };

  const getButtonClass = () => {
    return className ? `button ${className}` : 'button';
  };

  return (
    <button onClick={getOnClick()} type="button" className={getButtonClass()}>
      {children}
    </button>
  );
};

const GhostButton = ({ className, ...rest }) => {
  const derivedClass = className ? `ghost_button ${className}` : 'ghost_button';
  return <Button className={derivedClass} {...rest} />;
};

const InlineButton = ({ className, ...rest }) => {
  const derivedClass = className
    ? `inline_button ${className}`
    : 'inline_button';
  return <Button className={derivedClass} {...rest} />;
};

const SmallButton = ({ className, ...rest }) => {
  const derivedClass = className ? `small_button ${className}` : 'small_button';
  return <Button className={derivedClass} {...rest} />;
};

const CloseButton = ({ className, ...rest }) => {
  const derivedClass = className ? `small_button ${className}` : 'close_button';
  return <Button className={derivedClass} {...rest} />;
};

export default Button;
export { GhostButton, InlineButton, SmallButton, CloseButton };
