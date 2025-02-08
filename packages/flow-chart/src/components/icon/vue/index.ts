import { getFileName } from '@clsy/utils';

const globVueIcons = import.meta.glob('./**/*.vue');

const vueIconMaps = Object.keys(globVueIcons).map((icon) => {
  const name = getFileName(icon);

  return {
    component: defineAsyncComponent(globVueIcons[icon] as any),
    name: `pro-${name}`,
  };
});

export { vueIconMaps };
