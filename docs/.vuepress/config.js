module.exports = {
  //...省略部分代码
  base: '/FE-notes/',

  //下面涉及到的md文件和其他文件的路径下一步再详细解释
  themeConfig: {
    logo: '/egg.png', //网页顶端导航栏左上角的图标

    //顶部导航栏
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: '首页', link: '/' },

      //格式二：添加下拉菜单，link指向的文件路径
      {
        text: '分类', //默认显示
        ariaLabel: '分类', //用于识别的label
        items: [
          {
            text: '面试真题',
            link: '/pages/interviews/index.md'
          },
          {
            text: '工程实践',
            link: '/pages/engineering-practice/index.md'
          },
          //点击标签会跳转至link的markdown文件生成的页面
          {
            text: '源码分析',
            link: '/pages/sourcecode-analysis/index.md'
          },
          {
            text: '算法整理',
            link: '/pages/algorithm/index.md'
          },
          {
            text: '工具链',
            link: '/pages/tool-list/index.md'
          }
        ]
      },
      { text: '常用工具', link: '/pages/tool-list/index.md' },
      //格式三：跳转至外部网页，需http/https前缀
      { text: 'Github', link: 'https://github.com/hhcol620/FE-notes' }
    ],

    // 侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    sidebar: {
      '/pages/engineering-practice/': [
        {
          title: '工程实践', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['components-library.md', 'componentsLibrary'],
            ['build-tools-vs.md', 'buildToolsVs']
          ]
        }
      ],
      '/pages/sourcecode-analysis/': [
        {
          title: '源码分析', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['vue-router.md', 'VueRouter'],
            ['vuex.md', 'VueX'],
            ['vue2.md', 'Vue2'],
            ['vue3.md', 'Vue3'],
            ['Google.v8.md', 'Google.v8']
          ]
        }
      ],
      '/pages/interviews-QA/': [
        {
          title: '源码分析', // 一级菜单名称
          collapsable: false, // false为默认展开菜单, 默认值true是折叠,
          sidebarDepth: 1, //  设置侧边导航自动提取markdown文件标题的层级，默认1为h2层级
          children: [
            ['index.md', 'index'], 
            ['promise.md', 'promise'],
            ['fileUpload.md', '大文件上传']
          ]
        }
      ]
    }
  },
  markdown: {
    lineNumbers: true
  }
};
