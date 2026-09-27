import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';

const require = createRequire(import.meta.url);
const esbuild = require('esbuild');

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const SRC = path.join(ROOT, 'src');

const SPACING = {
  0: '0',
  0.5: '0.125rem',
  1: '0.25rem',
  1.5: '0.375rem',
  2: '0.5rem',
  2.5: '0.625rem',
  3: '0.75rem',
  3.5: '0.875rem',
  4: '1rem',
  4.5: '1.125rem',
  5: '1.25rem',
  5.5: '1.375rem',
  6: '1.5rem',
  7: '1.75rem',
  8: '2rem',
  9: '2.25rem',
  10: '2.5rem',
  11: '2.75rem',
  12: '3rem',
  14: '3.5rem',
  16: '4rem',
  20: '5rem',
  28: '7rem',
  32: '8rem',
  36: '9rem',
  52: '13rem',
  56: '14rem',
  60: '15rem',
  80: '20rem',
  px: '1px',
};

const PALETTE = {
  'emerald-50': '#ecfdf5',
  'emerald-100': '#d1fae5',
  'emerald-200': '#a7f3d0',
  'emerald-400': '#34d399',
  'emerald-500': '#10b981',
  'emerald-600': '#059669',
  'emerald-700': '#047857',
  'red-50': '#fef2f2',
  'red-100': '#fee2e2',
  'red-300': '#fca5a5',
  'red-400': '#f87171',
  'red-500': '#ef4444',
  'red-600': '#dc2626',
  'amber-50': '#fffbeb',
  'amber-400': '#fbbf24',
  'amber-600': '#d97706',
  'purple-50': '#faf5ff',
  'purple-600': '#9333ea',
  'blue-50': '#eff6ff',
  'blue-600': '#2563eb',
  white: '#ffffff',
  black: '#000000',
  current: 'currentColor',
};

const NAMED = {
  relative: { position: 'relative' },
  absolute: { position: 'absolute' },
  fixed: { position: 'fixed' },
  sticky: { position: 'sticky' },
  'inset-0': { top: '0', right: '0', bottom: '0', left: '0' },
  block: { display: 'block' },
  inline: { display: 'inline' },
  'inline-block': { display: 'inline-block' },
  'inline-flex': { display: 'inline-flex' },
  flex: { display: 'flex' },
  grid: { display: 'grid' },
  hidden: { display: 'none' },
  'flex-1': { flex: '1 1 0%' },
  'flex-col': { 'flex-direction': 'column' },
  'flex-wrap': { 'flex-wrap': 'wrap' },
  'flex-shrink-0': { 'flex-shrink': '0' },
  'shrink-0': { 'flex-shrink': '0' },
  'items-center': { 'align-items': 'center' },
  'items-start': { 'align-items': 'flex-start' },
  'items-end': { 'align-items': 'flex-end' },
  'items-stretch': { 'align-items': 'stretch' },
  'content-start': { 'align-content': 'start' },
  'justify-between': { 'justify-content': 'space-between' },
  'justify-center': { 'justify-content': 'center' },
  'justify-end': { 'justify-content': 'flex-end' },
  'self-center': { 'align-self': 'center' },
  'self-start': { 'align-self': 'flex-start' },
  'min-w-0': { 'min-width': '0' },
  'w-full': { width: '100%' },
  'w-fit': { width: 'fit-content' },
  'w-px': { width: '1px' },
  'h-full': { height: '100%' },
  'h-screen': { height: '100vh' },
  'h-px': { height: '1px' },
  'overflow-hidden': { overflow: 'hidden' },
  'overflow-auto': { overflow: 'auto' },
  'overflow-visible': { overflow: 'visible' },
  'overflow-x-auto': { 'overflow-x': 'auto' },
  'overflow-y-auto': { 'overflow-y': 'auto' },
  'cursor-pointer': { cursor: 'pointer' },
  'pointer-events-none': { 'pointer-events': 'none' },
  truncate: { overflow: 'hidden', 'text-overflow': 'ellipsis', 'white-space': 'nowrap' },
  'whitespace-nowrap': { 'white-space': 'nowrap' },
  'break-all': { 'word-break': 'break-all' },
  'text-left': { 'text-align': 'left' },
  'text-center': { 'text-align': 'center' },
  'text-right': { 'text-align': 'right' },
  uppercase: { 'text-transform': 'uppercase' },
  capitalize: { 'text-transform': 'capitalize' },
  italic: { 'font-style': 'italic' },
  'font-light': { 'font-weight': '300' },
  'font-normal': { 'font-weight': '400' },
  'font-medium': { 'font-weight': '500' },
  'font-semibold': { 'font-weight': '600' },
  'font-bold': { 'font-weight': '700' },
  'font-mono': { 'font-family': "'DM Mono', monospace" },
  'leading-none': { 'line-height': '1' },
  'leading-snug': { 'line-height': '1.375' },
  'leading-relaxed': { 'line-height': '1.625' },
  'tracking-wide': { 'letter-spacing': '0.025em' },
  'tracking-wider': { 'letter-spacing': '0.05em' },
  'tracking-widest': { 'letter-spacing': '0.1em' },
  'tabular-nums': { 'font-variant-numeric': 'tabular-nums', 'font-feature-settings': '"tnum"' },
  'outline-none': { outline: 'none' },
  'resize-none': { resize: 'none' },
  border: { 'border-width': '1px', 'border-style': 'solid' },
  'border-2': { 'border-width': '2px', 'border-style': 'solid' },
  'border-b': { 'border-bottom-width': '1px', 'border-bottom-style': 'solid' },
  'border-t': { 'border-top-width': '1px', 'border-top-style': 'solid' },
  'border-l': { 'border-left-width': '1px', 'border-left-style': 'solid' },
  'border-r': { 'border-right-width': '1px', 'border-right-style': 'solid' },
  'border-dashed': { 'border-style': 'dashed' },
  rounded: { 'border-radius': '0.25rem' },
  'rounded-sm': { 'border-radius': '0.125rem' },
  'rounded-md': { 'border-radius': '0.375rem' },
  'rounded-lg': { 'border-radius': '0.5rem' },
  'rounded-xl': { 'border-radius': '0.75rem' },
  'rounded-2xl': { 'border-radius': '1rem' },
  'rounded-full': { 'border-radius': '9999px' },
  'rounded-bl-sm': { 'border-bottom-left-radius': '0.125rem' },
  'shadow-sm': { 'box-shadow': '0 1px 2px 0 rgb(0 0 0 / 0.05)' },
  shadow: { 'box-shadow': '0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1)' },
  'shadow-md': { 'box-shadow': '0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)' },
  'shadow-lg': { 'box-shadow': '0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)' },
  'shadow-2xl': { 'box-shadow': '0 25px 50px -12px rgb(0 0 0 / 0.25)' },
  'transition-all': {
    'transition-property': 'all',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  },
  'transition-colors': {
    'transition-property': 'color, background-color, border-color, text-decoration-color, fill, stroke',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  },
  'transition-opacity': {
    'transition-property': 'opacity',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  },
  'transition-shadow': {
    'transition-property': 'box-shadow',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  },
  'transition-transform': {
    'transition-property': 'transform',
    'transition-timing-function': 'cubic-bezier(0.4, 0, 0.2, 1)',
    'transition-duration': '150ms',
  },
  'duration-150': { 'transition-duration': '150ms' },
  'duration-200': { 'transition-duration': '200ms' },
  'duration-500': { 'transition-duration': '500ms' },
  'duration-700': { 'transition-duration': '700ms' },
  'animate-spin': { animation: 'ros-spin 1s linear infinite' },
  'animate-pulse': { animation: 'ros-pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite' },
  'animate-bounce': { animation: 'ros-bounce 1s infinite' },
  'backdrop-blur-sm': { 'backdrop-filter': 'blur(4px)' },
  'bg-gradient-to-r': { 'background-image': 'linear-gradient(to right, var(--tw-gradient-from), var(--tw-gradient-to))' },
  'bg-gradient-to-br': { 'background-image': 'linear-gradient(to bottom right, var(--tw-gradient-from), var(--tw-gradient-to))' },
  'col-span-2': { 'grid-column': 'span 2 / span 2' },
  'grid-cols-1': { 'grid-template-columns': 'repeat(1, minmax(0, 1fr))' },
  'grid-cols-2': { 'grid-template-columns': 'repeat(2, minmax(0, 1fr))' },
  'grid-cols-3': { 'grid-template-columns': 'repeat(3, minmax(0, 1fr))' },
  'grid-cols-4': { 'grid-template-columns': 'repeat(4, minmax(0, 1fr))' },
  'grid-cols-5': { 'grid-template-columns': 'repeat(5, minmax(0, 1fr))' },
  'text-xs': { 'font-size': '0.75rem', 'line-height': '1rem' },
  'text-base': { 'font-size': '1rem', 'line-height': '1.5rem' },
  'text-lg': { 'font-size': '1.125rem', 'line-height': '1.75rem' },
  'text-xl': { 'font-size': '1.25rem', 'line-height': '1.75rem' },
  'max-w-xs': { 'max-width': '20rem' },
  'max-w-sm': { 'max-width': '24rem' },
  'max-w-xl': { 'max-width': '36rem' },
  'max-w-4xl': { 'max-width': '56rem' },
  'max-h-60': { 'max-height': '15rem' },
  'mx-auto': { 'margin-left': 'auto', 'margin-right': 'auto' },
  'ml-auto': { 'margin-left': 'auto' },
  'z-10': { 'z-index': '10' },
  'z-20': { 'z-index': '20' },
  'z-50': { 'z-index': '50' },
  'top-0': { top: '0' },
  'right-0': { right: '0' },
  'bottom-0': { bottom: '0' },
  'left-0': { left: '0' },
  'left-1/2': { left: '50%' },
  'top-1/2': { top: '50%' },
  '-translate-x-1/2': { transform: 'translateX(-50%)' },
  '-translate-y-1/2': { transform: 'translateY(-50%)' },
  'ring-2': { 'box-shadow': '0 0 0 2px var(--tw-ring-color, currentColor)' },
  'ring-white': { '--tw-ring-color': '#ffffff' },
  'line-clamp-2': {
    overflow: 'hidden',
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': '2',
  },
  'divide-y': {},
  group: {},
  'gradient-teal': { background: 'linear-gradient(135deg, #0F9D8A 0%, #22C7D6 100%)' },
  'card-shadow': { 'box-shadow': '0 1px 3px rgba(11, 18, 32, 0.06), 0 1px 2px rgba(11, 18, 32, 0.04)' },
  'scrollbar-hide': {},
};

const CUSTOM_DECL = {
  'card-shadow-md': 'box-shadow: 0 4px 12px rgba(11, 18, 32, 0.08), 0 1px 3px rgba(11, 18, 32, 0.05)',
  'hover:card-shadow-md': 'box-shadow: 0 4px 12px rgba(11, 18, 32, 0.08), 0 1px 3px rgba(11, 18, 32, 0.05)',
};

function parseArb(raw) {
  let v = raw;
  if (v.startsWith('[') && v.endsWith(']')) v = v.slice(1, -1);
  if (v.startsWith('#')) {
    const [hex, op] = v.split('/');
    if (op != null) return hexToRgba(hex, op);
    return hex;
  }
  if (v.includes('/')) {
    const [base, op] = v.split('/');
    if (PALETTE[base]) return colorWithAlpha(PALETTE[base], op);
    if (base.startsWith('#')) return hexToRgba(base, op);
  }
  return v.replace(/_/g, ' ');
}

function hexToRgba(hex, op) {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16);
  const g = parseInt(h.slice(2, 4), 16);
  const b = parseInt(h.slice(4, 6), 16);
  const n = parseFloat(op);
  const a = n > 1 ? n / 100 : n;
  return `rgba(${r}, ${g}, ${b}, ${a})`;
}

function colorWithAlpha(color, op) {
  if (color === 'currentColor') return `color-mix(in srgb, currentColor ${parseFloat(op) * (parseFloat(op) > 1 ? 1 : 100)}%, transparent)`;
  if (color.startsWith('#')) return hexToRgba(color, op);
  return color;
}

function opacityFromSlash(op) {
  const n = parseFloat(op);
  return n > 1 ? String(n / 100) : String(n);
}

function space(n) {
  if (SPACING[n] != null) return SPACING[n];
  if (/^\d+(\.\d+)?$/.test(n)) return `${Number(n) * 0.25}rem`;
  return n;
}

function sanitize(cls) {
  if (/^-?[a-zA-Z_][a-zA-Z0-9_-]*$/.test(cls)) return cls;
  return cls
    .replace(/\[([^\]]+)\]/g, (_, inner) =>
      inner
        .replace(/#/g, 'hex-')
        .replace(/\//g, '-')
        .replace(/%/g, 'p')
        .replace(/[()]/g, '')
        .replace(/,/g, '-')
        .replace(/\s+/g, '')
        .replace(/\./g, '_')
        .replace(/:/g, '-'),
    )
    .replace(/hover:/g, 'hover-')
    .replace(/focus:/g, 'focus-')
    .replace(/disabled:/g, 'disabled-')
    .replace(/placeholder:/g, 'placeholder-')
    .replace(/group-hover:/g, 'group-hover-')
    .replace(/last:/g, 'last-')
    .replace(/lg:/g, 'lg-')
    .replace(/md:/g, 'md-')
    .replace(/sm:/g, 'sm-')
    .replace(/xl:/g, 'xl-')
    .replace(/\//g, '-')
    .replace(/%/g, 'p');
}

function declsToCss(decls) {
  return Object.entries(decls)
    .map(([k, v]) => `${k}: ${v}`)
    .join('; ');
}

function colorValue(token) {
  if (token.startsWith('[') && token.endsWith(']')) return parseArb(token);
  if (token.includes('/')) {
    const [base, op] = token.split('/');
    if (PALETTE[base]) {
      const c = PALETTE[base];
      if (c.startsWith('#')) return hexToRgba(c, op);
      if (c === 'currentColor') return `color-mix(in srgb, currentColor ${parseFloat(op) > 1 ? op : parseFloat(op) * 100}%, transparent)`;
    }
    if (base.startsWith('[')) return parseArb(token);
  }
  if (PALETTE[token]) return PALETTE[token];
  return null;
}

function utilityDecls(util) {
  if (NAMED[util]) return NAMED[util];
  if (CUSTOM_DECL[util]) return null;

  let m;

  m = util.match(/^(p|px|py|pt|pr|pb|pl|m|mx|my|mt|mr|mb|ml|gap|gap-x|gap-y|inset|top|right|bottom|left|w|h|min-w|min-h|max-w|max-h)-(.+)$/);
  if (m && !util.startsWith('text-') && !util.startsWith('bg-') && !util.startsWith('border') && !util.startsWith('from-') && !util.startsWith('to-')) {
    const [, kind, rest] = m;
    const val = rest.startsWith('[') ? parseArb(rest) : space(rest);
    const map = {
      p: { padding: val },
      px: { 'padding-left': val, 'padding-right': val },
      py: { 'padding-top': val, 'padding-bottom': val },
      pt: { 'padding-top': val },
      pr: { 'padding-right': val },
      pb: { 'padding-bottom': val },
      pl: { 'padding-left': val },
      m: { margin: val },
      mx: { 'margin-left': val, 'margin-right': val },
      my: { 'margin-top': val, 'margin-bottom': val },
      mt: { 'margin-top': val },
      mr: { 'margin-right': val },
      mb: { 'margin-bottom': val },
      ml: { 'margin-left': val },
      gap: { gap: val },
      'gap-x': { 'column-gap': val },
      'gap-y': { 'row-gap': val },
      top: { top: val },
      right: { right: val },
      bottom: { bottom: val },
      left: { left: val },
      w: { width: val },
      h: { height: val },
      'min-w': { 'min-width': val },
      'min-h': { 'min-height': val },
      'max-w': { 'max-width': val },
      'max-h': { 'max-height': val },
    };
    if (map[kind]) return map[kind];
  }

  if ((m = util.match(/^text-\[(.+)\]$/))) return { 'font-size': m[1] };
  if ((m = util.match(/^leading-\[(.+)\]$/))) return { 'line-height': m[1] };
  if ((m = util.match(/^tracking-\[(.+)\]$/))) return { 'letter-spacing': m[1] };
  if ((m = util.match(/^opacity-\[(.+)\]$/))) return { opacity: m[1] };
  if ((m = util.match(/^opacity-(.+)$/))) return { opacity: opacityFromSlash(m[1]) };

  if ((m = util.match(/^text-(.+)$/))) {
    const c = colorValue(m[1]);
    if (c) return { color: c };
  }
  if ((m = util.match(/^bg-(.+)$/))) {
    if (m[1].startsWith('gradient-')) return NAMED[util] || {};
    const c = colorValue(m[1]);
    if (c) return { 'background-color': c };
  }
  if ((m = util.match(/^border-(.+)$/))) {
    if (['t', 'b', 'l', 'r', '2', 'dashed'].includes(m[1])) return NAMED[util];
    if (m[1] === '0') return { 'border-width': '0' };
    const c = colorValue(m[1]);
    if (c) return { 'border-color': c };
  }
  if ((m = util.match(/^from-\[(.+)\]$/))) {
    const c = parseArb(`[${m[1]}]`);
    return { '--tw-gradient-from': c, '--tw-gradient-to': 'rgb(255 255 255 / 0)' };
  }
  if ((m = util.match(/^to-\[(.+)\]$/))) {
    return { '--tw-gradient-to': parseArb(`[${m[1]}]`) };
  }
  if ((m = util.match(/^grid-cols-\[(.+)\]$/))) {
    return { 'grid-template-columns': m[1].replace(/_/g, ' ') };
  }
  if (util === 'divide-[#F0F4F8]') return null;
  if ((m = util.match(/^-space-x-(.+)$/))) {
    return null;
  }
  if ((m = util.match(/^space-y-(.+)$/))) return null;
  if ((m = util.match(/^ring-\[(.+)\]$/))) return { '--tw-ring-color': parseArb(`[${m[1]}]`) };

  return {};
}

function specialRule(original, sanitized) {
  if (original === 'divide-y') {
    return `.${sanitized} > :not([hidden]) ~ :not([hidden]) { border-top-width: 1px; border-top-style: solid; }`;
  }
  if (original === 'divide-[#F0F4F8]') {
    return `.${sanitized} > :not([hidden]) ~ :not([hidden]) { border-color: #F0F4F8; }`;
  }
  if (original.startsWith('-space-x-')) {
    const n = original.slice('-space-x-'.length);
    return `.${sanitized} > :not([hidden]) ~ :not([hidden]) { margin-left: -${space(n)}; }`;
  }
  if (original.startsWith('space-y-')) {
    const n = original.slice('space-y-'.length);
    return `.${sanitized} > :not([hidden]) ~ :not([hidden]) { margin-top: ${space(n)}; }`;
  }
  if (original === 'scrollbar-hide') {
    return `.${sanitized} { -ms-overflow-style: none; scrollbar-width: none; }\n.${sanitized}::-webkit-scrollbar { display: none; }`;
  }
  if (original === 'group') {
    return `.${sanitized} {}`;
  }
  if (original === 'last:border-0') {
    return `.${sanitized}:last-child { border-width: 0; }`;
  }
  if (original === 'last:border-r-0') {
    return `.${sanitized}:last-child { border-right-width: 0; }`;
  }
  if (original.startsWith('placeholder:')) {
    const inner = original.slice('placeholder:'.length);
    const decls = utilityDecls(inner);
    return `.${sanitized}::placeholder { ${declsToCss(decls)}; }`;
  }
  if (original.startsWith('disabled:')) {
    const inner = original.slice('disabled:'.length);
    const decls = utilityDecls(inner);
    return `.${sanitized}:disabled { ${declsToCss(decls)}; }`;
  }
  if (original.startsWith('group-hover:')) {
    const inner = original.slice('group-hover:'.length);
    const decls = utilityDecls(inner);
    return `.group:hover .${sanitized} { ${declsToCss(decls)}; }`;
  }
  if (original.startsWith('hover:')) {
    const inner = original.slice('hover:'.length);
    if (inner === 'card-shadow-md') {
      return `.${sanitized}:hover { ${CUSTOM_DECL['hover:card-shadow-md']}; }`;
    }
    if (inner.startsWith('scale-[')) {
      const v = inner.slice(7, -1);
      return `.${sanitized}:hover { transform: scale(${v}); }`;
    }
    const decls = utilityDecls(inner);
    if (inner.startsWith('underline')) {
      return `.${sanitized}:hover { text-decoration: underline; }`;
    }
    return `.${sanitized}:hover { ${declsToCss(decls)}; }`;
  }
  if (original.startsWith('focus:')) {
    const inner = original.slice('focus:'.length);
    const decls = utilityDecls(inner);
    if (inner.startsWith('ring-[')) {
      return `.${sanitized}:focus { --tw-ring-color: ${parseArb(inner.slice(5))}; box-shadow: 0 0 0 2px var(--tw-ring-color); }`;
    }
    if (inner === 'ring-2') {
      return `.${sanitized}:focus { box-shadow: 0 0 0 2px var(--tw-ring-color, rgba(15, 157, 138, 0.1)); }`;
    }
    if (inner.startsWith('ring-')) {
      const c = colorValue(inner.slice(5));
      return `.${sanitized}:focus { --tw-ring-color: ${c}; box-shadow: 0 0 0 2px var(--tw-ring-color); }`;
    }
    return `.${sanitized}:focus { ${declsToCss(decls)}; }`;
  }

  const bp = { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' };
  for (const [k, w] of Object.entries(bp)) {
    if (original.startsWith(`${k}:`)) {
      const inner = original.slice(k.length + 1);
      const decls = utilityDecls(inner);
      const extra =
        inner === 'flex'
          ? { display: 'flex' }
          : inner.startsWith('col-span-')
            ? { 'grid-column': `span ${inner.slice(9)} / span ${inner.slice(9)}` }
            : inner === 'block'
              ? { display: 'block' }
              : decls;
      return `@media (min-width: ${w}) { .${sanitized} { ${declsToCss(extra)}; } }`;
    }
  }

  const decls = utilityDecls(original);
  if (decls && Object.keys(decls).length) {
    return `.${sanitized} { ${declsToCss(decls)}; }`;
  }
  if (NAMED[original] && Object.keys(NAMED[original]).length === 0) {
    return null;
  }
  console.warn('Unmapped class:', original);
  return `.${sanitized} { /* unmapped: ${original} */ }`;
}

const classMap = new Map();

function ensureClass(cls) {
  if (!cls || classMap.has(cls)) return;
  const sanitized = sanitize(cls);
  classMap.set(cls, { sanitized, css: specialRule(cls, sanitized) });
}

function rewriteStrings(code, used) {
  let out = '';
  let i = 0;
  while (i < code.length) {
    const ch = code[i];
    if (ch === "'" || ch === '"') {
      const q = ch;
      let j = i + 1;
      let buf = '';
      while (j < code.length) {
        if (code[j] === '\\') {
          buf += code[j] + (code[j + 1] ?? '');
          j += 2;
          continue;
        }
        if (code[j] === q) break;
        buf += code[j];
        j++;
      }
      const replaced = replaceTokens(buf, used);
      out += q + replaced + q;
      i = j + 1;
      continue;
    }
    if (ch === '`') {
      let j = i + 1;
      let chunk = '';
      out += '`';
      while (j < code.length) {
        if (code[j] === '\\') {
          chunk += code[j] + (code[j + 1] ?? '');
          j += 2;
          continue;
        }
        if (code[j] === '`') {
          out += replaceTokens(chunk, used) + '`';
          j++;
          break;
        }
        if (code[j] === '$' && code[j + 1] === '{') {
          out += replaceTokens(chunk, used);
          chunk = '';
          let depth = 1;
          let k = j + 2;
          let expr = '${';
          while (k < code.length && depth) {
            expr += code[k];
            if (code[k] === '{') depth++;
            else if (code[k] === '}') depth--;
            k++;
          }
          out += rewriteStrings(expr, used);
          j = k;
          continue;
        }
        chunk += code[j];
        j++;
      }
      i = j;
      continue;
    }
    out += ch;
    i++;
  }
  return out;
}

function replaceTokens(text, used) {
  return text
    .split(/(\s+)/)
    .map((tok) => {
      if (/^\s+$/.test(tok) || tok === '') return tok;
      if (classMap.has(tok)) {
        used.add(tok);
        return classMap.get(tok).sanitized;
      }
      return tok;
    })
    .join('');
}

function walk(dir, acc = []) {
  for (const f of fs.readdirSync(dir, { withFileTypes: true })) {
    const p = path.join(dir, f.name);
    if (f.isDirectory()) walk(p, acc);
    else acc.push(p);
  }
  return acc;
}

function collectClassesFromSource(t) {
  const re = /className=\{?`([\s\S]*?)`\}?|className="([^"]*)"|className='([^']*)'|['"`]([^'"`]*?)['"`]/g;
  let m;
  const set = new Set();
  while ((m = re.exec(t))) {
    const raw = (m[1] || m[2] || m[3] || m[4] || '').replace(/\$\{[^}]+\}/g, ' ');
    raw.split(/\s+/).forEach((c) => {
      if (c && classLooksLikeUtility(c)) set.add(c);
    });
  }
  return set;
}

function classLooksLikeUtility(c) {
  if (c.includes('${')) return false;
  if (c.length > 80) return false;
  return (
    /^(flex|grid|hidden|block|inline|absolute|relative|sticky|fixed|truncate|group|border|rounded|shadow|overflow|items-|justify-|self-|gap-|p[trblxy]?-|m[trblxy]?-|w-|h-|min-|max-|text-|bg-|font-|leading-|tracking-|opacity-|z-|top-|left-|right-|bottom-|inset-|col-|row-|hover:|focus:|disabled:|placeholder:|group-hover:|last:|sm:|md:|lg:|xl:|from-|to-|ring-|space-|divide-|animate-|transition-|duration-|cursor-|pointer-|whitespace-|break-|line-clamp-|tabular|uppercase|capitalize|italic|outline-|resize-|shrink-|grow-|content-|place-|order-|basis-|decoration-|underline|card-shadow|gradient-teal|scrollbar-hide|-space-|-translate-)/.test(
      c,
    )
  );
}

const KEYFRAMES = `
@keyframes ros-spin { to { transform: rotate(360deg); } }
@keyframes ros-pulse { 50% { opacity: 0.5; } }
@keyframes ros-bounce {
  0%, 100% { transform: translateY(-25%); animation-timing-function: cubic-bezier(0.8, 0, 1, 1); }
  50% { transform: none; animation-timing-function: cubic-bezier(0, 0, 0.2, 1); }
}
`;

async function main() {
  const files = walk(SRC).filter((f) => /\.(tsx|ts)$/.test(f) && !f.endsWith('.d.ts'));

  for (const file of files) {
    const src = fs.readFileSync(file, 'utf8');
    for (const cls of collectClassesFromSource(src)) ensureClass(cls);
  }

  for (const file of files) {
    const source = fs.readFileSync(file, 'utf8');
    const loader = file.endsWith('.tsx') ? 'tsx' : 'ts';
    const result = await esbuild.transform(source, {
      loader,
      jsx: 'automatic',
      format: 'esm',
      target: 'es2020',
    });
    let code = result.code;
    const used = new Set();
    code = rewriteStrings(code, used);

    const outExt = file.endsWith('.tsx') ? '.jsx' : '.js';
    const outFile = file.replace(/\.tsx?$/, outExt);

    if (file.endsWith('.tsx')) {
      const cssName = path.basename(file).replace(/\.tsx$/, '.css');
      const cssPath = path.join(path.dirname(file), cssName);
      const rules = [...used]
        .map((c) => classMap.get(c)?.css)
        .filter(Boolean);
      const css = `/* Converted from Tailwind classes in ${path.basename(file)} */\n${KEYFRAMES}\n${[...new Set(rules)].join('\n')}\n`;
      fs.writeFileSync(cssPath, css);
      if (!code.includes(`import './${cssName}'`) && !code.includes(`import "./${cssName}"`)) {
        code = `import './${cssName}';\n` + code;
      }
    }

    fs.writeFileSync(outFile, code);
    console.log('wrote', path.relative(ROOT, outFile), 'classes', used.size);
  }

  const viteTs = path.join(ROOT, 'vite.config.ts');
  const viteSrc = fs.readFileSync(viteTs, 'utf8');
  const viteOut = await esbuild.transform(viteSrc, { loader: 'ts', format: 'esm', target: 'es2020' });
  let viteJs = viteOut.code.replace("tailwindcss()", '').replace(/import tailwindcss from '@tailwindcss\/vite';?\n/, '');
  viteJs = viteJs.replace(/,\s*tailwindcss\(\)/, '');
  viteJs = viteJs.replace(/tailwindcss\(\),\s*/, '');
  fs.writeFileSync(path.join(ROOT, 'vite.config.js'), viteJs);
  console.log('wrote vite.config.js');
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
