import { r as renderers } from './chunks/_@astro-renderers_Co-zGCQK.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_CKrPnmfu.mjs';
import { manifest } from './manifest_D8ACoz0n.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/get-info-playlist.json.astro.mjs');
const _page2 = () => import('./pages/playlist/_id_.astro.mjs');
const _page3 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/.pnpm/astro@5.14.0_@types+node@24_0228277774acd21597366304560fc44b/node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/get-info-playlist.json.js", _page1],
    ["src/pages/playlist/[id].astro", _page2],
    ["src/pages/index.astro", _page3]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "3913db5f-80c9-46b5-b8c9-6dac2dc2c974",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
