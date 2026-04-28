// Confirmation + success

const ConfirmPage = ({ cart, deliveryData, go, setCart, setOrderNo }) => {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const ship = 1500;
  const total = subtotal + ship;
  const d = deliveryData || {};
  const base = new Date(2026, 3, 19);
  const deliveryDate = new Date(base); deliveryDate.setDate(base.getDate() + (d.date || 0));
  const submit = () => {
    const no = "IZ-" + String(Math.floor(Math.random()*900000)+100000);
    setOrderNo(no);
    go("success");
  };
  return (
    <section className="form-shell shell">
      <div className="step-bar">
        <div className="step done"><span className="n">✓</span>買物籠</div>
        <span className="step-sep" />
        <div className="step done"><span className="n">✓</span>配達指定</div>
        <span className="step-sep" />
        <div className="step on"><span className="n">3</span>確認</div>
        <span className="step-sep" />
        <div className="step"><span className="n">4</span>完了</div>
      </div>

      <h1 className="kanji-display" style={{fontSize: 28, margin: '24px 0 36px'}}>ご注文内容のご確認</h1>

      <div className="confirm-card" style={{marginBottom: 24}}>
        <h3 className="kanji-h" style={{margin: '0 0 16px', fontSize: 14, letterSpacing:'0.2em'}}>お届け情報</h3>
        <dl style={{margin:0}}>
          <div className="confirm-row"><dt>お届け日時</dt><dd>{deliveryDate.getFullYear()}年 {deliveryDate.getMonth()+1}月 {deliveryDate.getDate()}日 ／ {d.time || "—"}</dd></div>
          <div className="confirm-row"><dt>お届け先</dt><dd>{d.saijyou || "（未入力）"}<br/>〒{d.zip || "—"}　{d.addr || ""}</dd></div>
          <div className="confirm-row"><dt>お人数</dt><dd>{d.people || 0} 名様</dd></div>
          <div className="confirm-row"><dt>ご連絡先</dt><dd>{d.contactName || "—"}　／　{d.contactPhone || "—"}</dd></div>
          <div className="confirm-row"><dt>熨斗・表書き</dt><dd>{d.noshi} {d.noshiName && `／　${d.noshiName}`}</dd></div>
          <div className="confirm-row" style={{borderBottom:'none'}}><dt>お支払い</dt><dd>
            {({invoice:"請求書払い", card:"クレジットカード", cod:"代金引換", bank:"銀行振込"})[d.payment] || "—"}
          </dd></div>
        </dl>
      </div>

      <div className="confirm-card">
        <h3 className="kanji-h" style={{margin: '0 0 16px', fontSize: 14, letterSpacing:'0.2em'}}>ご注文品</h3>
        {cart.map(c => (
          <div key={c.id} style={{display:'grid', gridTemplateColumns:'1fr auto auto', gap:20, padding:'14px 0', borderBottom:'1px solid var(--rule-soft)', alignItems:'baseline'}}>
            <div>
              <div className="kanji-h" style={{fontSize: 15}}>{c.ja}</div>
              <div style={{fontSize:11, color:'var(--ink-mute)', letterSpacing:'0.14em'}}>{c.en}</div>
            </div>
            <div className="price-num" style={{color:'var(--ink-mute)'}}>¥{c.price.toLocaleString()} × {c.qty}</div>
            <div className="price-num">¥{(c.price*c.qty).toLocaleString()}</div>
          </div>
        ))}
        <div style={{padding:'14px 0', display:'grid', gridTemplateColumns:'1fr auto', fontSize: 13}}>
          <span>小計</span><span className="price-num">¥{subtotal.toLocaleString()}</span>
        </div>
        <div style={{padding:'6px 0 14px', display:'grid', gridTemplateColumns:'1fr auto', fontSize: 13, borderBottom:'1px solid var(--rule)'}}>
          <span>送料</span><span className="price-num">¥{ship.toLocaleString()}</span>
        </div>
        <div style={{padding:'18px 0 0', display:'grid', gridTemplateColumns:'1fr auto', alignItems:'baseline'}}>
          <span className="kanji-h" style={{letterSpacing:'0.24em'}}>合計 (税込)</span>
          <span className="price-num" style={{fontSize: 26}}>¥{total.toLocaleString()}</span>
        </div>
      </div>

      <div style={{display:'flex', justifyContent:'space-between', marginTop:40}}>
        <button className="btn btn-line" onClick={()=>go("delivery")}>← 内容を修正する</button>
        <button className="btn btn-accent" onClick={submit}>この内容で注文を確定する</button>
      </div>
      <div style={{fontSize:11, color:'var(--ink-mute)', marginTop: 16, textAlign:'right', letterSpacing:'0.1em'}}>
        ※ ご注文確定後、担当者より確認のお電話を差し上げます。
      </div>
    </section>
  );
};

const SuccessPage = ({ orderNo, go, setCart }) => (
  <section className="shell">
    <div className="success">
      <Kamon />
      <h1>御注文を承りました</h1>
      <div className="kanji-h" style={{fontSize:15, color:'var(--ink-mute)', letterSpacing:'0.16em', lineHeight: 2.2}}>
        この度はご利用頂き、誠にありがとうございます。<br/>
        担当者よりご確認のお電話を差し上げます。<br/>
        心を込めてお仕立て申し上げます。
      </div>
      <div className="order-no">ご注文番号　／　{orderNo || "—"}</div>
      <div style={{marginTop: 40, display:'flex', gap: 12, justifyContent:'center'}}>
        <button className="btn btn-ghost" onClick={()=>{ setCart([]); go("top"); }}>トップへ戻る</button>
        <button className="btn btn-line" onClick={()=>go("list")}>お品書きを見る</button>
      </div>
    </div>
  </section>
);

Object.assign(window, { ConfirmPage, SuccessPage });
