// Top page

const HeroSection = () => (
  <section className="shell">
    <div className="hero">
      <div className="hero-copy">
        <div>
          <div className="hero-eyebrow">
            <span className="dot" />
            <span className="label-en">Izumi Sangyo · Online Order</span>
          </div>
          <h1 className="hero-headline">
            集う日に、<br/>
            ひと膳の<em>ごちそう</em>を。
          </h1>
          <p className="hero-sub">
            昭和四十九年創業。松花堂・セット料理・お祝い膳・パーティーケータリング。
            熟練の板前が心を込めてお仕立てし、神奈川・東京へお届けするほか、
            冷凍仕立ての折詰は全国どちらへでもお送り致します。
          </p>
        </div>
        <dl className="hero-meta">
          <div><dt>配達エリア</dt><dd>神奈川・東京</dd></div>
          <div><dt>冷凍配送</dt><dd>全国対応</dd></div>
          <div><dt>最短納期</dt><dd>翌日お届け</dd></div>
        </dl>
      </div>
      <div className="hero-visual ph">
        <div className="ph-label">HERO / oiwai-zen-top-down</div>
        <div className="ph-center">お祝い膳　二段重</div>
        <div className="hero-corner">NO. 001 · 2026 SPRING</div>
        <div className="hero-tate">よき日のお席に<br/>心尽くしの一膳を</div>
      </div>
    </div>
  </section>
);

const CategoryTiles = ({ go }) => {
  const { CATEGORIES } = window.IZUMI_DATA;
  return (
    <section className="shell">
      <div className="section-head">
        <div className="lhs">
          <span className="label-en">Categories · 四つの柱</span>
        </div>
        <div className="meta">本社コーポレートサイトに準拠した四つの大きな括りからお選びいただけます。</div>
      </div>
      <div className="cats" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
        {CATEGORIES.map(c => (
          <a className="cat" key={c.id} onClick={() => go("list")}>
            <div className="num">{c.num}</div>
            <div>
              <div className="ja">{c.ja}</div>
              <div className="en">{c.en}</div>
            </div>
            <div className="desc">{c.desc}</div>
            <div className="count"><span>{c.count} 品</span><span className="arrow">→</span></div>
          </a>
        ))}
      </div>
    </section>
  );
};

const FeaturedSection = ({ onOpen }) => {
  const { PRODUCTS } = window.IZUMI_DATA;
  const items = PRODUCTS.slice(0, 6);
  return (
    <section className="shell">
      <div className="section-head">
        <div className="lhs">
          <h2>本日のお品書き</h2>
          <span className="label-en">Todays Selection</span>
        </div>
        <a className="more">すべてのお品書きを見る　→</a>
      </div>
      <div className="prod-grid">
        {items.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
      </div>
    </section>
  );
};

const FrozenSection = ({ onOpen, go }) => {
  const { PRODUCTS } = window.IZUMI_DATA;
  const items = PRODUCTS.filter(p => p.freeze).slice(0, 4);
  return (
    <section style={{background: 'var(--paper)', padding: '96px 0', borderTop:'1px solid var(--rule)', borderBottom:'1px solid var(--rule)'}}>
      <div className="shell">
        <div className="section-head">
          <div className="lhs">
            <h2>冷凍仕立て　全国へ</h2>
            <span className="label-en">Frozen · Nationwide</span>
          </div>
          <div className="meta">
            遠方のご親族・お世話になった方々へ、生仕立てに遜色無いお品を冷凍でお届け。
            解凍の手順もご案内同封致します。
          </div>
        </div>
        <div className="prod-grid cols-4">
          {items.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
        </div>
        <div style={{marginTop: 40, textAlign:'center'}}>
          <button className="btn btn-ghost" onClick={() => go("list")}>冷凍のお品一覧へ　→</button>
        </div>
      </div>
    </section>
  );
};

const VoiceSection = () => {
  const { VOICES } = window.IZUMI_DATA;
  return (
    <section className="shell">
      <div className="section-head">
        <div className="lhs">
          <h2>お客様の声</h2>
          <span className="label-en">Voices</span>
        </div>
        <div className="meta">ご利用頂いたお客様より頂戴したお言葉の一部。</div>
      </div>
      <div className="voice-grid">
        {VOICES.map((v, i) => (
          <div className="voice" key={i}>
            <div className="stars">{v.stars}</div>
            <p className="quote">「{v.quote}」</p>
            <div className="by"><b>{v.by.name}</b>{v.by.loc}　·　{v.by.kind}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const ProcessSection = () => {
  const steps = [
    { n: "01", ja: "お品選び", en: "SELECT",  d: "カテゴリ・人数・納期からお品を選定。献立や器のご相談も承ります。" },
    { n: "02", ja: "日時・場所", en: "DELIVERY", d: "配達日時・会場・人数をご指定。冷凍便は全国どちらでも。" },
    { n: "03", ja: "お支払い", en: "PAYMENT", d: "カード・請求書(法人)・代引から。法人様は月締めにも対応。" },
    { n: "04", ja: "お届け",   en: "ARRIVE",  d: "時間厳守でご指定場所へ。ケータリングは配膳・器の引上げも承ります。" },
  ];
  return (
    <section className="shell">
      <div className="section-head">
        <div className="lhs">
          <h2>ご注文の流れ</h2>
          <span className="label-en">Process</span>
        </div>
      </div>
      <div className="cats">
        {steps.map(s => (
          <div className="cat" key={s.n} style={{cursor:'default'}}>
            <div className="num">{s.n}</div>
            <div>
              <div className="ja">{s.ja}</div>
              <div className="en">{s.en}</div>
            </div>
            <div className="desc">{s.d}</div>
          </div>
        ))}
      </div>
    </section>
  );
};

const TopPage = ({ onOpen, go }) => (
  <React.Fragment>
    <HeroSection />
    <CategoryTiles go={go} />
    <FeaturedSection onOpen={onOpen} />
    <FrozenSection onOpen={onOpen} go={go} />
    <ProcessSection />
    <VoiceSection />
  </React.Fragment>
);

Object.assign(window, { TopPage });
