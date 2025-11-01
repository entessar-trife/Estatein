// ===== Type =====
export type DataAttrs = Record<string, string>;

// ===== Core (Builder + Shortcuts) =====
type AosOptions = {
  duration?: number;
  delay?: number;
  once?: boolean;
  anchor?: string;
  anchorPlacement?: string;
  offset?: number;
  easing?: string;
  mirror?: boolean;
};

const S = (v?: string | number | boolean) =>
  v === undefined ? undefined : String(v);

const buildAos = (name: string, o: AosOptions = {}): DataAttrs => {
  const attrs: Record<string, string | undefined> = {
    "data-aos": name,
    "data-aos-duration": S(o.duration),
    "data-aos-delay": S(o.delay),
    "data-aos-once": S(o.once),
    "data-aos-anchor": o.anchor,
    "data-aos-anchor-placement": o.anchorPlacement,
    "data-aos-offset": S(o.offset),
    "data-aos-easing": o.easing,
    "data-aos-mirror": S(o.mirror),
  };
  Object.keys(attrs).forEach((k) => attrs[k] === undefined && delete attrs[k]);
  return attrs as DataAttrs;
};

const aos = {
  fade: (o?: AosOptions) => buildAos("fade", o),
  fadeUp: (o?: AosOptions) => buildAos("fade-up", o),
  fadeLeft: (o?: AosOptions) => buildAos("fade-left", o),
  fadeRight: (o?: AosOptions) => buildAos("fade-right", o),
  zoomIn: (o?: AosOptions) => buildAos("zoom-in", o),
  zoomOut: (o?: AosOptions) => buildAos("zoom-out", o),
  zoomInUp: (o?: AosOptions) => buildAos("zoom-in-up", o),
  flipUp: (o?: AosOptions) => buildAos("flip-up", o),
  flipLeft: (o?: AosOptions) => buildAos("flip-left", o),
};

// ===== Patterns (Stagger Helpers) =====
// const centerOutOrder = (n: number) =>
//   n === 5 ? [2, 1, 3, 0, 4] :
//   n === 4 ? [1, 2, 0, 3] :
//   n === 3 ? [1, 0, 2]   :
//   Array.from({ length: n }, (_, i) => i);

// const centerOutDelay = (i: number, total: number, start = 140, step = 110) => {
//   const ord = centerOutOrder(total)[i] ?? i;
//   return start + ord * step;
// };

const twoColsWaveDelay = (i: number, rowStep = 160, rightBonus = 90) => {
  const col = i % 2;
  const row = Math.floor(i / 2);
  return row * rowStep + (col ? rightBonus : 0);
};

const threeColsGridDelay = (i: number) => {
  const row = Math.floor(i / 3);
  const col = i % 3;
  const rowBase = row * 180;
  const colDelay = col === 1 ? 0 : 140;
  return rowBase + colDelay;
};

// ============================================================================
// NAVBAR
// ============================================================================

export const navMobileBlurAos = (): DataAttrs =>
  buildAos("fade", {
    duration: 400,
    easing: "linear", // linear كما طلبت
    once: true,
  });

  
export const navRootAos = (): DataAttrs =>
  // nav container
  buildAos("fade-down", {
    duration: 600,
    easing: "ease-out-cubic",
    once: true,
  });

export const navDesktopItemAos = (index: number): DataAttrs =>
  aos.fadeUp({ duration: 500, delay: index * 80, once: true });

export const navDesktopContactAos = (): DataAttrs =>
  aos.zoomIn({ duration: 500, delay: 120, once: true });

export const navMobileContainerAos = (): DataAttrs =>
  buildAos("fade-down", {
    duration: 400,
    easing: "ease-out-cubic",
    once: true,
  });

export const navMobileItemAos = (index: number): DataAttrs =>
  aos.fadeUp({ duration: 450, delay: index * 70, once: true });

export const navMobileContactAos = (count: number): DataAttrs =>
  aos.zoomIn({ duration: 450, delay: count * 70, once: true });

// ============================================================================
// HERO
// ============================================================================
export const heroRootAos = (): DataAttrs =>
  aos.fade({ duration: 400, easing: "ease-out-cubic", once: false });

export const heroLeftColAos = (): DataAttrs =>
  aos.fadeRight({
    duration: 800,
    offset: 0,
    anchor: "#hero-root",
    anchorPlacement: "top-bottom",
  });

export const heroH1Aos = (): DataAttrs =>
  aos.fadeUp({ duration: 700, delay: 0, anchor: "#hero-root", once: false });

export const heroDescAos = (): DataAttrs =>
  aos.fadeUp({ duration: 700, delay: 120, anchor: "#hero-root", once: false });

export const heroBtnAboutAos = (): DataAttrs =>
  aos.zoomIn({ duration: 600, delay: 180, anchor: "#hero-root", once: false });

export const heroBtnBrowseAos = (): DataAttrs =>
  aos.zoomIn({ duration: 600, delay: 260, anchor: "#hero-root", once: false });

export const heroCountUpAos = (): DataAttrs =>
  aos.flipUp({ duration: 750, delay: 340, anchor: "#hero-root", once: false });

export const heroRightColAos = (): DataAttrs =>
  aos.fadeLeft({
    duration: 900,
    delay: 120,
    anchor: "#hero-root",
    once: false,
  });

export const heroBgAos = (): DataAttrs =>
  aos.zoomOut({
    duration: 1200,
    delay: 0,
    anchor: "#hero-right",
    anchorPlacement: "top-center",
    once: false,
  });

export const heroMobileImgAos = (): DataAttrs =>
  aos.fadeLeft({
    duration: 800,
    delay: 160,
    anchor: "#hero-right",
    offset: 0,
    once: false,
  });

export const heroRotatingAos = (): DataAttrs =>
  aos.zoomInUp({
    duration: 900,
    delay: 280,
    anchor: "#hero-right",
    once: false,
  });

export const heroDesktopImgAos = (): DataAttrs =>
  aos.fadeLeft({
    duration: 900,
    delay: 160,
    anchor: "#hero-root",
    offset: 0,
    once: false,
  });

// ============================================================================
// EXPERIENCE (ExperienceSection + Team/Achievements helpers)
// ============================================================================
const effectForIndex = (i: number) => {
  const col = i % 3;
  if (col === 1) return "zoom-in";
  if (col === 0) return "fade-left";
  return "fade-right";
};

export const getCenterOutAos = (i: number): DataAttrs => {
  const d = threeColsGridDelay(i);
  const eff = effectForIndex(i);
  if (eff === "zoom-in") return aos.zoomIn({ duration: 650, delay: d });
  if (eff === "fade-left") return aos.fadeLeft({ duration: 650, delay: d });
  return aos.fadeRight({ duration: 650, delay: d });
};

export const getFadeUpOnce = (duration = 500): DataAttrs =>
  aos.fadeUp({ duration });

export const teamItemAos = (index: number): DataAttrs =>
  aos.fadeUp({ duration: 600, delay: index * 300 });

// ============================================================================
// PROPERTY VALUE (pv)
// ============================================================================
export const pvSectionAos = (): DataAttrs =>
  aos.fadeUp({ duration: 600, once: false });

export const pvGridAos = (): DataAttrs =>
  aos.fadeUp({ duration: 500, once: false });

export const pvCardAos = (index: number): DataAttrs =>
  aos.fadeUp({ duration: 650, delay: index * 120, once: false });

export const pvUnlockAos = (cardsCount: number): DataAttrs =>
  aos.zoomIn({ duration: 700, delay: cardsCount * 120, once: false });

// ============================================================================
// INVESTMENTS (inv)
// ============================================================================
export const invSectionAos = (): DataAttrs =>
  aos.fadeUp({ duration: 600, once: false });

export const invLeftColAos = (): DataAttrs =>
  aos.fadeRight({ duration: 650, once: false });

export const invUnlockAos = (): DataAttrs =>
  aos.flipUp({ duration: 700, delay: 120, once: false });

export const invGridAos = (): DataAttrs =>
  aos.fadeUp({ duration: 500, once: false });

export const invCardAos = (index: number): DataAttrs => {
  const d = twoColsWaveDelay(index);
  return index % 2
    ? aos.fadeLeft({ duration: 650, delay: d, once: false })
    : aos.fadeRight({ duration: 650, delay: d, once: false });
};

// ============================================================================
// OFFICE CARD
// ============================================================================
export const officeCardAos = (): DataAttrs =>
  aos.fadeUp({ duration: 650, once: false });

export const officeInfoItemAos = (index: number): DataAttrs =>
  aos.fadeUp({ duration: 500, delay: 100 + index * 100, once: false });

export const officeButtonAos = (delay = 350): DataAttrs =>
  aos.zoomIn({ duration: 600, delay, once: false });

// ============================================================================
// TEAM GALLERY
// ============================================================================
export const tgContainerAos = (): DataAttrs =>
  aos.fadeUp({ duration: 600, once: true });

export const tgImgAos = (delay: number): DataAttrs =>
  aos.zoomIn({ duration: 600, delay, once: true });

export const tgTitleAos = (): DataAttrs =>
  aos.fadeRight({ duration: 650, once: true });

export const tgRightImgAos = (delay = 120): DataAttrs =>
  aos.fadeLeft({ duration: 650, delay, once: true });
