export const projects: Project[] = [
  {
    title: '河山的技术存档',
    description: '基于Docusaurus v2 静态网站生成实现个人网站',
    preview: '/assets/images/project/blog.png',
    website: 'https://wrm244.gxist.cn',
    source: 'https://github.com/wrm244/wrm244.github.io',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: '基于hexo框架Revealjs处理生成slides',
    description:
      '基于Hexo + pandoc +Reveal编写md自动生成slides发布在静态页面上',
    preview: '/assets/images/project/Slides.png',
    website: 'https://wrm244.gxist.cn/slide/',
    //source: 'https://github.com/wrm244/wrm244-hexo',
    tags: ['favorite','design'],
    type: 'web',
  },
  {
    title: 'docusaurus-theme-zen',
    description: '基于Docusaurus v2 个人网站主题',
    preview: '/assets/images/project/blogtheme.png',
    website: 'https://wrm244.github.io/docusaurus-theme-zen/',
    source: 'https://github.com/wrm244/docusaurus-theme-zen',
    tags: ['opensource', 'design', 'favorite'],
    type: 'web',
  },
  {
    title: '图书管理系统课设',
    description:
      '基于C# + Mysql编写图书管理统一终端',
    preview: '/assets/images/project/book.png',
    website: 'https://github.com/wrm244/BookManagementSystem',
    source: 'https://github.com/wrm244/BookManagementSystem',
    tags: ['opensource','design'],
    type: 'Curriculum Design',
  },
]

export type Tag = {
  label: string
  description: string
  color: string
}

export type TagType =
  | 'favorite'
  | 'opensource'
  | 'product'
  | 'design'
  | 'large'
  | 'personal'

export type ProjectType = 'personal' | 'web' | 'app' | 'Curriculum Design'| 'toy' | 'other' 

export type Project = {
  title: string
  description: string
  preview?: any
  website: string
  source?: string | null
  tags: TagType[]
  type: ProjectType
}

export const Tags: Record<TagType, Tag> = {
  favorite: {
    label: '喜爱',
    description: '我最喜欢的网站，一定要去看看!',
    color: '#e9669e',
  },
  opensource: {
    label: '开源',
    description: '开源项目可以提供灵感!',
    color: '#39ca30',
  },
  product: {
    label: '产品',
    description: '与产品相关的项目!',
    color: '#dfd545',
  },
  design: {
    label: '设计',
    description: '设计漂亮的网站!',
    color: '#a44fb7',
  },
  large: {
    label: '大型',
    description: '大型项目，原多于平均数的页面',
    color: '#8c2f00',
  },
  personal: {
    label: '个人',
    description: '个人项目',
    color: '#12affa',
  },
}

export const TagList = Object.keys(Tags) as TagType[]

export const groupByProjects = projects.reduce((group, project) => {
  const { type } = project
  group[type] = group[type] ?? []
  group[type].push(project)
  return group
}, {} as Record<ProjectType, Project[]>)
