import type { EventArgs, EventCallback } from '@logicflow/core';

import { useLf } from './useLf';

export function useLfEvent<T extends keyof EventArgs>(
  eventName: T,
  handler: EventCallback<T>,
): () => void;
export function useLfEvent<T extends string>(
  eventName: T,
  handler: EventCallback<T>,
): () => void;

/**
 * lf事件监听
 */
export function useLfEvent(eventName: any, handler: any) {
  const lf = useLf();

  const destruction = () => {
    lf?.off(eventName, handler);
  };

  onMounted(() => {
    lf?.on(eventName, handler);
  });

  onBeforeUnmount(() => {
    destruction();
  });

  return destruction;
}
