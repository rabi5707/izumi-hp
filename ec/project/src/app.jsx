// App root — routing + state.

const STORAGE_KEY = "izumi_ec_state_v1";

function App() {
  const saved = (() => { try { return JSON.parse(localStorage.getItem(STORAGE_KEY)) || {}; } catch { return {}; } })();
  const [page, setPage] = React.useState(saved.page || "top");
  const [areaKey, setAreaKey] = React.useState(saved.areaKey || "yokohama");
  const [detailItem, setDetailItem] = React.useState(saved.detailItem || null);
  const [cart, setCart] = React.useState(saved.cart || []);
  const [deliveryData, setDeliveryData] = React.useState(saved.deliveryData || null);
  const [orderNo, setOrderNo] = React.useState(saved.orderNo || null);
  const [tweaksVisible, setTweaksVisible] = React.useState(false);
  const [tweaks, setTweaks] = React.useState(window.__TWEAKS);

  // persist
  React.useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ page, detailItem, cart, deliveryData, orderNo }));
  }, [page, detailItem, cart, deliveryData, orderNo]);

  // apply tweaks to <html>
  React.useEffect(() => {
    const h = document.documentElement;
    h.setAttribute("data-palette", tweaks.palette);
    h.setAttribute("data-heading", tweaks.headingFont);
    h.setAttribute("data-density", tweaks.density);
    h.setAttribute("data-card", tweaks.cardShape);
  }, [tweaks]);

  // parent tweaks wiring
  React.useEffect(() => {
    const onMsg = (e) => {
      const d = e.data || {};
      if (d.type === '__activate_edit_mode') setTweaksVisible(true);
      if (d.type === '__deactivate_edit_mode') setTweaksVisible(false);
    };
    window.addEventListener('message', onMsg);
    window.parent.postMessage({type: '__edit_mode_available'}, '*');
    return () => window.removeEventListener('message', onMsg);
  }, []);

  const go = (k, item) => {
    if (k === "detail" && item) setDetailItem(item);
    if (k && k.startsWith && k.startsWith("area:")) {
      setAreaKey(k.slice(5));
      setPage("area");
    } else {
      setPage(k);
    }
    window.scrollTo({top: 0, behavior: 'instant'});
  };

  const onOpenProduct = (p) => go("detail", p);

  const addToCart = (p, qty) => {
    const exists = cart.find(c => c.id === p.id);
    if (exists) setCart(cart.map(c => c.id === p.id ? {...c, qty: c.qty + qty} : c));
    else setCart([...cart, { ...p, qty }]);
  };

  const cartCount = cart.reduce((s, c) => s + c.qty, 0);

  return (
    <React.Fragment>
      <SiteHeader page={page === "detail" ? "list" : page} go={go} cartCount={cartCount} />

      {page === "top"      && <TopPage onOpen={onOpenProduct} go={go} />}
      {page === "list"     && <ListPage onOpen={onOpenProduct} />}
      {page === "detail"   && detailItem && <DetailPage p={detailItem} addToCart={addToCart} go={go} />}
      {page === "cart"     && <CartPage cart={cart} setCart={setCart} go={go} />}
      {page === "delivery" && <DeliveryPage go={go} deliveryData={deliveryData} setDeliveryData={setDeliveryData} />}
      {page === "confirm"  && <ConfirmPage cart={cart} deliveryData={deliveryData} go={go} setCart={setCart} setOrderNo={setOrderNo} />}
      {page === "success"  && <SuccessPage orderNo={orderNo} go={go} setCart={setCart} />}
      {page === "about"    && <AboutPage go={go} />}
      {page === "area"     && <AreaPage area={areaKey} go={go} onOpen={onOpenProduct} />}
      {page === "journal"  && <JournalPage go={go} />}
      {["contact","delivery_info"].includes(page) && (
        <section className="shell" style={{padding:'80px 0', textAlign:'center', color:'var(--ink-mute)'}}>
          <Kamon /><div style={{marginTop:24}} className="kanji-h">このページは只今準備中でございます</div>
          <button className="btn btn-ghost" style={{marginTop:24}} onClick={()=>go("top")}>トップへ戻る</button>
        </section>
      )}

      <SiteFooter />

      <TweaksPanel visible={tweaksVisible} onClose={()=>setTweaksVisible(false)} tweaks={tweaks} setTweaks={setTweaks} />
    </React.Fragment>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
