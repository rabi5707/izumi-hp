// Tweaks panel

const TweaksPanel = ({ visible, onClose, tweaks, setTweaks }) => {
  if (!visible) return null;
  const upd = (k, v) => {
    const next = {...tweaks, [k]: v};
    setTweaks(next);
    window.parent && window.parent.postMessage({type: '__edit_mode_set_keys', edits: {[k]: v}}, '*');
  };
  const palettes = [
    { k: "sumi", ja: "墨 / 生成", bg: "#f5f1ea", ink: "#1a1613" },
    { k: "ai",   ja: "藍 / 白",   bg: "#eef0f2", ink: "#0f1620" },
    { k: "cha",  ja: "茶 / 和紙", bg: "#ede4d2", ink: "#2a1f10" },
  ];
  return (
    <div className="tweaks-panel">
      <header>
        <span className="ttl">TWEAKS</span>
        <button className="x" onClick={onClose}>×</button>
      </header>
      <div className="body">
        <div className="g">
          <div className="lbl">Palette · 配色</div>
          <div className="sw">
            {palettes.map(p => (
              <div key={p.k}
                className={"dot" + (tweaks.palette === p.k ? " on" : "")}
                style={{background: p.bg, position:'relative'}}
                title={p.ja}
                onClick={()=>upd("palette", p.k)}>
                <span style={{position:'absolute', right:-2, bottom:-2, width:8, height:8, background: p.ink}}/>
              </div>
            ))}
          </div>
          <div style={{marginTop:8, fontFamily:'var(--f-heading)', fontSize:11, letterSpacing:'0.18em', opacity:0.8}}>
            {palettes.find(p=>p.k===tweaks.palette)?.ja}
          </div>
        </div>

        <div className="g">
          <div className="lbl">Heading · 見出し書体</div>
          <div className="opts">
            <button className={tweaks.headingFont==="serif" ? "on" : ""} onClick={()=>upd("headingFont", "serif")}>明朝体</button>
            <button className={tweaks.headingFont==="sans" ? "on" : ""} onClick={()=>upd("headingFont", "sans")}>ゴシック体</button>
          </div>
        </div>

        <div className="g">
          <div className="lbl">Density · 密度</div>
          <div className="opts">
            <button className={tweaks.density==="compact" ? "on" : ""} onClick={()=>upd("density", "compact")}>Compact</button>
            <button className={tweaks.density==="comfortable" ? "on" : ""} onClick={()=>upd("density", "comfortable")}>Comfort</button>
            <button className={tweaks.density==="spacious" ? "on" : ""} onClick={()=>upd("density", "spacious")}>Spacious</button>
          </div>
        </div>

        <div className="g">
          <div className="lbl">Card · 商品カード</div>
          <div className="opts">
            <button className={tweaks.cardShape==="squared" ? "on" : ""} onClick={()=>upd("cardShape", "squared")}>角</button>
            <button className={tweaks.cardShape==="rounded" ? "on" : ""} onClick={()=>upd("cardShape", "rounded")}>丸</button>
            <button className={tweaks.cardShape==="arched" ? "on" : ""} onClick={()=>upd("cardShape", "arched")}>アーチ</button>
          </div>
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { TweaksPanel });
