import { CSSProperties } from 'react';
import { LayoutContext } from '../hooks/use-layout';

export const unitFormatter = (v: number, unit: string) => `${v}${unit}`;

export type Size = { width: number; height: number };

export const computeLayout = (oldLayout: LayoutContext, { width, height }: Size) => {
  const { w, h, maxScale, minScale, scale: oldScale } = oldLayout;

  const newLayout = { ...oldLayout };

  const scale = oldScale.slice(0);

  if (w && typeof w === 'number') {
    const scale_x = parseFloat((width / w).toFixed(2));

    const r = (scale[0] = Math.max(Math.min(scale_x, maxScale[0]), minScale[0]));

    // console.log('scale_x', scale_x);

    Object.assign(newLayout, { scale, w: w * r });
  }

  if (h && typeof h === 'number') {
    const scale_y = parseFloat((height / h).toFixed(2));

    const r = (scale[1] = Math.max(Math.min(scale_y, maxScale[1] ?? maxScale[0]), minScale[1] ?? minScale[0]));

    // console.log('scale_y', scale_y);

    Object.assign(newLayout, { scale, h: h * r });
  }

  return newLayout;
};

export const computeLayoutStyle = (
  { w, h, t, b, l, r }: LayoutContext,
  { scale: [scale_x, scale_y], unit }: LayoutContext,
) => {
  const s: CSSProperties = {};

  if (w) s.width = typeof w === 'boolean' ? '100%' : unitFormatter(w * scale_x, unit);

  if (s.width) s['--width'] = s.width;

  if (h) s.height = typeof h === 'boolean' ? '100%' : unitFormatter(h * scale_y, unit);

  if (s.height) s['--height'] = s.height;

  if (t && typeof t === 'number') s.top = unitFormatter(t * scale_y, unit);

  if (b && typeof b === 'number') s.bottom = unitFormatter(b * scale_y, unit);

  if (l && typeof l === 'number') s.left = unitFormatter(l * scale_x, unit);

  if (r && typeof r === 'number') s.right = unitFormatter(r * scale_x, unit);

  return s;
};
