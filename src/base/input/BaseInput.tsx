import React, { forwardRef } from 'react';
import classes from './BaseInput.module.scss';

export type BaseInputProps = {
  icon?: React.ReactNode | string;
  borderRadius?: string;
  backgroundColor?: string;
  borderColor?: string;
  fullWidth?: boolean;
  selected?: boolean;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const BaseInput = forwardRef<HTMLInputElement, BaseInputProps>(
  ({ selected, borderRadius, borderColor, fullWidth, backgroundColor, icon, ...props }, ref) => {
    const defaultClassNames = [classes.container, props.className || ''];
    const className = selected ? [...defaultClassNames, classes.selected].join(' ') : defaultClassNames.join(' ');
    return (
      <div
        ref={ref}
        className={className}
        style={{ borderRadius, borderColor, backgroundColor, width: fullWidth ? '100%' : 'auto', ...props.style }}
      >
        {icon && <span className={classes.icon}>{icon}</span>}
        <input className={classes.input} {...props} />
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';
