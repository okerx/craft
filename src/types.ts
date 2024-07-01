import React from 'react';

export type WithCraft<T, P = unknown> = T & {
  craft?: { props?: P; related?: { settings?: React.FC; custom?: { [key: string]: unknown } } };
};
