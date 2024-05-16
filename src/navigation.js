import { getCommonPagePermalink, getBlogPermalink, getAsset, getHomePermalink } from './utils/permalinks';

export const headerData = {
  links: [
    {
      text: 'Homes',
      href: getHomePermalink(),
    },
    {
      text: 'Aldis',
      href: getBlogPermalink('aldis'),
    },
    {
      text: 'Camila',
      href: getBlogPermalink('camila'),
    },
    {
      text: 'Seven',
      href: getBlogPermalink('seven'),
    },
  ],
};

export const footerData = {
  links: [
    {
      title: 'Home',
      links: [],
    },
    {
      title: 'Aldis',
      links: [
        { text: 'AI', href: '#' },
        { text: 'Web3', href: '/aldis/category/web3' },
        { text: '元宇宙', href: '#' },
        { text: '硬件', href: '#' },
        { text: '编程随感', href: '/aldis/category/bian1-cheng2-sui2-gan3' },
      ],
    },
    {
      title: 'Camila',
      links: [
        { text: '动物', href: '#' },
        { text: '植物', href: '/camila/category/zhi2-wu4' },
        { text: '风景', href: '#' },
      ],
    },
    {
      title: 'Seven',
      links: [
        { text: '小积木', href: '/seven/category/xiao3-ji1-mu4' },
        { text: '编程积木', href: '/seven/category/bian1-cheng2-ji1-mu4' },
      ],
    },
  ],
  secondaryLinks: [
    { text: 'Terms', href: getCommonPagePermalink('/terms') },
    { text: 'Privacy Policy', href: getCommonPagePermalink('/privacy') },
  ],
  socialLinks: [
    { ariaLabel: 'Mail', icon: 'tabler:mail', href: 'mailto:307665930@qq.com' },
    { ariaLabel: 'X', icon: 'tabler:x', href: 'https://twitter.com/Hello_Aldis' },
    { ariaLabel: 'RSS', icon: 'tabler:rss', href: getAsset('/rss.xml') },
    { ariaLabel: 'Github', icon: 'tabler:brand-github', href: 'https://github.com/HelloAldis' },
  ],
  footNote: `&copy; 2024 Aldis & Camila & Seven · All rights reserved.`,
};
