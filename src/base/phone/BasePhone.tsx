import React, { forwardRef } from 'react';
import { BaseInput, BaseInputProps } from '../input';

export type BasePhoneProps = BaseInputProps & {
  height?: string;
  borderRadius?: string;
  borderColor?: string;
  backgroundColor?: string;
  textColor?: string;
  fontSize?: string;
  flagHeight?: string;
  flagWidth?: string;
  selectedDropdownItemBackgroundColor?: string;
  countrySelectorBackgroundColorHover?: string;
};

export const BasePhone = forwardRef<HTMLDivElement, BasePhoneProps>(({ ...props }, ref) => {
  return <BaseInput ref={ref} {...props} icon="📞" type="tel" style={{ ...props.style } as React.CSSProperties} />;
});

BasePhone.displayName = 'BasePhone';
