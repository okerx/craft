import { WithCraft } from '../types.ts';
import React from 'react';
import { BaseImage, BaseImageProps } from '../base';
import { useEditor, useNode } from '@craftjs/core';
import { NumberInput, Stack, Switch, TextInput } from '@mantine/core';

export const ImageBlock: WithCraft<React.FC<BaseImageProps>, BaseImageProps> = (props) => {
  const {
    id,
    connectors: { connect, drag },
  } = useNode();
  const { isSelected } = useEditor((state) => ({ isSelected: state.events.selected.has(id) }));

  return <BaseImage ref={(ref) => ref && connect(drag(ref))} {...props} selected={isSelected} />;
};

const ImageBlockSettings = () => {
  const {
    actions: { setProp },
    props,
  } = useNode((node) => ({
    props: node.data.props as BaseImageProps,
  }));

  return (
    <Stack>
      <TextInput
        label="Image source"
        placeholder="https://example.com/image.jpg"
        value={props.src}
        onChange={(e) => {
          setProp((props: BaseImageProps) => (props.src = e.target.value));
        }}
      />
      <TextInput
        label="Alt text"
        value={props.alt}
        onChange={(e) => {
          setProp((props: BaseImageProps) => (props.alt = e.target.value));
        }}
      />
      <Switch
        label="Full width"
        checked={props.fullWidth}
        onChange={(value) => {
          setProp((props: BaseImageProps) => (props.fullWidth = value.target.checked));
        }}
      />
      <NumberInput
        label="Border radius"
        value={props.borderRadius}
        suffix="px"
        onChange={(e) => {
          setProp((props: BaseImageProps) => (props.borderRadius = `${e}px`));
        }}
      />
    </Stack>
  );
};

ImageBlock.craft = {
  props: {
    src: 'https://placehold.co/600x400/a1a1a1/31343C',
    alt: 'Image',
    fullWidth: false,
    borderRadius: '0px',
  },
  related: {
    settings: ImageBlockSettings,
  },
};
