import { Button, Stack, Text } from '@mantine/core';
import { useEditor, Element } from '@craftjs/core';
import { ButtonBlock, ContainerBlock, EmailBlock, ImageBlock, PhoneBlock, TextBlock } from '../blocks';

export const Blocks = () => {
  const { connectors } = useEditor();

  return (
    <Stack>
      <Text>Drag and drop elements to the canvas</Text>
      <Button ref={(ref) => ref && connectors.create(ref, <Element canvas is={ContainerBlock} />)}>Container</Button>
      <Button ref={(ref) => ref && connectors.create(ref, <TextBlock text="Text" />)}>Text</Button>
      <Button ref={(ref) => ref && connectors.create(ref, <ButtonBlock text="Button" />)}>Button</Button>
      <Button ref={(ref) => ref && connectors.create(ref, <ImageBlock />)}>Image</Button>
      <Button ref={(ref) => ref && connectors.create(ref, <EmailBlock />)}>Email</Button>
      <Button ref={(ref) => ref && connectors.create(ref, <PhoneBlock />)}>Phone</Button>
    </Stack>
  );
};
