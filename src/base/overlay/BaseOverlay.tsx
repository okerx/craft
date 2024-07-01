import React, { forwardRef } from 'react';
import { hexToRgba } from '../../utils';
import classes from './BaseOverlay.module.scss';

export interface BaseOverlayProps extends React.HTMLProps<HTMLDivElement> {
  backgroundColor: string;
  backgroundOpacity: number;
  selected?: boolean;
}

export const BaseOverlay = forwardRef<HTMLDivElement, BaseOverlayProps>(
  ({ selected, backgroundColor, backgroundOpacity, ...props }, ref) => {
    const bgColors = hexToRgba(backgroundColor, backgroundOpacity);
    const defaultClassNames = [classes.overlay, props.className || ''];
    const className = selected ? [...defaultClassNames, classes.selected].join(' ') : defaultClassNames.join(' ');
    return (
      <div ref={ref} {...props} className={className} style={{ backgroundColor: bgColors, ...props.style }}>
        {props.children}
      </div>
    );
  },
);

BaseOverlay.displayName = 'BaseOverlay';
