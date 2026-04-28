// Listing page

const ListPage = ({ onOpen }) => {
  const { PRODUCTS, CATEGORIES } = window.IZUMI_DATA;
  const [cat, setCat] = React.useState("all");
  const [price, setPrice] = React.useState("all");
  const [frozen, setFrozen] = React.useState("all");
  const items = PRODUCTS.filter(p => {
    if (cat !== "all" && p.cat !== cat) return false;
    if (frozen === "yes" && !p.freeze) return false;
    if (frozen === "no" && p.freeze) return false;
    if (price === "under3") return p.price < 3000;
    if (price === "3-6") return p.price >= 3000 && p.price < 6000;
    if (price === "over6") return p.price >= 6000;
    return true;
  });
  return (
    <section className="shell">
      <div className="crumb">
        <a>ホーム</a><span className="sep">/</span><a>商品一覧</a>
        {cat !== "all" && <React.Fragment><span className="sep">/</span>{CATEGORIES.find(c=>c.id===cat)?.ja}</React.Fragment>}
      </div>
      <div className="list-shell">
        <aside className="filter-col">
          <div className="group">
            <h3>品目</h3>
            <label className={cat==="all" ? "on" : ""} onClick={()=>setCat("all")}>
              <span>すべて</span><span className="n">{PRODUCTS.length}</span>
            </label>
            {CATEGORIES.map(c => (
              <label key={c.id} className={cat===c.id ? "on" : ""} onClick={()=>setCat(c.id)}>
                <span>{c.ja}</span>
                <span className="n">{PRODUCTS.filter(p=>p.cat===c.id).length}</span>
              </label>
            ))}
          </div>
          <div className="group">
            <h3>配送</h3>
            {[
              {k:"all", ja:"指定なし"},
              {k:"yes", ja:"冷凍・全国配送"},
              {k:"no",  ja:"神奈川・東京 当日便"},
            ].map(o => (
              <label key={o.k} className={frozen===o.k ? "on" : ""} onClick={()=>setFrozen(o.k)}>
                <span>{o.ja}</span>
                <span className="n">
                  {o.k==="all" ? PRODUCTS.length :
                   o.k==="yes" ? PRODUCTS.filter(p=>p.freeze).length :
                                 PRODUCTS.filter(p=>!p.freeze).length}
                </span>
              </label>
            ))}
          </div>
          <div className="group">
            <h3>御予算</h3>
            {[
              {k:"all", ja:"指定なし"},
              {k:"under3", ja:"3,000円未満"},
              {k:"3-6", ja:"3,000〜6,000円"},
              {k:"over6", ja:"6,000円以上"},
            ].map(o => (
              <label key={o.k} className={price===o.k ? "on" : ""} onClick={()=>setPrice(o.k)}>
                <span>{o.ja}</span><span className="n">—</span>
              </label>
            ))}
          </div>
          <div className="group">
            <h3>シーン</h3>
            {["パーティー・懇親会","ロケ弁・会合","お食い初め","節句","お祝い・内祝","法要・ご会食"].map(s => (
              <label key={s}><span>{s}</span><span className="n">—</span></label>
            ))}
          </div>
        </aside>
        <div>
          <div className="list-head">
            <div>
              <h1>{cat === "all" ? "お品書き一覧" : CATEGORIES.find(c=>c.id===cat)?.ja}</h1>
              <div className="count">{String(items.length).padStart(2,"0")} ITEMS · 更新 2026.04.20</div>
            </div>
            <div className="list-sort">
              <span className="label-en">Sort</span>
              <select defaultValue="new">
                <option value="new">新着順</option>
                <option value="low">価格の低い順</option>
                <option value="high">価格の高い順</option>
                <option value="pop">人気順</option>
              </select>
            </div>
          </div>
          <div className="prod-grid">
            {items.map(p => <ProductCard key={p.id} p={p} onOpen={onOpen} />)}
          </div>
        </div>
      </div>
    </section>
  );
};

Object.assign(window, { ListPage });
