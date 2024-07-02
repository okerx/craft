import React, { forwardRef } from 'react';
import classes from './BaseInput.module.scss';

export type BaseInputProps = {
  value?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
  placeholder?: string;
  icon?: React.ReactNode | string;
  borderRadius?: string;
  backgroundColor?: string;
  borderColor?: string;
  fullWidth?: boolean;
  selected?: boolean;
  inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
} & React.HTMLProps<HTMLDivElement>;

export const BaseInput = forwardRef<HTMLDivElement, BaseInputProps>(
  (
    {
      selected,
      borderRadius,
      borderColor,
      fullWidth,
      backgroundColor,
      placeholder,
      icon,
      value,
      onChange,
      inputProps,
      ...props
    },
    ref,
  ) => {
    const defaultClassNames = [classes.container, props.className || ''];
    const className = selected ? [...defaultClassNames, classes.selected].join(' ') : defaultClassNames.join(' ');
    return (
      <div
        ref={ref}
        className={className}
        style={{ borderRadius, borderColor, backgroundColor, width: fullWidth ? '100%' : 'auto', ...props.style }}
        {...props}
      >
        {icon && <span className={classes.icon}>{icon}</span>}
        <input className={classes.input} {...inputProps} placeholder={placeholder} value={value} onChange={onChange} />
      </div>
    );
  },
);

BaseInput.displayName = 'BaseInput';
