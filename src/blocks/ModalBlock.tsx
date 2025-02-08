import React from 'react';
import { useEditor, useNode } from '@craftjs/core';
import { WithCraft } from '../types.ts';
import { Stack, ColorInput, NumberInput, Select, SegmentedControl, Text, Switch } from '@mantine/core';
import { BaseModal, BaseModalProps } from '../base';

export const ModalBlock: WithCraft<React.FC<BaseModalProps>, BaseModalProps> = (props) => {
  const {
    id,
    connectors: { connect },
  } = useNode();
  const { isSelected } = useEditor((state) => ({ isSelected: state.events.selected.has(id) }));

  const minHeight = props.children ? undefined : 30;

  return (
    <BaseModal
      style={{ minHeight }}
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      {...props}
      selected={isSelected}
      data-node-id={id}
    />
  );
};

export const ModalBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as BaseModalProps,
  }));

  return (
    <Stack>
      <NumberInput
        label="Width"
        value={props.width ? parseInt(props.width) : 0}
        suffix="px"
        onChange={(e) => {
          setProp((props: BaseModalProps) => (props.width = `${e}px`));
        }}
      />
      <Switch
        label="Full screen"
        checked={props.fullScreen}
        onChange={(value) => {
          setProp((props: BaseModalProps) => (props.fullScreen = value.target.checked));
        }}
      />
      <Stack gap="xs">
        <Text>Alignment</Text>
        <SegmentedControl
          data={[
            { value: 'flex-start', label: 'Start' },
            { value: 'center', label: 'Center' },
            { value: 'flex-end', label: 'End' },
          ]}
          value={props.alignment}
          onChange={(value) => {
            setProp((props: BaseModalProps) => (props.alignment = value || undefined));
          }}
        />
      </Stack>
      <NumberInput
        label="Padding"
        value={props.padding}
        suffix="px"
        onChange={(e) => {
          setProp((props: BaseModalProps) => (props.padding = `${e}px`));
        }}
      />
      <NumberInput
        label="Spacing"
        value={props.spacing}
        suffix="px"
        onChange={(e) => {
          setProp((props: BaseModalProps) => (props.spacing = `${e}px`));
        }}
      />
      <ColorInput
        label="Border color"
        value={props.borderColor}
        onChange={(color) => {
          setProp((props: BaseModalProps) => (props.borderColor = color));
        }}
      />
      <ColorInput
        label="Background color"
        value={props.backgroundColor}
        onChange={(color) => {
          setProp((props: BaseModalProps) => (props.backgroundColor = color));
        }}
      />
      <NumberInput
        label="Border radius"
        value={props.borderRadius}
        suffix="px"
        min={0}
        onChange={(e) => {
          setProp((props: BaseModalProps) => (props.borderRadius = `${e}px`));
        }}
      />
      <Select
        data={['solid', 'dashed', 'dotted']}
        label="Border style"
        value={props.borderStyle}
        onChange={(value) => {
          setProp((props: BaseModalProps) => (props.borderStyle = value || undefined));
        }}
      />
      <NumberInput
        label="Border width"
        value={props.borderWidth}
        suffix="px"
        min={0}
        onChange={(e) => {
          setProp((props: BaseModalProps) => (props.borderWidth = `${e}px`));
        }}
      />
    </Stack>
  );
};

ModalBlock.craft = {
  displayName: 'Modal',
  custom: { isEssential: true },
  props: {
    padding: '10px',
    borderRadius: '4px',
    borderColor: '#ced4da',
    borderWidth: '1px',
    borderStyle: 'solid',
    backgroundColor: '#f8f9fa',
    spacing: '10px',
    width: '750px',
    fullScreen: false,
  },
  related: { settings: ModalBlockSettings },
};
