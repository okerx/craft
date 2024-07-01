import React from 'react';
import { useEditor, useNode } from '@craftjs/core';
import { WithCraft } from '../types.ts';
import { BaseButton, BaseButtonProps } from '../base/button';
import { ColorInput, NumberInput, Stack, Switch, TextInput } from '@mantine/core';

export const ButtonBlock: WithCraft<React.FC<BaseButtonProps>, BaseButtonProps> = (props) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode();
  const { isSelected } = useEditor((state) => ({ isSelected: state.events.selected.has(id) }));

  return <BaseButton ref={(ref) => ref && connect(drag(ref))} {...props} selected={isSelected} />;
};

const ButtonBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as BaseButtonProps,
  }));

  return (
    <Stack>
      <TextInput
        label="Button text"
        value={props.text}
        onChange={(e) => {
          setProp((props: BaseButtonProps) => (props.text = e.target.value));
        }}
      />
      <Switch
        label="Full width"
        checked={props.fullWidth}
        onChange={(value) => {
          setProp((props: BaseButtonProps) => (props.fullWidth = value.target.checked));
        }}
      />
      <NumberInput
        label="Border radius"
        value={props.borderRadius}
        suffix="px"
        onChange={(e) => {
          setProp((props: BaseButtonProps) => (props.borderRadius = `${e}px`));
        }}
      />
      <ColorInput
        label="Border color"
        value={props.borderColor}
        onChange={(value) => {
          setProp((props: BaseButtonProps) => (props.borderColor = value));
        }}
      />
      <ColorInput
        label="Background color"
        value={props.backgroundColor}
        onChange={(value) => {
          setProp((props: BaseButtonProps) => (props.backgroundColor = value));
        }}
      />
    </Stack>
  );
};

ButtonBlock.craft = {
  props: {
    text: 'Button',
    children: 'Button',
    fullWidth: false,
    borderRadius: '0px',
    borderColor: '#000000',
    backgroundColor: '#FFFFFF',
  },
  related: {
    settings: ButtonBlockSettings,
  },
};
