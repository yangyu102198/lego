import path from 'path';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import viteEslint from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import WindiCSS from 'vite-plugin-windicss';
import { defineConfig, loadEnv } from 'vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons';

function resolve(str: string) {
    return path.resolve(process.cwd(), str);
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
    const envConfig = loadEnv(mode, process.cwd());

    return {
        plugins: [
            vue(),
            vueJsx(),
            viteEslint(),
            Components({
                resolvers: [
                    ElementPlusResolver({
                        importStyle: 'sass'
                    })
                ]
            }),
            createSvgIconsPlugin({
                iconDirs: [resolve('src/assets/svg')],
                symbolId: 'icon-[dir]-[name]'
            }),
            WindiCSS(),
            AutoImport({
                include: ['vue', 'vue-router']
            })
        ],
        base: envConfig.VITE_APP_BASEPATH,
        css: {
            preprocessorOptions: {
                scss: {
                    api: 'modern-compiler'
                }
            }
        },
        resolve: {
            alias: [
                {
                    find: '@/',
                    replacement: resolve('src') + '/'
                }
            ]
        },
        server: {
            host: '0.0.0.0',
            port: 5174
        },
        build: {
            target: 'es2015',
            rollupOptions: {
                output: {
                    manualChunks: {
                        'vue-vendor': ['vue', 'vue-router', 'pinia'],
                        lib: ['element-plus']
                    }
                }
            }
        }
    };
});
