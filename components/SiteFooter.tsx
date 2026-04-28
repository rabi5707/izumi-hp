"use client";

import { usePathname } from "next/navigation";

export function SiteFooter() {
  const pathname = usePathname();
  // Catering and bento-delivery sections use their own footers.
  if (
    pathname?.startsWith("/catering") ||
    pathname?.startsWith("/bento-delivery")
  )
    return null;
  return (
    <footer className="site-footer">
      <div className="shell">
        <div className="parent-band">
          <div className="pb-lead">
            <div className="pb-label">本サイトについて</div>
            <div className="pb-title">
              株式会社イズミ産業　オンライン御注文窓口
            </div>
            <p className="pb-copy">
              こちらは株式会社イズミ産業のお仕出し・ケータリング・冷凍折詰のオンライン御注文ページです。
              <br />
              会社概要・宴会場「日本料理 広美」のご案内・採用情報等は、本社コーポレートサイトをご覧ください。
            </p>
          </div>
          <a
            className="pb-link"
            href="https://www.isg.co.jp/"
            target="_blank"
            rel="noopener noreferrer"
          >
            本社サイトへ
            <br />
            <span>WWW.ISG.CO.JP ↗</span>
          </a>
        </div>

        <div className="grid">
          <div className="brand">
            <div className="mark">株式会社イズミ産業</div>
            <p style={{ marginTop: 0 }}>
              昭和四十九年創業。横浜・保土ヶ谷の地にて、冠婚葬祭料理のケータリング・仕出し・各種出張パーティを承って参りました。団体様向け宴会施設「日本料理　広美」も併せてご利用頂けます。
            </p>
            <div className="offices">
              <div className="office">
                <div className="o-label">横浜本社　／　日本料理 広美</div>
                <div className="o-addr">
                  〒240-0044　神奈川県横浜市保土ヶ谷区仏向町 946
                </div>
                <div className="o-tel">
                  TEL 045-333-0163　｜　FAX 045-333-1133
                </div>
              </div>
              <div className="office">
                <div className="o-label">
                  株式会社イズミ食品　（関連会社）
                </div>
                <div className="o-addr">
                  〒240-0044　神奈川県横浜市保土ヶ谷区仏向町 946
                </div>
                <div className="o-tel">
                  TEL 045-332-5100　｜　FAX 045-333-5554
                </div>
              </div>
            </div>
          </div>
          <div>
            <h4>本サイトの御品書</h4>
            <ul>
              <li>松花堂</li>
              <li>セット料理</li>
              <li>お祝い膳</li>
              <li>パーティー・ケータリング</li>
              <li>冷凍便・全国配送</li>
            </ul>
            <h4 style={{ marginTop: 28 }}>ご案内</h4>
            <ul>
              <li>ご注文の流れ</li>
              <li>配達対応エリア</li>
              <li>冷凍便について</li>
              <li>
                <a href="/legal/tokusho">特定商取引法に基づく表記</a>
              </li>
              <li>
                <a href="/legal/privacy">プライバシーポリシー</a>
              </li>
              <li>
                <a href="/legal/terms">ご利用規約</a>
              </li>
            </ul>
          </div>
          <div>
            <h4>本社サイト</h4>
            <ul>
              <li>
                <a
                  href="https://www.isg.co.jp/dishes/boxedmeals"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  松花堂　↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.isg.co.jp/dishes/setmenu"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  セット料理　↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.isg.co.jp/dishes/celebration"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  お祝い　↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.isg.co.jp/dishes/catering"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  パーティー・ケータリング　↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.isg.co.jp/institution/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  施設のご紹介　↗
                </a>
              </li>
            </ul>
          </div>
          <div>
            <h4>会社情報</h4>
            <ul>
              <li>
                <a
                  href="https://www.isg.co.jp/company/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  会社案内　↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.isg.co.jp/company/yokohama/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  横浜本社　↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.isg.co.jp/company/izumisyokuhin/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  イズミ食品　↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.isg.co.jp/recruit/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  採用情報　↗
                </a>
              </li>
              <li>
                <a
                  href="https://www.isg.co.jp/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  個人情報保護方針　↗
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="bottom">
          <span>© 2012 IZUMI-SANGYOU CORP. ALL RIGHTS RESERVED.</span>
          <span>株式会社イズミ産業　オンライン御注文窓口</span>
        </div>
      </div>
    </footer>
  );
}
