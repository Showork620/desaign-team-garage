const $ = (selector) => document.querySelector(selector);
const fields = ["productName","brewery","origin","style","abv","price","description"];
const state = { slots: Array(18).fill(null) };

const copyByStyle = {
  "Hazy IPA": "熟したマンゴーや柑橘を思わせる華やかな香り。ジューシーな口当たりとやわらかな苦味が心地よく広がる、飲みごたえと親しみやすさを兼ね備えたヘイジーIPAです。",
  "IPA": "グレープフルーツや松を思わせる鮮烈なホップの香り。しっかりとした苦味を麦芽のほのかな甘みが支える、輪郭のある味わいのIPAです。",
  "Pale Ale": "柑橘を思わせる爽やかな香りと、ほどよい苦味。麦芽の香ばしさとのバランスがよく、食事にも合わせやすい軽快なペールエールです。",
  "Lager": "澄んだ麦芽の風味と、きれいな後味が魅力。軽やかな口当たりの中に穏やかなコクがあり、最初の一杯にもおすすめのラガーです。",
  "White Ale": "オレンジピールのような香りと、やさしいスパイス感。小麦由来のまろやかな口当たりで、軽やかに楽しめるホワイトエールです。",
  "Stout": "ロースト麦芽由来のコーヒーやビターチョコを思わせる香ばしさ。なめらかなコクと穏やかな余韻を、ゆっくり楽しみたいスタウトです。",
  "Sour": "果実を思わせるみずみずしい香りと、きゅっと心地よい酸味。後味は軽快で、気分をすっきり切り替えたいときにおすすめのサワーエールです。"
};

function values() {
  return Object.fromEntries(fields.map(id => [id, $("#" + id).value.trim()]));
}

function escapeHtml(value="") {
  return value.replace(/[&<>'"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;","'":"&#39;",'"':"&quot;"}[c]));
}

function cardMarkup(data) {
  return `<div class="card-meta">
    <div class="card-name">${escapeHtml(data.productName || "商品名")}</div>
    <div class="card-facts"><div>ABV ${escapeHtml(data.abv || "-")}％ ／ ${escapeHtml(data.style || "BEER")}</div><div>税込 ¥${escapeHtml(data.price || "-")}</div></div>
  </div>
  <div class="card-body">
    <div class="card-brewery"><span>${escapeHtml(data.brewery || "BREWERY")}</span><span>${escapeHtml(data.origin || "ORIGIN")}</span></div>
    <p class="card-description">${escapeHtml(data.description || "説明文を生成すると、ここに商品の魅力を伝える文章が入ります。")}</p>
    <span class="card-price">¥${escapeHtml(data.price || "-")}</span>
  </div>`;
}

function updatePreview() {
  $("#mainPreview").innerHTML = cardMarkup(values());
  $("#charCount").textContent = `${$("#description").value.length} / 120`;
}

function renderSheet() {
  const sheet = $("#printSheet");
  sheet.innerHTML = "";
  state.slots.forEach((data,index) => {
    if (!data) {
      const slot = $("#emptySlotTemplate").content.firstElementChild.cloneNode(true);
      slot.title = `${index + 1}番の空き枠`;
      sheet.append(slot);
      return;
    }
    const card = document.createElement("article");
    card.className = "beer-card";
    card.innerHTML = cardMarkup(data);
    card.title = "クリックしてこのPOPを削除";
    card.addEventListener("click", () => { state.slots[index] = null; renderSheet(); });
    sheet.append(card);
  });
  $("#slotCount").textContent = state.slots.filter(Boolean).length;
}

function generateDescription() {
  const button = $("#generateButton");
  button.classList.add("is-generating");
  button.innerHTML = "<span>✦</span> 文章を整えています…";
  setTimeout(() => {
    const style = $("#style").value;
    $("#description").value = copyByStyle[style] || copyByStyle["Pale Ale"];
    button.classList.remove("is-generating");
    button.innerHTML = "<span>✦</span> 説明文を生成し直す";
    updatePreview();
  }, 650);
}

fields.forEach(id => $("#" + id).addEventListener("input", updatePreview));
$("#generateButton").addEventListener("click", generateDescription);
$("#addButton").addEventListener("click", () => {
  const index = state.slots.findIndex(slot => !slot);
  if (index < 0) return alert("18枠すべて埋まっています。不要なPOPを選んで削除してください。");
  state.slots[index] = values();
  renderSheet();
  $("#sheet-title").scrollIntoView({behavior:"smooth",block:"start"});
});
$("#clearButton").addEventListener("click", () => {
  state.slots.fill(null); renderSheet();
});
$("#printButton").addEventListener("click", () => window.print());
$("#canPhoto").addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) return;
  const status = $("#scanStatus");
  status.textContent = `「${file.name}」を読み取り中…`;
  setTimeout(() => {
    status.textContent = "画像を受け取りました。試作版では候補をフォームで確認・修正してください。";
    $("#productName").focus();
  }, 900);
});

generateDescription();
renderSheet();
