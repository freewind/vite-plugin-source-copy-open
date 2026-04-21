# vite-plugin-source-copy-open

`vite-plugin-source-copy-open` 是一个面向 `Vite + React` 工作流、可直接发布到 npm 的包，基于 [`open-editor`](https://github.com/zjxxxxxxxxx/open-editor) 改造而来。

它保留了 upstream 的源码定位能力，只在交互层做了一些偏实用的小改动，方便本地开发时直接使用。

## 安装

```bash
npm i -D vite-plugin-source-copy-open vite
```

## 使用方式

```ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import sourceCopyOpen from 'vite-plugin-source-copy-open';

export default defineConfig({
  plugins: [
    react(),
    sourceCopyOpen({
      rootDir: process.cwd(),
    }),
  ],
});
```

这个包同时导出：

- `viteSourceCopyOpenPlugin`
- `sourceCopyOpenPlugin`
- `openEditorReactPlugin`
- `setupOpenEditorClient`
- `openInEditor`
- `copySourceLocation`

## 功能

- 在开发环境中为 React 元素注入源码位置信息。
- 在浏览器中显示 inspector tooltip，展示组件名和文件位置。
- 通过 dev server 暴露的接口打开本地编辑器。
- 在 tooltip 中直接支持 `Copy` 和 `Open` 操作。

## 这个 Fork 做了哪些修改

- 将 inspector 快捷键改成了 `Option`。
- 快捷键改成按住启用、松开退出。
- 点击被选中的元素时，不再直接打开编辑器。
- 右上角 toggle 在 hover 时会显示快捷键提示。
- tooltip 中加入了 `Copy` 和 `Open` 两个操作。
- `Copy` 点击成功后会变成 `Copied ✓`。
- tooltip 会更贴近当前元素，并把目标切换延迟调成了 `100ms`，这样鼠标从元素移动到 tooltip 会更顺手。

把快捷键改成单独的 `Option` 是一个明确的交互选择：一只手按键盘，另一只手操作鼠标，会比原来的双手组合键更方便。

## 开发

```bash
pnpm install
pnpm build
pnpm check
pnpm demo:dev
```

## 发布前检查

```bash
pnpm build
pnpm check
npm pack --dry-run
npm publish
```

## 致谢

这个包建立在原作者 `zjxxxxxxxxx` 开源的 `open-editor` 之上。

真诚感谢原作者。源码定位、框架接入、inspector 结构、编辑器桥接这些最核心的能力都来自 upstream，而这个包能成立，也是因为原项目本身已经打下了非常扎实、非常用心的基础。
