import React, { forwardRef } from 'react';
import classes from './BaseButton.module.scss';

export interface BaseButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  selected?: boolean;
  text?: string;
  borderRadius?: string;
  borderColor?: string;
  backgroundColor?: string;
  fullWidth?: boolean;
}

export const BaseButton = forwardRef<HTMLButtonElement, BaseButtonProps>(
  ({ selected, borderRadius, borderColor, fullWidth, backgroundColor, text, ...props }, ref) => {
    const defaultClassNames = [classes.button, props.className || ''];
    const className = selected ? [...defaultClassNames, classes.selected].join(' ') : defaultClassNames.join(' ');
    return (
      <button
        ref={ref}
        {...props}
        className={className}
        style={{ borderRadius, borderColor, backgroundColor, width: fullWidth ? '100%' : 'auto', ...props.style }}
      >
        {text}
      </button>
    );
  },
);
