# chrome-devtools-frontend-vite

#### 介绍
Chrome DevTools Frontend. Bundled with Vite

前端开发经常要用到Chrome浏览器的开发者工具, 如果有什么功能想改进的话, 可以直接下载官方源码自己修改定制. 下载地址: https://github.com/ChromeDevTools/devtools-frontend

其中前端需要的代码是front_end目录, 是一个前端项目, 然而构建用的是内部工具, 不好处理, 所以用Vite写了一些配置, 可以打包运行成功. 地址: [chrome-devtools-frontend-vite: Chrome DevTools Frontend. Bundled with Vite (gitee.com)](https://gitee.com/Onesimu/chrome-devtools-frontend-vite)

为了减小体积, third_party 目录没有完全保留, 可以从原仓库提取. 后期考虑将部分依赖改为从npm安装.

配置的主要步骤是处理图片和CSS的导入, 目前未能完善的全自动处理, 有些文件和步骤可能仍需要手动增加, 不过主要的部分都有了. 具体根据报错信息对应处理即可.
多国语言包体积也大, 默认只保留了英文, 需要时可从官方提取.

目前在项目中加入了livescript, 可以在控制台运行livescript测试. 后续考虑加入镜像网站等功能. 欢迎交流.