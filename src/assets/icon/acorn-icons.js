let instance;
const DEFAULT_ATTRS = {
    xmlns: 'http://www.w3.org/2000/svg',
    width: 20,
    height: 20,
    viewBox: '0 0 20 20',
    fill: 'none',
    stroke: 'currentColor',
    'stroke-width': 1.5,
    'stroke-linecap': 'round',
    'stroke-linejoin': 'round',
  },
  DEFAULT_ICON = {
    acorn:
      '<path d="M3.5 6.07004C3.5 4.89594 4.19122 3.83444 5.33063 3.55117C6.45204 3.27236 8.04728 3 10 3C11.9527 3 13.548 3.27236 14.6694 3.55117C15.8088 3.83444 16.5 4.89594 16.5 6.07004V6.71941C16.5 8.63282 14.3903 9.89133 12.5447 9.38659C11.7112 9.15865 10.8321 9 10 9C9.16785 9 8.28883 9.15865 7.45535 9.38659C5.60971 9.89133 3.5 8.63282 3.5 6.71941V6.07004Z"></path><path d="M4.5 8.5L4.85495 13.1144C4.94678 14.3081 5.56849 15.3979 6.54932 16.0845L8.27961 17.2957C9.31257 18.0188 10.6874 18.0188 11.7204 17.2957L13.4507 16.0845C14.4315 15.3979 15.0532 14.3081 15.145 13.1144L15.5 8.5"></path><path d="M12 1L11.6971 1.04328C10.7233 1.18238 10 2.01635 10 3"></path>',
  };
class AcornIcons {
  constructor(e = {}) {
    return (
      instance || ((instance = this), (instance.icons = DEFAULT_ICON)),
      e && (instance.icons = Object.assign(instance.icons, e)),
      instance
    );
  }
  replace() {
    if ('undefined' == typeof document)
      throw new Error('`AcornIcons.replace()` only works in a browser environment.');
    const e = document.querySelectorAll('[data-acorn-icon]');
    Array.from(e).forEach((e) => this._replaceElement(e));
  }
  _replaceElement(e = {}) {
    const n = this._getAttrs(e),
      t = n.icon;
    if ((delete n.icon, this.icons[t])) {
      const r = this._toSvg(this.icons[t], {
          ...n,
          class: `acorn-icons acorn-icons-${t} ${n.class}`,
        }),
        o = new DOMParser().parseFromString(r, 'image/svg+xml').querySelector('svg');
      e.parentNode.replaceChild(o, e);
    } else console.warn(`[AcornIcons] ${t} icon is not defined.`);
  }
  _getAttrs(e) {
    return Array.from(e.attributes).reduce((e, n) => {
      const t = n.name.replace('data-acorn-', '');
      return 'size' === t ? ((e.width = n.value), (e.height = n.value)) : (e[t] = n.value), e;
    }, {});
  }
  _toSvg(e, n = {}) {
    const t = { ...DEFAULT_ATTRS, ...n };
    return `<svg ${this._attrsToString(t)}>${e}</svg>`;
  }
  _attrsToString(e) {
    return Object.keys(e)
      .map((n) => `${n}="${e[n]}"`)
      .join(' ');
  }
}
