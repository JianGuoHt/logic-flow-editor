import { defineConfig } from '@clsy/vite-config';

import AutoImport from 'unplugin-auto-import/vite';
import ElementPlus from 'unplugin-element-plus/vite';
import IconsResolver from 'unplugin-icons/resolver';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import Components from 'unplugin-vue-components/vite';

export default defineConfig(async () => {
  return {
    application: {},
    vite: {
      plugins: [
        ElementPlus({
          format: 'esm',
        }),
        AutoImport({
          dts: './types/auto-import.d.ts', // 生成在src路径下名为auto-import.d.ts的声明文件
          eslintrc: {
            enabled: true, // Default `false`
            filepath: './.eslintrc-auto-import.json', // Default `./.eslintrc-auto-import.json`
            globalsPropValue: true, // Default `true`, (true | false | 'readonly' | 'readable' | 'writable' | 'writeable')
          },
          imports: ['vue'],
          resolvers: [
            ElementPlusResolver({
              importStyle: 'sass',
            }),
          ],
        }),
        Components({
          dts: './types/components.d.ts',
          // imports 指定组件所在位置，默认为 src/components; 有需要也可以加上 view 目录
          // dirs: [],
          include: [/\.vue$/, /\.vue\?vue/, /\.vue\?v=/, /\.[jt]sx$/],
          resolvers: [
            ElementPlusResolver({
              importStyle: 'sass',
            }),

            // 自动注册图标组件
            IconsResolver({
              enabledCollections: ['ep'],
            }),
          ],

          version: 3,
        }),
      ],
      server: {
        proxy: {
          '/api': {
            changeOrigin: true,
            rewrite: (path) => path.replace(/^\/api/, ''),
            // mock代理目标地址
            target: 'http://localhost:5320/api',
            ws: true,
          },
        },
      },
    },
  };
});
