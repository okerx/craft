import React, { forwardRef } from 'react';
import classes from './BaseImage.module.scss';

export interface BaseImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  selected?: boolean;
  borderRadius?: string;
  borderColor?: string;
  fullWidth?: boolean;
}

export const BaseImage = forwardRef<HTMLImageElement, BaseImageProps>(
  ({ selected, borderRadius, borderColor, fullWidth, ...props }, ref) => {
    const defaultClassNames = [classes.container, props.className || ''];
    const className = selected ? [...defaultClassNames, classes.selected].join(' ') : defaultClassNames.join(' ');
    return (
      <picture
        className={className}
        style={{ borderRadius, borderColor, width: fullWidth ? '100%' : 'auto', ...props.style }}
      >
        <img ref={ref} {...props} alt={props.alt} width="100%" height="100%" />
      </picture>
    );
  },
);
