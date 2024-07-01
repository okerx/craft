import React, { forwardRef } from 'react';
import classes from './BaseModal.module.scss';

export type BaseModalProps = {
  children?: React.ReactNode;
  style?: React.CSSProperties;
  className?: string;
  spacing?: string;
  padding?: string;
  borderRadius?: string;
  borderColor?: string;
  borderWidth?: string;
  borderStyle?: string;
  backgroundColor?: string;
  alignment?: React.CSSProperties['alignItems'];
  width?: string;
  fullScreen?: boolean;
  selected?: boolean;
};

export const BaseModal = forwardRef(
  (
    {
      padding,
      borderStyle,
      borderColor,
      borderWidth,
      backgroundColor,
      borderRadius,
      spacing,
      alignment,
      width,
      fullScreen,
      selected,
      ...props
    }: BaseModalProps,
    ref: React.Ref<HTMLDivElement>,
  ) => {
    const defaultClassNames = [classes.container, props.className || ''];
    const className = selected ? [...defaultClassNames, classes.selected].join(' ') : defaultClassNames.join(' ');
    return (
      <div
        ref={ref}
        {...props}
        className={className}
        style={{
          padding,
          borderStyle,
          borderColor,
          borderWidth,
          backgroundColor,
          borderRadius,
          gap: spacing,
          alignItems: alignment,
          maxWidth: fullScreen ? 'none' : width,
          height: fullScreen ? '100%' : 'auto',
          ...props.style,
        }}
      >
        {props.children}
      </div>
    );
  },
);

BaseModal.displayName = 'BaseModal';
