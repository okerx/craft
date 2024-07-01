import { ActionIcon, Card, Group } from '@mantine/core';
import { IconArrowBackUp, IconArrowForwardUp } from '@tabler/icons-react';
import { useEditor } from '@craftjs/core';

export const Toolbar = () => {
  const { actions, canUndo, canRedo } = useEditor((state, query) => ({
    canUndo: state.options.enabled && query.history.canUndo(),
    canRedo: state.options.enabled && query.history.canRedo(),
  }));

  // const handleCopyState = async () => {
  //   const state = query.serialize();
  //   const string = JSON.stringify(state);
  //   await navigator.clipboard.writeText(string);
  //   alert('State copied to clipboard');
  // };

  return (
    <Card withBorder>
      <Group align="center" justify="center">
        <ActionIcon disabled={!canUndo} onClick={() => actions.history.undo()}>
          <IconArrowBackUp />
        </ActionIcon>
        <ActionIcon disabled={!canRedo} onClick={() => actions.history.redo()}>
          <IconArrowForwardUp />
        </ActionIcon>
      </Group>
    </Card>
  );
};
