// Cart page

const CartPage = ({ cart, setCart, go }) => {
  const subtotal = cart.reduce((s, c) => s + c.price * c.qty, 0);
  const hasFrozen = cart.some(c => c.freeze);
  const hasFresh = cart.some(c => !c.freeze);
  // Frozen: ¥1,500 per ship / free over ¥10,000
  const frozenSubtotal = cart.filter(c=>c.freeze).reduce((s,c)=>s+c.price*c.qty, 0);
  const freshSubtotal  = cart.filter(c=>!c.freeze).reduce((s,c)=>s+c.price*c.qty, 0);
  const frozenShip = hasFrozen ? (frozenSubtotal >= 10000 ? 0 : 1500) : 0;
  const freshShip  = hasFresh ? 0 : 0; // local catering — no per-order shipping charge shown
  const ship = frozenShip + freshShip;
  const total = subtotal + ship;

  // Minimum order rule: fresh/local catering requires ¥30,000+
  const freshBelowMin = hasFresh && freshSubtotal < 30000;
  const canCheckout = cart.length > 0 && !freshBelowMin;

  const setQty = (id, q) => setCart(cart.map(c => c.id === id ? {...c, qty: Math.max(1, q)} : c));
  const remove = (id) => setCart(cart.filter(c => c.id !== id));

  return (
    <section className="shell">
      <div className="crumb">
        <a onClick={()=>go("top")}>ホーム</a><span className="sep">/</span>御買物籠
      </div>
      <div className="list-head" style={{marginTop: 32}}>
        <div>
          <h1>御買物籠</h1>
          <div className="count">{cart.length} ITEMS · 合計 {cart.reduce((s,c)=>s+c.qty,0)} 点</div>
        </div>
      </div>
      <div className="cart-shell">
        <div>
          {cart.length === 0 ? (
            <div style={{padding:'80px 20px', textAlign:'center', color:'var(--ink-mute)'}}>
              <Kamon style={{marginBottom: 24}} />
              <div className="kanji-h" style={{fontSize:20, marginBottom: 16}}>まだ御品が入っておりません</div>
              <button className="btn btn-ghost" onClick={()=>go("list")}>お品書きを見る</button>
            </div>
          ) : cart.map(item => (
            <div className="cart-row" key={item.id}>
              <div className="ph"><div className="ph-label">#{item.id}</div></div>
              <div>
                <div className="n">{item.ja}
                  {item.freeze && <span style={{marginLeft:10, fontFamily:'var(--f-mono)', fontSize:10, letterSpacing:'0.2em', color:'var(--accent)', border:'1px solid var(--accent)', padding:'2px 6px'}}>冷凍</span>}
                </div>
                <div className="sub">{item.en} · {item.serves}</div>
                <div style={{marginTop:10}}>
                  <div className="qty" style={{transform:'scale(0.9)', transformOrigin:'left'}}>
                    <button onClick={()=>setQty(item.id, item.qty-1)}>−</button>
                    <input value={item.qty} onChange={e=>setQty(item.id, parseInt(e.target.value)||1)} />
                    <button onClick={()=>setQty(item.id, item.qty+1)}>+</button>
                  </div>
                </div>
              </div>
              <div className="p">¥{(item.price * item.qty).toLocaleString()}</div>
              <div className="x" onClick={()=>remove(item.id)}>×</div>
            </div>
          ))}
        </div>
        <aside className="summary">
          <h3>御精算</h3>
          <div className="row"><span>小計</span><span className="v">¥{subtotal.toLocaleString()}</span></div>
          {hasFresh && (
            <div className="row"><span>ケータリング小計</span><span className="v">¥{freshSubtotal.toLocaleString()}</span></div>
          )}
          {hasFrozen && (
            <div className="row">
              <span>冷凍便送料<span style={{fontSize:10, letterSpacing:'0.14em', color:'var(--ink-mute)', marginLeft:8}}>¥10,000以上で無料</span></span>
              <span className="v">{frozenShip === 0 ? "無料" : `¥${frozenShip.toLocaleString()}`}</span>
            </div>
          )}
          <div className="row total"><span>合計 (税込)</span><span className="v">¥{total.toLocaleString()}</span></div>

          {freshBelowMin && (
            <div style={{marginTop:12, padding:'12px 14px', background:'var(--accent-soft)', border:'1px solid var(--accent)', fontSize:12, lineHeight:1.8, color:'var(--accent)', letterSpacing:'0.04em'}}>
              ケータリング（神奈川・東京 当日便）は <b style={{fontFamily:'var(--f-mono)'}}>¥30,000</b> 以上からのお受付となります。<br/>
              あと <b style={{fontFamily:'var(--f-mono)'}}>¥{(30000 - freshSubtotal).toLocaleString()}</b> でご注文いただけます。
            </div>
          )}

          <button className="btn btn-accent" style={{width:'100%', marginTop: 20, opacity: canCheckout?1:0.4, cursor: canCheckout?'pointer':'not-allowed'}}
                  disabled={!canCheckout} onClick={()=>canCheckout && go("delivery")}>
            配達指定へ進む　→
          </button>
          <button className="btn btn-line" style={{width:'100%', marginTop: 10}} onClick={()=>go("list")}>
            お買物を続ける
          </button>
          <div style={{fontSize: 11, color:'var(--ink-mute)', marginTop: 20, lineHeight: 1.9, letterSpacing:'0.06em'}}>
            冷凍便 : 1配送先あたり ¥1,500 （¥10,000以上で無料）<br/>
            ケータリング : ¥30,000以上のご注文より承ります<br/>
            法人様は請求書払いがご利用いただけます
          </div>
        </aside>
      </div>
    </section>
  );
};

Object.assign(window, { CartPage });
