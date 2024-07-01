import { forwardRef, HTMLProps } from 'react';
import classes from './BaseText.module.scss';

export type BaseTextProps = HTMLProps<HTMLDivElement> & {
  text: string;
  fontSize?: string;
  fontWeight?: string;
  selected?: boolean;
};

export const BaseText = forwardRef<HTMLDivElement, BaseTextProps>(
  ({ selected, text, fontSize, fontWeight, ...props }, ref) => {
    const className = selected ? [props.className, classes.selected].join(' ') : props.className;
    return (
      <div ref={ref} {...props} style={{ fontSize, fontWeight, ...props.style }} className={className}>
        {text}
      </div>
    );
  },
);

BaseText.displayName = 'BaseText';
