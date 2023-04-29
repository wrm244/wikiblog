export const Friends: Friend[] = [
  {
    title: '河山的技术存档',
    description: '计算机研究，编程爱好者',
    website: 'https://wrm244.gxist.cn',
    avatar: '/svg/logo_round.svg',
  },
  {
    title: '河山的技术存档',
    description: 'cloudflare镜像站',
    website: 'https://wikiblog.pages.dev',
    avatar: '/svg/logo_round.svg',
  },
  {
    title: '河山的技术存档',
    description: 'netlify镜像站',
    website: 'https://wrm244.netlify.app/',
    avatar: '/svg/logo_round.svg',
  },
  //请按照以上格式提交请求，avatar可以是超链接。
]

export type Friend = {
  title: string
  description: string
  website: string
  avatar?: any
}
