// Product detail page

const DetailPage = ({ p, addToCart, go }) => {
  const [qty, setQty] = React.useState(10);
  const [tab, setTab] = React.useState("dishes");
  const [img, setImg] = React.useState(0);
  const dishes = window.IZUMI_DATA.FEATURED_DISHES;

  // SEO: inject Product + BreadcrumbList JSON-LD + update title
  React.useEffect(() => {
    const productLd = {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.ja,
      "sku": p.id,
      "description": p.desc,
      "brand": { "@type": "Brand", "name": "株式会社イズミ産業" },
      "category": window.IZUMI_DATA.CATEGORIES.find(c=>c.id===p.cat)?.ja,
      "offers": {
        "@type": "Offer",
        "price": p.price,
        "priceCurrency": "JPY",
        "availability": "https://schema.org/InStock",
        "url": "https://shop.isg.co.jp/#/" + p.id,
        "seller": { "@type": "Organization", "name": "株式会社イズミ産業", "url": "https://shop.isg.co.jp/" },
        "areaServed": p.freeze ? "JP" : ["神奈川県", "東京都"]
      }
    };
    const breadcrumbLd = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": [
        { "@type":"ListItem", "position":1, "name":"ホーム", "item":"https://shop.isg.co.jp/" },
        { "@type":"ListItem", "position":2, "name":"お品書き一覧", "item":"https://shop.isg.co.jp/list" },
        { "@type":"ListItem", "position":3, "name": p.ja }
      ]
    };
    const s1 = document.createElement('script'); s1.type = 'application/ld+json'; s1.textContent = JSON.stringify(productLd);
    const s2 = document.createElement('script'); s2.type = 'application/ld+json'; s2.textContent = JSON.stringify(breadcrumbLd);
    document.head.appendChild(s1); document.head.appendChild(s2);
    const prevTitle = document.title;
    document.title = p.ja + "　｜　株式会社イズミ産業 オンライン御注文";
    return () => { s1.remove(); s2.remove(); document.title = prevTitle; };
  }, [p.id]);

  return (
    <section className="shell">
      <div className="crumb">
        <a onClick={()=>go("top")}>ホーム</a>
        <span className="sep">/</span>
        <a onClick={()=>go("list")}>商品一覧</a>
        <span className="sep">/</span>
        <span>{p.ja}</span>
      </div>
      <div className="detail">
        <div className="detail-gallery">
          <div className="ph detail-main-img">
            <div className="ph-label">IMG / {p.en.toLowerCase()} — main</div>
            <div className="ph-center">{p.ja}</div>
          </div>
          <div className="detail-thumbs">
            {[0,1,2,3].map(i => (
              <div key={i} className={"ph" + (i===img ? " on" : "")} onClick={()=>setImg(i)}>
                <div className="ph-label">#{i+1}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="detail-info">
          <div className="detail-cat">{window.IZUMI_DATA.CATEGORIES.find(c=>c.id===p.cat)?.ja || ""}</div>
          <h1 className="detail-title">{p.ja}</h1>
          <div className="detail-en">{p.en}</div>
          <p style={{color:'var(--ink-soft)', fontSize:14, lineHeight:2, margin:0}}>{p.desc}</p>
          <div className="detail-price">
            <span className="num">¥{p.price.toLocaleString()}</span>
            <span className="unit">／{p.serves}</span>
            <span className="tax">税込・送料別</span>
          </div>
          <table className="spec-table">
            <tbody>
              <tr><th>内容</th><td>季節の食材を用いた本格仕立て。詳細はお品書きの項目にて。</td></tr>
              <tr><th>器</th><td>{p.freeze ? "使い捨て折箱（そのまま破棄可）" : "黒内朱の松花堂（返却必要・引取無料）"}</td></tr>
              <tr><th>納期</th><td>{p.lead}</td></tr>
              <tr><th>配達</th><td>{p.area}{p.freeze ? "　｜　クール便にてお届け" : "　｜　別途送料"}</td></tr>
              <tr><th>熨斗</th><td>無料　｜　掛紙・表書きのご指定承ります</td></tr>
            </tbody>
          </table>
          <div className="qty-row">
            <div className="qty">
              <button onClick={()=>setQty(Math.max(1, qty-1))}>−</button>
              <input value={qty} onChange={e => setQty(parseInt(e.target.value)||1)} />
              <button onClick={()=>setQty(qty+1)}>+</button>
            </div>
            <div className="qty-note">お一人様ごと　｜　最小 1 /  最大 200</div>
          </div>
          <div className="buy-row">
            <button className="btn btn-ghost" onClick={()=>addToCart(p, qty)}>買物籠に入れる</button>
            <button className="btn btn-accent" onClick={()=>{ addToCart(p, qty); go("cart"); }}>ご注文手続きへ</button>
          </div>
          <div style={{display:'flex', gap: 8, flexWrap:'wrap', marginTop:8}}>
            <Chip>御見積のご依頼</Chip>
            <Chip>お電話でのご注文</Chip>
            <Chip>人数の後日変更可</Chip>
          </div>
        </div>
      </div>

      <div className="detail-tabs">
        <div className="tab-bar">
          {[
            {k:"dishes", ja:"お品書き"},
            {k:"allergen", ja:"アレルギー表示"},
            {k:"delivery", ja:"配達・納期"},
            {k:"manners", ja:"解凍・召上り方"},
          ].map(t => (
            <button key={t.k} className={tab===t.k ? "on" : ""} onClick={()=>setTab(t.k)}>{t.ja}</button>
          ))}
        </div>
        {tab === "dishes" && (
          <div className="dish-list">
            {dishes.map((d, i) => {
              const [name, ...rest] = d.split("—");
              return (
                <div className="dish-row" key={i}>
                  <span className="i">{String(i+1).padStart(2,"0")}</span>
                  <span className="n">{name.trim()}</span>
                  <span></span>
                  <span className="d">{rest.join("—")}</span>
                </div>
              );
            })}
          </div>
        )}
        {tab === "allergen" && (
          <div style={{display:'grid', gridTemplateColumns:'repeat(7,1fr)', gap:12}}>
            {["えび","かに","小麦","そば","卵","乳","落花生","くるみ","あわび","いか","いくら","オレンジ","カシューナッツ","キウイ","牛肉"].map(a => (
              <div key={a} style={{padding:'16px 10px', border:'1px solid var(--rule)', textAlign:'center', fontSize:12, letterSpacing:'0.14em', background:'var(--paper)'}}>
                <div style={{fontFamily:'var(--f-mono)', fontSize:10, color:'var(--ink-mute)'}}>— 不使用 —</div>
                <div style={{marginTop:6}}>{a}</div>
              </div>
            ))}
          </div>
        )}
        {tab === "delivery" && (
          <div style={{maxWidth:720, fontSize:14, lineHeight:2, color:'var(--ink-soft)'}}>
            {p.freeze
              ? "冷凍仕立てのお品は、ヤマト運輸クール便にて全国どちらへでもお届け致します。ご注文より中3日で発送、配達日のご指定も承ります。"
              : "神奈川県全域・東京23区にお届け致します。前日17時までのご注文にて、翌日のご指定時間にお届けします。ケータリングの場合は、配膳・器の引取まで承ります。"}
          </div>
        )}
        {tab === "manners" && (
          <div style={{maxWidth:720, fontSize:14, lineHeight:2, color:'var(--ink-soft)'}}>
            {p.freeze
              ? "冷蔵庫にて約12時間、自然解凍でお召し上がりいただけます。お席の直前に盛り付け直して頂きますと、見栄え良くお召し上がり頂けます。"
              : "調理後、お早めにお召し上がりください。品質保持の為、配達後2時間以内のお食事をお勧め致します。"}
          </div>
        )}
      </div>

      <section style={{marginTop: 64, paddingTop: 48, borderTop:'1px solid var(--rule)'}}>
        <div className="section-head">
          <div className="lhs">
            <h2 style={{fontSize: 22}}>併せてご覧いただく方の多いお品</h2>
            <span className="label-en">Also Chosen</span>
          </div>
        </div>
        <div className="prod-grid">
          {window.IZUMI_DATA.PRODUCTS.filter(x => x.id !== p.id).slice(0,3).map(x => (
            <ProductCard key={x.id} p={x} onOpen={() => { go("detail", x); }} />
          ))}
        </div>
      </section>
    </section>
  );
};

Object.assign(window, { DetailPage });
