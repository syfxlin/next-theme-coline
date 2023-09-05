import { random, range } from "./vender";

export const init = (canvas: HTMLCanvasElement, width: number, height: number) => {
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const ctx = canvas.getContext("2d")!;

  const dpr = window.devicePixelRatio || 1;
  // prettier-ignore
  // @ts-ignore
  const bsr = ctx.webkitBackingStorePixelRatio || ctx.mozBackingStorePixelRatio || ctx.msBackingStorePixelRatio || ctx.oBackingStorePixelRatio || ctx.backingStorePixelRatio || 1;

  const dpi = dpr / bsr;

  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  canvas.width = dpi * width;
  canvas.height = dpi * height;
  ctx.scale(dpi, dpi);

  return { ctx, canvas, dpi };
};

export const render = (canvas: HTMLCanvasElement, width: number, height: number, color: string, weight: number) => {
  const { ctx } = init(canvas, width, height);

  const length = Math.min(width, height) / 2;
  const points = range(0, 60).map(() => [random(-100, width + 100), random(-100, height + 100)]);

  ctx.clearRect(0, 0, width, height);
  ctx.lineWidth = weight;

  let count = 0;
  const step = () => {
    const index = count % 3 === 0 ? count / 3 : -1;
    if (index !== -1 && index < points.length) {
      for (let j = index + 1; j < points.length; j++) {
        const [x1, y1] = points[index];
        const [x2, y2] = points[j];

        if (Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2) < length && random(0, 1) > 0.5) {
          const alpha = Math.round(random(24, 64));
          ctx.strokeStyle = `${color}${alpha.toString(16).padStart(2, "0")}`;
          ctx.beginPath();
          ctx.moveTo(x2, y2);
          ctx.lineTo(x1, y1);
          ctx.stroke();
        }
      }
    }
    count++;
    if (index < points.length) {
      requestAnimationFrame(step);
    }
  };
  requestAnimationFrame(step);
};
