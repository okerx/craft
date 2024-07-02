import { WithCraft } from '../types.ts';
import React from 'react';
import { BaseEmail, BaseEmailProps } from '../base';
import { useEditor, useNode } from '@craftjs/core';
import { ColorInput, NumberInput, Stack, Switch, TextInput } from '@mantine/core';

export const EmailBlock: WithCraft<React.FC<BaseEmailProps>, BaseEmailProps> = (props) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode();
  const { isSelected } = useEditor((state) => ({ isSelected: state.events.selected.has(id) }));

  return <BaseEmail ref={(ref) => ref && connect(drag(ref))} {...props} selected={isSelected} data-node-id={id} />;
};

export const EmailBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as BaseEmailProps,
  }));

  return (
    <Stack>
      <Switch
        label="Full width"
        checked={props.fullWidth}
        onChange={(value) => {
          setProp((props: BaseEmailProps) => (props.fullWidth = value.target.checked));
        }}
      />
      <TextInput
        label="Placeholder"
        value={props.placeholder}
        onChange={(e) => {
          setProp((props: BaseEmailProps) => (props.placeholder = e.target.value));
        }}
      />
      <ColorInput
        label="Border color"
        value={props.borderColor}
        onChange={(color) => {
          setProp((props: BaseEmailProps) => (props.borderColor = color));
        }}
      />
      <ColorInput
        label="Background color"
        value={props.backgroundColor}
        onChange={(color) => {
          setProp((props: BaseEmailProps) => (props.backgroundColor = color));
        }}
      />
      <NumberInput
        label="Border radius"
        value={props.borderRadius}
        suffix="px"
        onChange={(e) => {
          setProp((props: BaseEmailProps) => (props.borderRadius = `${e}px`));
        }}
      />
    </Stack>
  );
};

EmailBlock.craft = {
  displayName: 'Email',
  props: {
    placeholder: 'Email',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    borderColor: '#DCDCDC',
    fullWidth: false,
  },
  related: { settings: EmailBlockSettings },
};
