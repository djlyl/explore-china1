import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: '探索中国',
    template: '%s | 探索中国',
  },
  description:
    '探索中国是一个展示中国文化、历史和传统的平台，带你领略中华五千年文明的魅力。',
  keywords: [
    '探索中国',
    '中国文化',
    '中国历史',
    '传统文化',
    '中华文明',
    '中国传统',
    '文化遗产',
    '历史文化',
    '中国艺术',
    '中国哲学',
  ],
  authors: [{ name: '探索中国团队', url: 'https://explore-china1.vercel.app' }],
  generator: '探索中国',
  // icons: {
  //   icon: '',
  // },
  openGraph: {
    title: '探索中国 | 领略中华五千年文明',
    description:
      '探索中国是一个展示中国文化、历史和传统的平台，带你领略中华五千年文明的魅力。',
    url: 'https://explore-china1.vercel.app',
    siteName: '探索中国',
    locale: 'zh_CN',
    type: 'website',
    // images: [
    //   {
    //     url: '',
    //     width: 1200,
    //     height: 630,
    //     alt: '探索中国 - 领略中华五千年文明',
    //   },
    // ],
  },
  // twitter: {
  //   card: 'summary_large_image',
  //   title: 'Coze Code | Your AI Engineer is Here',
  //   description:
  //     'Build and deploy full-stack applications through AI conversation. No env setup, just flow.',
  //   // images: [''],
  // },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN">
      <body className={`antialiased`}>
        {children}
      </body>
    </html>
  );
}
