import React, { forwardRef } from 'react';
import { BaseInput, BaseInputProps } from '../input';

export type BaseEmailProps = Omit<BaseInputProps, 'icon'> & React.InputHTMLAttributes<HTMLInputElement>;

export const BaseEmail = forwardRef<HTMLDivElement, BaseEmailProps>(({ ...props }, ref) => {
  return <BaseInput ref={ref} {...props} icon="📧" />;
});

BaseEmail.displayName = 'BaseEmail';
