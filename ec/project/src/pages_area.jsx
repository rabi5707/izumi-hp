// Area landing pages — geographic SEO targets.
// Three pages: yokohama, machida, frozen (nationwide)

const AreaPage = ({ area, go, onOpen }) => {
  const { PRODUCTS } = window.IZUMI_DATA;

  const data = {
    yokohama: {
      ja: "横浜エリア",
      en: "YOKOHAMA",
      tag: "神奈川・横浜本店より当日便",
      h1: "横浜のケータリング・お仕出しは、\nイズミ産業へ。",
      lede: "昭和四十九年より半世紀、保土ヶ谷の地にて横浜のお席を承って参りました。パーティーのオードブル、ご会合のお弁当、お祝い膳、法要のお席まで、熟練の板前が心を込めてお仕立てし、ご指定の会場へお届け致します。",
      tel: "045-333-0163",
      telLabel: "横浜本店",
      areas: [
        "横浜市 — 全18区", "西区", "神奈川区", "鶴見区", "保土ヶ谷区", "旭区", "瀬谷区", "泉区", "戸塚区",
        "緑区", "青葉区", "都筑区", "港北区", "中区", "南区", "港南区", "磯子区", "金沢区", "栄区",
        "川崎市", "川崎区", "幸区", "中原区", "高津区", "宮前区", "多摩区", "麻生区",
        "東京都23区（西部）", "大田区", "世田谷区", "渋谷区", "目黒区", "品川区",
      ],
      scenes: [
        { ja: "会議・懇親会", d: "法人様のご会合・懇親会に。会場設営・配膳・引取まで一貫対応。" },
        { ja: "ロケ弁", d: "撮影現場への定時配達。冷めても美味しい幕の内仕立て。" },
        { ja: "お祝い・内祝", d: "ご自宅でのお祝い席に。お食い初め膳も承ります。" },
        { ja: "法要のお席", d: "ご自宅・会館への配達。精進料理から会食膳まで。" },
      ],
      prods: PRODUCTS.filter(p => !p.freeze).slice(0, 6),
      faqs: [
        { q: "当日注文はできますか？", a: "前日17時までのご注文を原則としますが、当日のご用命もまずはお電話にてご相談ください。ご対応可能な場合は最短2時間でお届け致します。" },
        { q: "配達料はかかりますか？", a: "神奈川・東京の当日便は、ご注文金額30,000円以上から承っております。お見積時に配達料込みでご案内致します。" },
        { q: "配膳スタッフの手配は可能ですか？", a: "パーティー・ケータリングの場合、配膳スタッフの手配も承ります。お会合の規模・時間をお伝えください。" },
      ],
    },
    machida: {
      ja: "町田・多摩エリア",
      en: "MACHIDA",
      tag: "町田支店より当日便",
      h1: "町田・多摩のケータリング。\n地域密着、当日配達承ります。",
      lede: "町田支店より、町田・多摩・八王子・相模原方面へ当日配達にてお届け致します。法人様のお会合、ご家庭の節目のお祝い、撮影現場のお弁当まで、ご要望に応じて柔軟にお仕立て致します。",
      tel: "042-789-6188",
      telLabel: "町田支店",
      areas: [
        "東京都 — 多摩地域", "町田市", "八王子市", "多摩市", "稲城市", "府中市", "調布市", "狛江市",
        "日野市", "立川市", "国立市", "国分寺市", "小金井市", "三鷹市",
        "神奈川県 — 県央・県北", "相模原市 — 緑区・中央区・南区", "大和市", "海老名市", "座間市", "綾瀬市",
      ],
      scenes: [
        { ja: "地域企業の会合", d: "町田・多摩の企業様のご会合・社内懇親会に。" },
        { ja: "町内会・学校行事", d: "地域の集まり・PTA・同窓会などの人数のあるお席に。" },
        { ja: "ご家庭のお祝い", d: "お食い初め・七五三・還暦など、節目のお席に。" },
        { ja: "ロケ弁", d: "多摩地域の撮影現場への配達。定時運行で安心。" },
      ],
      prods: PRODUCTS.filter(p => !p.freeze).slice(0, 6),
      faqs: [
        { q: "相模原まで配達は可能ですか？", a: "相模原市内（緑区・中央区・南区）へ、町田支店より当日便にて配達承っております。お届け時間もご指定頂けます。" },
        { q: "最少人数はありますか？", a: "ご注文金額30,000円以上を目安とさせて頂いております。お弁当であれば約10〜15名様分よりお引受け致します。" },
        { q: "夜間の配達は可能ですか？", a: "21時までの配達をご指定頂けます。それ以降のご要望はお電話にてご相談ください。" },
      ],
    },
    frozen: {
      ja: "冷凍便・全国配送",
      en: "FROZEN · NATIONWIDE",
      tag: "関連会社イズミ食品より全国へ",
      h1: "松花堂・お祝い膳を、\n冷凍仕立てにて全国へ。",
      lede: "遠方のご親族・お世話になった方々へ、生仕立てに遜色無い品格のお料理を冷凍仕立てにてお届け致します。関連会社「株式会社イズミ食品」の専用工場にて急速冷凍、ヤマト運輸クール便にて全国どちらへでも配送。解凍のご案内も同封致します。",
      tel: "045-332-5100",
      telLabel: "イズミ食品",
      areas: [
        "北海道", "青森県", "岩手県", "宮城県", "秋田県", "山形県", "福島県",
        "茨城県", "栃木県", "群馬県", "埼玉県", "千葉県", "東京都", "神奈川県",
        "新潟県", "富山県", "石川県", "福井県", "山梨県", "長野県",
        "岐阜県", "静岡県", "愛知県", "三重県",
        "滋賀県", "京都府", "大阪府", "兵庫県", "奈良県", "和歌山県",
        "鳥取県", "島根県", "岡山県", "広島県", "山口県",
        "徳島県", "香川県", "愛媛県", "高知県",
        "福岡県", "佐賀県", "長崎県", "熊本県", "大分県", "宮崎県", "鹿児島県", "沖縄県",
      ],
      scenes: [
        { ja: "遠方のご親族へ", d: "お世話になった方々へ、贈答・お歳暮・内祝にも。" },
        { ja: "法要のお席", d: "故人を偲ぶお席に。一人前の折詰から承ります。" },
        { ja: "お食い初め", d: "ご両家遠方の場合にも。解凍するだけで整う晴れの膳。" },
        { ja: "業務用・まとめ買い", d: "ご法要の引出物、ご贈答用に。大口割引も承ります。" },
      ],
      prods: PRODUCTS.filter(p => p.freeze),
      faqs: [
        { q: "送料はいくらですか？", a: "1配送先につき1,500円（税込）を頂戴しております。ただし10,000円以上のご注文で配送料無料とさせて頂きます。" },
        { q: "どのくらい日持ちしますか？", a: "冷凍庫（-18℃以下）にて製造日より90日間。解凍後は当日中にお召し上がりください。" },
        { q: "解凍方法は？", a: "冷蔵庫にて約12時間の自然解凍をお勧めします。お席の直前に盛り付け直して頂きますと、一層美しくお召し上がり頂けます。" },
        { q: "配達日指定はできますか？", a: "ご注文より中3日以降のお日にちをご指定頂けます。時間帯のご指定も承ります。" },
      ],
    },
  }[area];

  // FAQ + Place structured data per area
  React.useEffect(() => {
    const faqLd = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": data.faqs.map(f => ({
        "@type": "Question",
        "name": f.q,
        "acceptedAnswer": { "@type": "Answer", "text": f.a }
      }))
    };
    const s = document.createElement('script'); s.type = 'application/ld+json'; s.textContent = JSON.stringify(faqLd);
    document.head.appendChild(s);
    const prev = document.title;
    document.title = data.ja + "　｜　株式会社イズミ産業 オンライン御注文";
    return () => { s.remove(); document.title = prev; };
  }, [area]);

  return (
    <section className="shell">
      <div className="crumb">
        <a onClick={()=>go("top")}>ホーム</a><span className="sep">/</span>対応エリア<span className="sep">/</span>{data.ja}
      </div>

      <div className="area-hero">
        <div>
          <div className="label-en" style={{marginBottom: 20}}>Area · {data.en}</div>
          <div style={{fontFamily:'var(--f-heading)', fontSize: 12, letterSpacing:'0.24em', color:'var(--accent)', marginBottom: 20}}>
            {data.tag}
          </div>
          <h1 className="kanji-display" style={{fontSize: 40, margin:'0 0 28px', lineHeight: 1.45, whiteSpace:'pre-line'}}>{data.h1}</h1>
          <p style={{fontSize: 14, lineHeight: 2.2, color:'var(--ink-soft)', maxWidth: 560, margin: 0}}>{data.lede}</p>
          <div className="area-tel">
            <div className="at-label">お電話でのご注文・お見積</div>
            <div className="at-tel">{data.tel}</div>
            <div className="at-sub">{data.telLabel}　／　9:00 – 21:00　年中無休</div>
          </div>
        </div>
        <div className="ph" style={{aspectRatio:'4/5', minHeight: 440}}>
          <div className="ph-label">IMG / area-{area}</div>
          <div className="ph-center">{data.ja}</div>
        </div>
      </div>

      <div style={{padding:'64px 0', borderTop:'1px solid var(--rule)', borderBottom:'1px solid var(--rule)'}}>
        <div className="section-head">
          <div className="lhs">
            <h2 style={{fontSize: 22}}>{area === "frozen" ? "お届け都道府県" : "配達対応エリア"}</h2>
            <span className="label-en">{area === "frozen" ? "Prefectures" : "Coverage"}</span>
          </div>
        </div>
        <div className="area-chips">
          {data.areas.map((a, i) => (
            <span key={i} className={"ac " + (a.includes("—") ? "hd" : "")}>{a}</span>
          ))}
        </div>
      </div>

      <div style={{padding:'64px 0'}}>
        <div className="section-head">
          <div className="lhs">
            <h2 style={{fontSize: 22}}>よく承るお席</h2>
            <span className="label-en">Use Cases</span>
          </div>
        </div>
        <div className="scope-grid" style={{gridTemplateColumns:'repeat(4, 1fr)'}}>
          {data.scenes.map((s, i) => (
            <div key={i} className="scope-cell">
              <div className="s-num">{String(i+1).padStart(2,"0")}</div>
              <div className="s-ja">{s.ja}</div>
              <p className="s-d">{s.d}</p>
            </div>
          ))}
        </div>
      </div>

      <div style={{padding:'64px 0', borderTop:'1px solid var(--rule)'}}>
        <div className="section-head">
          <div className="lhs">
            <h2 style={{fontSize: 22}}>{data.ja}でよくご注文のお品</h2>
            <span className="label-en">Popular</span>
          </div>
          <a className="more" onClick={()=>go("list")}>お品書き一覧へ　→</a>
        </div>
        <div className="prod-grid">
          {data.prods.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
        </div>
      </div>

      <div style={{padding:'64px 0', borderTop:'1px solid var(--rule)'}}>
        <div className="section-head">
          <div className="lhs">
            <h2 style={{fontSize: 22}}>よくあるご質問</h2>
            <span className="label-en">FAQ</span>
          </div>
        </div>
        <div className="faq-list">
          {data.faqs.map((f, i) => (
            <div key={i} className="faq-row">
              <div className="faq-q"><span className="faq-mark">Q.</span>{f.q}</div>
              <div className="faq-a"><span className="faq-mark faq-a-mark">A.</span>{f.a}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { AreaPage });
