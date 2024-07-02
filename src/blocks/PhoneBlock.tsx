import { WithCraft } from '../types.ts';
import React from 'react';
import { BasePhone, BasePhoneProps } from '../base';
import { useEditor, useNode } from '@craftjs/core';
import { ColorInput, NumberInput, Stack, Switch, TextInput } from '@mantine/core';

export const PhoneBlock: WithCraft<React.FC<BasePhoneProps>, BasePhoneProps> = (props) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode();
  const { isSelected } = useEditor((state) => ({ isSelected: state.events.selected.has(id) }));

  return <BasePhone ref={(ref) => ref && connect(drag(ref))} {...props} selected={isSelected} data-node-id={id} />;
};

export const PhoneBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as BasePhoneProps,
  }));

  return (
    <Stack>
      <Switch
        label="Full width"
        checked={props.fullWidth}
        onChange={(value) => {
          setProp((props: BasePhoneProps) => (props.fullWidth = value.target.checked));
        }}
      />
      <TextInput
        label="Placeholder"
        value={props.placeholder}
        onChange={(e) => {
          setProp((props: BasePhoneProps) => (props.placeholder = e.target.value));
        }}
      />
      <NumberInput
        label="Border radius"
        value={props.borderRadius}
        suffix="px"
        onChange={(e) => {
          setProp((props: BasePhoneProps) => (props.borderRadius = `${e}px`));
        }}
      />
      <ColorInput
        label="Border color"
        value={props.borderColor}
        onChange={(color) => {
          setProp((props: BasePhoneProps) => (props.borderColor = color));
        }}
      />
      <ColorInput
        label="Background color"
        value={props.backgroundColor}
        onChange={(color) => {
          setProp((props: BasePhoneProps) => (props.backgroundColor = color));
        }}
      />
    </Stack>
  );
};

PhoneBlock.craft = {
  displayName: 'Phone',
  props: {
    placeholder: 'Phone',
    borderRadius: '4px',
    backgroundColor: '#ffffff',
    borderColor: '#DCDCDC',
    fullWidth: false,
  },
  related: { settings: PhoneBlockSettings },
};
