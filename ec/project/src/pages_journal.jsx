// Journal — read articles for long-tail SEO.
// Stub content; intent is to publish full articles over time.

const JOURNAL_POSTS = [
  {
    slug: "okuizome",
    cat: "お祝い", tag: "お食い初め",
    ja: "お食い初めの儀式と、お膳の整え方",
    en: "Okuizome — The First Meal Ceremony",
    lede: "生後百日を祝うお食い初めの儀式。鯛の姿焼き、赤飯、歯固めの石。それぞれの意味と、お膳の整え方、家族での進め方を、仕出し屋の目線から丁寧にご案内致します。",
    read: "5分で読めます",
    date: "2026.03.12",
  },
  {
    slug: "sekku-tango",
    cat: "節句", tag: "端午の節句",
    ja: "端午の節句　兜御膳の由来",
    en: "Tango-no-Sekku — Boys' Day Menu",
    lede: "五月五日の端午の節句。鰤、筍、蓬、柏餅。立身出世を願う食材の由来と、現代のお祝いでの取り入れ方をご紹介します。",
    read: "4分で読めます",
    date: "2026.04.03",
  },
  {
    slug: "houyou-manners",
    cat: "法要", tag: "マナー",
    ja: "ご法要のお席、お弁当の手配とマナー",
    en: "Memorial Service — Bento Etiquette",
    lede: "ご法要のお席に用意するお弁当の人数・内容・熨斗の表書き。寺院でのご会食、ご自宅でのご会食、それぞれの相場観とマナーをまとめました。",
    read: "7分で読めます",
    date: "2026.02.08",
  },
  {
    slug: "catering-yokohama",
    cat: "ケータリング", tag: "横浜",
    ja: "横浜での企業ケータリング　事例と進め方",
    en: "Corporate Catering in Yokohama",
    lede: "横浜のオフィスビル・会議室でのケータリング事例。人数の目安、予算感、当日の設営・引取の流れをご案内します。",
    read: "6分で読めます",
    date: "2026.01.22",
  },
  {
    slug: "reito-kaito",
    cat: "冷凍便", tag: "解凍",
    ja: "冷凍折詰の美味しい解凍方法",
    en: "Frozen Bento — Thawing Tips",
    lede: "遠方への贈答・贈り物にご好評の冷凍折詰。冷蔵庫での自然解凍を基本に、見栄え良く召し上がって頂く盛り付け直しのコツをお伝えします。",
    read: "3分で読めます",
    date: "2026.03.28",
  },
  {
    slug: "uchiiwai",
    cat: "お祝い", tag: "内祝",
    ja: "内祝の折詰　表書きと品選び",
    en: "Uchiiwai — Gift Selection",
    lede: "快気内祝・結婚内祝・出産内祝。それぞれの表書きの慣習と、贈る相手に合わせた折詰の品選びをご案内します。",
    read: "4分で読めます",
    date: "2026.02.26",
  },
];

const JournalPage = ({ go }) => {
  React.useEffect(() => {
    const prev = document.title;
    document.title = "読み物　｜　株式会社イズミ産業 オンライン御注文";
    return () => { document.title = prev; };
  }, []);

  return (
    <section className="shell">
      <div className="crumb">
        <a onClick={()=>go("top")}>ホーム</a><span className="sep">/</span>読み物
      </div>

      <div style={{padding:'64px 0 48px', borderBottom:'1px solid var(--rule)'}}>
        <div className="label-en" style={{marginBottom: 20}}>Journal · 読み物</div>
        <h1 className="kanji-display" style={{fontSize: 40, margin:'0 0 20px', lineHeight: 1.4}}>
          お席にまつわる<br/>ささやかな覚え書き
        </h1>
        <p style={{fontSize: 14, lineHeight: 2.2, color:'var(--ink-soft)', maxWidth: 640, margin: 0}}>
          節目のお祝い、ご会合、ご法要。それぞれのお席で承って参りました経験から、お料理の由来やマナー、お仕出しをご利用頂く際の心得などを、仕出し屋の目線で綴ります。
        </p>
      </div>

      <div className="journal-list">
        {JOURNAL_POSTS.map(p => (
          <article key={p.slug} className="journal-row">
            <div className="jr-meta">
              <span className="jr-date">{p.date}</span>
              <span className="jr-cat">{p.cat}　·　{p.tag}</span>
            </div>
            <div className="jr-body">
              <h2 className="jr-title">{p.ja}</h2>
              <div className="jr-en">{p.en}</div>
              <p className="jr-lede">{p.lede}</p>
              <div className="jr-foot">
                <span className="jr-read">{p.read}</span>
                <a className="jr-link">続きを読む　→</a>
              </div>
            </div>
            <div className="jr-thumb ph">
              <div className="ph-label">IMG / {p.slug}</div>
            </div>
          </article>
        ))}
      </div>

      <div style={{padding:'64px 0', textAlign:'center', borderTop:'1px solid var(--rule)', marginTop: 32}}>
        <div style={{fontSize:12, letterSpacing:'0.2em', color:'var(--ink-mute)', marginBottom: 14}}>
          新しい覚え書きは、月に一二度の頻度で更新致します
        </div>
        <button className="btn btn-ghost" onClick={()=>go("list")}>お品書きを見る　→</button>
      </div>
    </section>
  );
};

Object.assign(window, { JournalPage });
