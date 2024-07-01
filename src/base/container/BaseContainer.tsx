import React, { forwardRef } from 'react';
import classes from './BaseContainer.module.scss';

export interface BaseContainerProps {
  className?: string;
  style?: React.CSSProperties;
  children?: React.ReactNode;
  selected?: boolean;
  direction?: React.CSSProperties['flexDirection'];
  spacing?: string;
  padding?: string;
  backgroundColor?: string;
  fullWidth?: boolean;
  alignItems?: React.CSSProperties['alignItems'];
  justifyContent?: React.CSSProperties['justifyContent'];
}

export const BaseContainer = forwardRef<HTMLDivElement, BaseContainerProps>(
  (
    { selected, direction, spacing, alignItems, fullWidth, justifyContent, backgroundColor, padding, ...props },
    ref,
  ) => {
    const defaultClassNames = [classes.container, props.className].join(' ');
    const className = selected ? [defaultClassNames, classes.selected].join(' ') : defaultClassNames;

    return (
      <div
        ref={ref}
        {...props}
        className={className}
        style={{
          padding,
          backgroundColor,
          alignItems,
          justifyContent,
          width: fullWidth ? '100%' : 'auto',
          flexDirection: direction,
          gap: spacing,
          ...props.style,
        }}
      />
    );
  },
);
