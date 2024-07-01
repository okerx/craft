import React, { forwardRef } from 'react';
import { PhoneInputRefType } from 'react-international-phone';
import 'react-international-phone/style.css';
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

export const BasePhone = forwardRef<PhoneInputRefType, BasePhoneProps>(({ ...props }, ref) => {
  return (
    <BaseInput
      ref={ref}
      {...props}
      icon="📞"
      type="tel"
      style={
        {
          // '--react-international-phone-height': height,
          // '--react-international-phone-border-radius': borderRadius,
          // '--react-international-phone-border-color': borderColor,
          // '--react-international-phone-background-color': backgroundColor,
          // '--react-international-phone-text-color': textColor,
          // '--react-international-phone-font-size': fontSize,
          // '--react-international-phone-flag-height': flagHeight,
          // '--react-international-phone-flag-width': flagWidth,
          // '--react-international-phone-selected-dropdown-item-background-color': selectedDropdownItemBackgroundColor,
          // '--react-international-phone-country-selector-background-color-hover': countrySelectorBackgroundColorHover,
          ...props.style,
        } as React.CSSProperties
      }
      // inputStyle={{ flex: 1 }}
    />
  );
});

BasePhone.displayName = 'BasePhone';
