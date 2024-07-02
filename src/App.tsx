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
import { NodeRender } from './render';

export default function App() {
  return (
    <Editor
      onRender={NodeRender}
      resolver={{
        OverlayBlock,
        ModalBlock,
        ContainerBlock,
        ImageBlock,
        TextBlock,
        EmailBlock,
        ButtonBlock,
        PhoneBlock,
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
                    <Element canvas is={ContainerBlock}>
                      <Element canvas is={ContainerBlock} direction="column" spacing="20px">
                        <TextBlock text="Louis Vuitton" fontSize="20px" fontWeight="Bold" />
                        <TextBlock text="Subscribe to get 10% off on Tyler's men's collection" fontSize="16px" />
                        <EmailBlock />
                        <ButtonBlock text="Subscribe" textColor="#FFFFFF" backgroundColor="#000000" />
                      </Element>
                      <ImageBlock src="https://assets.vogue.com/photos/65fb1336eebf646a3a39f799/master/w_2240,c_limit/MEN_PRECOFW24_SPRING_VISUAL_CAMPAIGN_FINAL_PLANE_1.jpg" />
                    </Element>
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
