import React from 'react';
import { ActionIcon, Group, Stack, Text } from '@mantine/core';
import { ROOT_NODE, useEditor } from '@craftjs/core';
import { IconTrash } from '@tabler/icons-react';

export const BlockSettings = () => {
  const { selected, isEnabled, actions, root } = useEditor((state, query) => {
    const currentNodeId = query.getEvent('selected').last();
    let selected;

    if (currentNodeId) {
      selected = {
        id: currentNodeId,
        name: state.nodes[currentNodeId].data.name,
        settings: state.nodes[currentNodeId].related && state.nodes?.[currentNodeId]?.related?.settings,
        isDeletable: query.node(currentNodeId).isDeletable(),
      };
    }

    return {
      selected,
      isEnabled: state.options.enabled,
      root: {
        id: state.nodes.ROOT_NODE,
        name: state.nodes?.[ROOT_NODE]?.data?.name,
        settings: state.nodes[ROOT_NODE]?.related?.settings,
        isDeletable: false,
      },
    };
  });

  if (!isEnabled) {
    return null;
  }

  const current = selected || root;

  return (
    <Stack>
      <Group align="center" justify="space-between">
        <Text>{current?.name}</Text>
        <ActionIcon disabled={!current.isDeletable} onClick={() => actions.delete(current.id)} color="red">
          <IconTrash size={18} />
        </ActionIcon>
      </Group>
      {current.settings && React.createElement(current.settings)}
    </Stack>
  );
};
