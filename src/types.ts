import React from 'react';

export type WithCraft<T, P = unknown> = T & {
  craft?: {
    displayName?: string;
    props?: P;
    related?: { settings?: React.FC; custom?: { [key: string]: unknown } };
    custom?: { isEssential?: boolean };
  };
};
