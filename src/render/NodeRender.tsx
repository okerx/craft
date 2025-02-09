import React, { useEffect, useRef, useState } from 'react';
import { ROOT_NODE, useEditor, useNode } from '@craftjs/core';
import { createPortal } from 'react-dom';
import { ActionIcon, Group, Text } from '@mantine/core';
import { IconArrowsMove, IconArrowUp, IconTrash } from '@tabler/icons-react';

export const NodeRender = ({ render }: { render: React.ReactNode }) => {
  const { id } = useNode();
  const { actions, query, isActive } = useEditor((_, query) => ({
    isActive: query.getEvent('selected').contains(id),
  }));
  const { name, parent, deletable, moveable, connectors } = useNode((node) => ({
    name: node.data.custom.displayName || node.data.displayName,
    parent: node.data.parent,
    deletable: !node.data.custom.isEssential && query.node(node.id).isDeletable(),
    moveable: query.node(node.id).isDraggable(),
  }));
  const targetElRef = useRef<HTMLElement | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const rafRef = useRef<number | null>(null);
  const [position, setPosition] = useState({ top: 0, left: 0 });

  useEffect(() => {
    targetElRef.current = document.querySelector(`[data-node-id="${id}"]`);
    if (!targetElRef.current) return;

    const updatePosition = () => {
      const rect = targetElRef.current?.getBoundingClientRect();
      if (!rect) return;
      setPosition({ top: rect.top + window.scrollY, left: rect.left + window.scrollX });
    };

    const checkPosition = () => {
      updatePosition();
      rafRef.current = requestAnimationFrame(checkPosition);
    };

    checkPosition();

    observerRef.current = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          updatePosition();
        }
      },
      { threshold: 0.1 },
    );

    observerRef.current?.observe(targetElRef.current);

    window.addEventListener('scroll', updatePosition);
    window.addEventListener('resize', updatePosition);

    return () => {
      if (observerRef.current) {
        observerRef.current.disconnect();
      }
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener('scroll', updatePosition);
      window.removeEventListener('resize', updatePosition);
    };
  }, [id]);

  if (!targetElRef.current || id === 'ROOT' || !isActive) return render;

  const portal = createPortal(
    <Group
      pos="fixed"
      top={position.top - 25}
      left={position.left}
      h={25}
      style={{ zIndex: 1000 }}
      bg="blue"
      px="xs"
      gap="xs"
    >
      <Text size="xs" c="white">
        {name}
      </Text>
      {moveable && (
        <ActionIcon
          size="xs"
          ref={(ref) => {
            if (ref) connectors.drag(ref);
          }}
          style={{ cursor: 'move' }}
        >
          <IconArrowsMove />
        </ActionIcon>
      )}
      {id !== ROOT_NODE && (
        <ActionIcon size="xs" onClick={() => parent && actions.selectNode(parent)}>
          <IconArrowUp />
        </ActionIcon>
      )}
      {deletable && (
        <ActionIcon size="xs" onClick={() => actions.delete(id)}>
          <IconTrash />
        </ActionIcon>
      )}
    </Group>,
    document.body,
  );

  return (
    <>
      {render}
      {portal}
    </>
  );
};
