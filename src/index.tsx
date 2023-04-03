/*
|--------------------------------------------------------------------------
|
| 应用可能使用了头部 import 静态导入语法来使用hel模块，所以此处
| 将应用入口文件后移一层到 loadApp 里并使用 import() 函数载入，这样以后
| entrance/libProperties 和 loadApp 模块下有其他远程模块依赖且想在整个项目使用静态导入时，
| 可在此文件main 函数里使用 helMicro.preFetchLib 来提前加载别的远程依赖，
|
| @author: fantasticsoul
| @date: 2022-06-05
|--------------------------------------------------------------------------
*/
// import { preFetchLib } from 'hel-micro';
import { isMasterApp } from 'hel-iso';
import { renderApp } from 'hel-micro-react';
import { libReady } from 'hel-lib-proxy';
import { LIB_NAME } from './configs/subApp';

async function main() {
  // 如有其他包依赖，且需要在逻辑里静态导入，可在此处执行预抓取
  // await helMicro.preFetchLib('other-lib');

  const libProperties = await import('./entrance/libProperties');
  // 表示模块已准备就绪，注意此处传递的是 default
  libReady(LIB_NAME, libProperties.default);

  const { App } = await import('./loadApp');
  // 是主应用时执行自渲染，是子应用时，将app根组件
  // 交给其他应用里的 hel-micro-react.MicroApp 渲染
  // 或其他应用里的 hel-micro.preFetchApp 做预抓取
  renderApp({ App, renderSelf: isMasterApp(), appGroupName: LIB_NAME });
}

main().catch(console.error);

// avoid isolatedModules warning
export default 'Hel Module Index file';
