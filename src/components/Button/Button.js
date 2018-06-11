import React from 'react';
import './Button.css';

const Button = ({ children, onClick, className }) => {
  const getOnClick = () => {
    if (onClick) {
      return onClick
    } else {
      return () => {}
    }
  }

  const getButtonClass = () => {
    return className ? `button ${className}` : 'button';
  }
  
  return (
    <button onClick={getOnClick()} type="button" className={getButtonClass()}>{children}</button> 
  )
}

export default Button;