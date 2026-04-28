// Top utility bar, header, and category strip.

const SiteHeader = ({ page, go, cartCount }) => {
  const nav = [
    { k: "top", ja: "ホーム" },
    { k: "list", ja: "商品一覧" },
    { k: "area:yokohama", ja: "エリア" },
    { k: "journal", ja: "読み物" },
    { k: "about", ja: "会社案内" },
  ];
  const areaLinks = [
    { k: "area:yokohama", ja: "横浜エリア" },
    { k: "area:machida", ja: "町田・多摩エリア" },
    { k: "area:frozen", ja: "冷凍便・全国配送" },
  ];
  const cats = [
    { k: "shokado", ja: "松花堂" },
    { k: "set", ja: "セット料理" },
    { k: "oiwai", ja: "お祝い" },
    { k: "party", ja: "パーティー・ケータリング" },
    { k: "frozen", ja: "冷凍便・全国配送" },
  ];
  return (
    <React.Fragment>
      <div className="site-top">
        <div className="shell">
          <div>神奈川・東京　当日配達対応　｜　冷凍便　全国配送承ります</div>
          <div style={{display:'flex', gap: 22, alignItems:'center'}}>
            <a>マイページ</a>
            <a>法人様窓口</a>
            <a>見積依頼</a>
            <span style={{opacity:0.3}}>｜</span>
            <a href="https://www.isg.co.jp/" target="_blank" rel="noopener">
              本社サイト　<span style={{fontFamily:'var(--f-mono)', fontSize:10, opacity:0.7}}>ISG.CO.JP ↗</span>
            </a>
          </div>
        </div>
      </div>
      <header className="site-header">
        <div className="shell bar">
          <div className="logo" onClick={() => go("top")} role="button">
            <div className="mark">株式会社イズミ産業</div>
            <div className="sub">オンライン御注文　｜　日本料理 広美</div>
          </div>
          <nav className="head-nav" aria-label="主要ナビゲーション" style={{justifyContent:'flex-end'}}>
            {nav.map(n => (
              <a key={n.k}
                 className={
                   (n.k === "area:yokohama" && page === "area") ? "is-active" :
                   (page === n.k ? "is-active" : "")
                 }
                 onClick={() => go(n.k)}>{n.ja}</a>
            ))}
          </nav>
          <div className="head-actions">
            <button className="icon-btn" onClick={() => go("list")}><span>検索</span></button>
            <button className="icon-btn"><span>会員</span></button>
            <button className="icon-btn" onClick={() => go("cart")}>
              <span>御買物籠</span>
              <span className="num">[{String(cartCount).padStart(2,'0')}]</span>
            </button>
          </div>
        </div>
        <div className="cat-strip">
          <div className="shell">
            <span className="label-ja" style={{marginRight: 8}}>品目</span>
            {cats.map((c, i) => (
              <React.Fragment key={c.k}>
                <a onClick={() => go("list")}>{c.ja}</a>
                {i < cats.length - 1 && <span className="sep">·</span>}
              </React.Fragment>
            ))}
            <span className="sep" style={{opacity: 0.25, margin: '0 18px'}}>｜</span>
            <span className="label-ja" style={{marginRight: 8}}>エリア</span>
            {areaLinks.map((a, i) => (
              <React.Fragment key={a.k}>
                <a onClick={() => go(a.k)}>{a.ja}</a>
                {i < areaLinks.length - 1 && <span className="sep">·</span>}
              </React.Fragment>
            ))}
          </div>
        </div>
      </header>
    </React.Fragment>
  );
};

const SiteFooter = () => (
  <footer className="site-footer">
    <div className="shell">
      <div className="parent-band">
        <div className="pb-lead">
          <div className="pb-label">本サイトについて</div>
          <div className="pb-title">株式会社イズミ産業　オンライン御注文窓口</div>
          <p className="pb-copy">
            こちらは株式会社イズミ産業のお仕出し・ケータリング・冷凍折詰のオンライン御注文ページです。<br/>
            会社概要・宴会場「日本料理 広美」のご案内・採用情報等は、本社コーポレートサイトをご覧ください。
          </p>
        </div>
        <a className="pb-link" href="https://www.isg.co.jp/" target="_blank" rel="noopener">
          本社サイトへ<br/>
          <span>WWW.ISG.CO.JP ↗</span>
        </a>
      </div>

      <div className="grid">
        <div className="brand">
          <div className="mark">株式会社イズミ産業</div>
          <p style={{marginTop:0}}>
            昭和四十九年創業。横浜・町田を拠点に、冠婚葬祭料理のケータリング・仕出し・各種出張パーティを承って参りました。団体様向け宴会施設「日本料理　広美」も併せてご利用頂けます。
          </p>
          <div className="offices">
            <div className="office">
              <div className="o-label">横浜本社　／　日本料理 広美</div>
              <div className="o-addr">〒240-0044　神奈川県横浜市保土ヶ谷区仏向町 946</div>
              <div className="o-tel">TEL 045-333-0163　｜　FAX 045-333-1133</div>
            </div>
            <div className="office">
              <div className="o-label">町田支社</div>
              <div className="o-addr">〒194-0035　東京都町田市忠生 1-23-23</div>
              <div className="o-tel">TEL 042-789-6188　｜　FAX 042-789-6189</div>
            </div>
            <div className="office">
              <div className="o-label">株式会社イズミ食品　（関連会社）</div>
              <div className="o-addr">〒240-0044　神奈川県横浜市保土ヶ谷区仏向町 946</div>
              <div className="o-tel">TEL 045-332-5100　｜　FAX 045-333-5554</div>
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
          <h4 style={{marginTop: 28}}>ご案内</h4>
          <ul>
            <li>ご注文の流れ</li>
            <li>配達対応エリア</li>
            <li>冷凍便について</li>
            <li>特定商取引法に基づく表記</li>
          </ul>
        </div>
        <div>
          <h4>本社サイト</h4>
          <ul>
            <li><a href="https://www.isg.co.jp/dishes/boxedmeals" target="_blank" rel="noopener">松花堂　↗</a></li>
            <li><a href="https://www.isg.co.jp/dishes/setmenu" target="_blank" rel="noopener">セット料理　↗</a></li>
            <li><a href="https://www.isg.co.jp/dishes/celebration" target="_blank" rel="noopener">お祝い　↗</a></li>
            <li><a href="https://www.isg.co.jp/dishes/catering" target="_blank" rel="noopener">パーティー・ケータリング　↗</a></li>
            <li><a href="https://www.isg.co.jp/institution/" target="_blank" rel="noopener">施設のご紹介　↗</a></li>
          </ul>
        </div>
        <div>
          <h4>会社情報</h4>
          <ul>
            <li><a href="https://www.isg.co.jp/company/" target="_blank" rel="noopener">会社案内　↗</a></li>
            <li><a href="https://www.isg.co.jp/company/yokohama/" target="_blank" rel="noopener">横浜本社　↗</a></li>
            <li><a href="https://www.isg.co.jp/company/machida/" target="_blank" rel="noopener">町田支社　↗</a></li>
            <li><a href="https://www.isg.co.jp/company/izumisyokuhin/" target="_blank" rel="noopener">イズミ食品　↗</a></li>
            <li><a href="https://www.isg.co.jp/recruit/" target="_blank" rel="noopener">採用情報　↗</a></li>
            <li><a href="https://www.isg.co.jp/privacy/" target="_blank" rel="noopener">個人情報保護方針　↗</a></li>
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

// Kept for back-compat with app.jsx; no longer rendered.
const UrgentBand = () => null;

Object.assign(window, { SiteHeader, UrgentBand, SiteFooter });
