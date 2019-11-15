# 结构目录

> 项目是基于 vue-cli 搭建。

    .
    ├── .gitignore                  // 配置不需要加入版本管理的文件
    ├── README.md                   // 项目结构
    ├── config                      // 环境配置
    ├── build                       // 打包文件相关配置
    ├── node_modules                // 第三方模块
    └── src                         // 源文件
        ├── assets                  // 存放静态图片
        ├── components              // 业务组件目录
        ├── view                    // 页面
        ├── style                   // 全局样式
        ├── router                  // 路由
        ├── main                    // 入口文件
        ├── config                  // 配置文件
        ├── store                   // vuex
        ├── minxins                 // 混入、重复逻辑代码
        └── utils                   // 公共方法目录

## components/table

```
<RcTable
    :tableConfig="tableConfig"
    :searchForm="searchForm"
    :formatSelectList="formatSelectList"
    :buttonList="buttonList"
/>

```

> 列表中select框，options 格式为 [{ name: 'A', id: 0 }, { name: 'B', id: 1 }]

- tableConfig：配置文件
- searchForm：搜索项表单
- formatSelectList：搜索项 Select，数据需要格式化。
- buttonList：列表中需要的button按钮
