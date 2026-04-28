import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "株式会社イズミ産業　｜　冷凍折詰・お届け弁当・ケータリング",
  description:
    "昭和四十九年創業、横浜・保土ヶ谷の老舗仕出し屋。冷凍折詰の全国配送・横浜近郊へのお届け弁当・フルケータリングの三つのサービスで、よき日のお席を心を込めてお届けします。",
  keywords: [
    "イズミ産業",
    "横浜 仕出し",
    "横浜 ケータリング",
    "冷凍折詰 通販",
    "会議弁当 横浜",
    "ロケ弁 横浜",
    "法事 弁当 配達",
    "松花堂 お取り寄せ",
    "おせち 冷凍",
    "ふせち 喪中おせち",
  ],
  alternates: {
    canonical: "https://shop.isg.co.jp/",
  },
  openGraph: {
    type: "website",
    siteName: "株式会社イズミ産業",
    title: "株式会社イズミ産業　｜　冷凍折詰・お届け弁当・ケータリング",
    description:
      "横浜の老舗仕出し屋。三つのサービスでよき日のお席をお届けします。",
    url: "https://shop.isg.co.jp/",
    locale: "ja_JP",
  },
  twitter: {
    card: "summary_large_image",
  },
  other: {
    "geo.region": "JP-14",
    "geo.placename": "Yokohama",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="ja"
      data-palette="sumi"
      data-heading="serif"
      data-density="comfortable"
      data-card="squared"
    >
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@400;500;600;700&family=Noto+Sans+JP:wght@300;400;500;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
