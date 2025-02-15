import React, { PropsWithChildren } from 'react';
import { useEditor, useNode } from '@craftjs/core';
import { WithCraft } from '../types.ts';
import { BaseText, BaseTextProps } from '../base';
import { NumberInput, Select, Stack, TextInput } from '@mantine/core';

export const TextBlock: WithCraft<React.FC<PropsWithChildren<BaseTextProps>>, BaseTextProps> = (props) => {
  const {
    id,
    connectors: { connect },
  } = useNode();
  const { isSelected } = useEditor((state) => ({
    isSelected: state.events.selected.has(id),
  }));

  return (
    <BaseText
      ref={(ref) => {
        if (ref) connect(ref);
      }}
      {...props}
      selected={isSelected}
      data-node-id={id}
    />
  );
};

export const TextSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as BaseTextProps,
  }));

  return (
    <Stack>
      <TextInput
        label="Text"
        value={props.text}
        onChange={(e) => {
          setProp((props: BaseTextProps) => (props.text = e.target.value));
        }}
      />
      <NumberInput
        label="Font size"
        suffix="px"
        value={props.fontSize}
        onChange={(e) => {
          setProp((props: BaseTextProps) => (props.fontSize = `${e}px`));
        }}
      />
      <Select
        label="Font weight"
        value={props.fontWeight}
        data={['lighter', 'normal', 'bold', 'bolder']}
        onChange={(value) => setProp((props: BaseTextProps) => value && (props.fontWeight = value))}
      />
    </Stack>
  );
};

TextBlock.craft = {
  displayName: 'Text',
  props: { text: 'Text', fontSize: '16px', fontWeight: 'normal' },
  related: { settings: TextSettings },
};
