export const ago = (before: Date, after: Date) => {
  const day = 24 * 60 * 60 * 1000;
  return Math.ceil(Math.abs((after.getTime() - before.getTime()) / day));
};

export const range = (start: number, end: number) => {
  return Array.from({ length: end - start + 1 }).map((a, i) => start + i);
};

export const random = (start: number, end: number) => {
  return Math.random() * (end - start) + start;
};

export const shuffle = <T>(a: T[]): T[] => {
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    const x = a[i];
    a[i] = a[j];
    a[j] = x;
  }
  return a;
};

export const image = (src: string, size: number) => {
  return `/_next/image?w=${size}&q=75&url=${src}`;
};

// prettier-ignore
export const resolve = (...paths: (string | number | undefined | null)[]) => {
  const ps = paths.filter(p => p !== null && p !== undefined).map((p) => typeof p === "string" ? p.trim() : String(p)).filter(p => p);
  if (!ps.length) {
    return "/";
  }
  if (/^(https?:)?\/\//i.test(ps[0])) {
    const prefix = ps[0].replace(/\/+$/g, "") + "/";
    const suffix = ps.slice(1).map(p => p.replace(/(^\/+|\/+$|\/{2,})/g, "")).join("/").replace(/(^\/+|\/+$|\/{2,})/g, "");
    return `${prefix}${suffix}`.toLowerCase();
  } else {
    const prefix = "/";
    const suffix = ps.map((p) => p.replace(/(^\/+|\/+$|\/{2,})/g, "")).join("/").replace(/(^\/+|\/+$|\/{2,})/g, "");
    return `${prefix}${suffix}`.toLowerCase();
  }
};

export const pagination = <T = any>(size: number, elements: T[]) => {
  if (size <= 0) {
    throw new Error(`size must be greater than zero.`);
  }
  const pages: T[][] = [];
  for (let i = 0; i < Math.ceil(elements.length / size); i++) {
    pages.push(elements.slice(i * size, i * size + size));
  }
  return pages;
};
