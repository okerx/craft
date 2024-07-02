import { WithCraft } from '../types.ts';
import React, { CSSProperties } from 'react';
import { BaseContainer, BaseContainerProps } from '../base';
import { useEditor, useNode } from '@craftjs/core';
import { ColorInput, NumberInput, SegmentedControl, Select, Stack, Switch, Text } from '@mantine/core';

export const ContainerBlock: WithCraft<React.FC<BaseContainerProps>, BaseContainerProps> = (props) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode();
  const { isSelected } = useEditor((state) => ({ isSelected: state.events.selected.has(id) }));

  const defaults = !props.children ? { minHeight: '50px', minWidth: '50px' } : ({} satisfies React.CSSProperties);

  return (
    <BaseContainer
      ref={(ref) => ref && connect(drag(ref))}
      {...props}
      style={{ ...defaults, ...props.style }}
      selected={isSelected}
      data-node-id={id}
    />
  );
};

const ContainerBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as BaseContainerProps,
  }));

  return (
    <Stack>
      <Stack gap="xs">
        <Text>Direction</Text>
        <SegmentedControl
          data={[
            { value: 'row', label: 'Row' },
            { value: 'column', label: 'Column' },
          ]}
          value={props.direction}
          onChange={(value) => {
            setProp(
              (props: BaseContainerProps) => (props.direction = (value as CSSProperties['flexDirection']) || undefined),
            );
          }}
        />
      </Stack>
      <Switch
        label="Full width"
        checked={props.fullWidth}
        onChange={(value) => {
          setProp((props: BaseContainerProps) => (props.fullWidth = value.target.checked));
        }}
      />
      <Select
        label="Align items"
        data={[
          { value: 'stretch', label: 'Stretch' },
          { value: 'flex-start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'flex-end', label: 'End' },
        ]}
        value={props.alignItems}
        onChange={(value) => {
          setProp((props: BaseContainerProps) => (props.alignItems = value || undefined));
        }}
      />
      <Select
        label="Justify content"
        data={[
          { value: 'flex-start', label: 'Start' },
          { value: 'center', label: 'Center' },
          { value: 'flex-end', label: 'End' },
          { value: 'space-between', label: 'Between' },
          { value: 'space-around', label: 'Around' },
        ]}
        value={props.justifyContent}
        onChange={(value) => {
          setProp((props: BaseContainerProps) => (props.justifyContent = value || undefined));
        }}
      />
      <NumberInput
        label="Spacing"
        value={props.spacing ? parseInt(props.spacing) : 0}
        suffix="px"
        onChange={(e) => {
          setProp((props: BaseContainerProps) => (props.spacing = `${e}px`));
        }}
      />
      <NumberInput
        label="Padding"
        value={props.padding ? parseInt(props.padding) : 0}
        suffix="px"
        onChange={(e) => {
          setProp((props: BaseContainerProps) => (props.padding = `${e}px`));
        }}
      />
      <ColorInput
        label="Background color"
        value={props.backgroundColor}
        onChange={(color) => {
          setProp((props: BaseContainerProps) => (props.backgroundColor = color));
        }}
      />
    </Stack>
  );
};

ContainerBlock.craft = {
  displayName: 'Container',
  props: {
    direction: 'row',
    spacing: '10px',
    padding: '10px',
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    fullWidth: false,
    backgroundColor: '#eeeeee',
  },
  related: {
    settings: ContainerBlockSettings,
  },
};
