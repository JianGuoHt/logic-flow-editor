import type { Config } from 'tailwindcss';

import path from 'node:path';

import { getPackagesSync } from '@clsy/node-utils';

import { addDynamicIconSelectors } from '@iconify/tailwind';
import animate from 'tailwindcss-animate';

// import defaultTheme from 'tailwindcss/defaultTheme';

const { packages } = getPackagesSync();

const tailwindPackages: string[] = [];

packages.forEach((pkg) => {
  // apps目录下 需要使用到 tailwindcss ui
  // if (fs.existsSync(path.join(pkg.dir, 'tailwind.config.mjs'))) {
  tailwindPackages.push(pkg.dir);
  // }
});

export default {
  content: [
    './index.html',
    ...tailwindPackages.map((item) =>
      path.join(item, 'src/**/*.{vue,js,ts,jsx,tsx,svelte,astro,html}'),
    ),
  ],
  darkMode: 'selector',
  plugins: [animate, addDynamicIconSelectors()],
  prefix: '',
  safelist: ['dark'],
  theme: {},
} as Config;
