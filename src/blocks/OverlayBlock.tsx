import React from 'react';
import { WithCraft } from '../types.ts';
import { BaseOverlay, BaseOverlayProps } from '../base';
import { useEditor, useNode } from '@craftjs/core';
import { ColorInput, NumberInput, Stack } from '@mantine/core';

export const OverlayBlock: WithCraft<React.FC<BaseOverlayProps>, BaseOverlayProps> = (props) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode();
  const { isSelected } = useEditor((state) => ({ isSelected: state.events.selected.has(id) }));

  return <BaseOverlay ref={(ref) => ref && connect(drag(ref))} {...props} selected={isSelected} />;
};

export const OverlayBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as BaseOverlayProps,
  }));

  return (
    <Stack>
      <ColorInput
        label="Background color"
        value={props.backgroundColor}
        onChange={(value) => {
          setProp((props: BaseOverlayProps) => (props.backgroundColor = value));
        }}
      />
      <NumberInput
        label="Background opacity"
        value={parseFloat(props.backgroundOpacity.toFixed(2))}
        onChange={(value) => {
          setProp(
            (props: BaseOverlayProps) =>
              (props.backgroundOpacity = typeof value === 'string' ? parseFloat(value) : value),
          );
        }}
      />
    </Stack>
  );
};

OverlayBlock.craft = {
  props: {
    backgroundColor: '#000000',
    backgroundOpacity: 0.5,
    height: '100%',
  },
  related: {
    settings: OverlayBlockSettings,
  },
};
