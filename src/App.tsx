import { AppShell, Box, Button, Group, Stack, Tabs } from '@mantine/core';
import { Editor, Element, Frame } from '@craftjs/core';
import { IconArrowLeft } from '@tabler/icons-react';
import {
  ModalBlock,
  TextBlock,
  EmailBlock,
  PhoneBlock,
  OverlayBlock,
  ContainerBlock,
  ImageBlock,
  ButtonBlock,
} from './blocks';
import { Toolbar } from './toolbar';
import { BlockSettings } from './toolbox/BlockSettings.tsx';
import { Blocks } from './toolbox/Blocks.tsx';

export default function App() {
  return (
    <Editor
      resolver={{
        Overlay: OverlayBlock,
        Modal: ModalBlock,
        Container: ContainerBlock,
        Image: ImageBlock,
        Text: TextBlock,
        Email: EmailBlock,
        Button: ButtonBlock,
        Phone: PhoneBlock,
      }}
    >
      <AppShell header={{ height: 60 }} navbar={{ width: 300, breakpoint: 'sm' }}>
        <AppShell.Header>
          <Group h="100%" px="md">
            <Button variant="transparent" leftSection={<IconArrowLeft />}>
              Back to forms
            </Button>
          </Group>
        </AppShell.Header>
        <AppShell.Navbar>
          <Tabs defaultValue="settings">
            <Tabs.List grow>
              <Tabs.Tab value="settings">Settings</Tabs.Tab>
              <Tabs.Tab value="blocks">Blocks</Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="settings" p="md">
              <BlockSettings />
            </Tabs.Panel>
            <Tabs.Panel value="blocks" p="md">
              <Blocks />
            </Tabs.Panel>
          </Tabs>
        </AppShell.Navbar>
        <AppShell.Main display="flex">
          <Stack flex={1} gap={0}>
            <Box flex={1} bg="gray" pos="relative">
              <Frame>
                <OverlayBlock backgroundColor="#000000" backgroundOpacity={0.5}>
                  <Element canvas is={ModalBlock}>
                    <TextBlock text="Hello, World!" />
                  </Element>
                </OverlayBlock>
              </Frame>
            </Box>
            <Toolbar />
          </Stack>
        </AppShell.Main>
      </AppShell>
    </Editor>
  );
}
