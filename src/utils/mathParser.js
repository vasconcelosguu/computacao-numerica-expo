export function createFunction(expression) {
  const safeExpression = String(expression || '')
    .replaceAll('^', '**')
    .replaceAll('sen', 'sin')
    .replaceAll('tg', 'tan')
    .replaceAll('ln', 'log');

  return function f(x) {
    try {
      const result = Function('x', `
        const sin = Math.sin;
        const cos = Math.cos;
        const tan = Math.tan;
        const exp = Math.exp;
        const log = Math.log;
        const sqrt = Math.sqrt;
        const abs = Math.abs;
        const pow = Math.pow;
        const pi = Math.PI;
        const e = Math.E;
        return ${safeExpression};
      `)(x);
      if (!Number.isFinite(result)) throw new Error('Resultado inválido');
      return result;
    } catch (error) {
      throw new Error('Função inválida. Use exemplos como x*x - 4, sin(x), cos(x) - x ou exp(x) - 2.');
    }
  };
}

export function derivative(f, x) {
  const h = 1e-6;
  return (f(x + h) - f(x - h)) / (2 * h);
}

export function parseMatrix(text) {
  const matrix = String(text || '')
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => line.trim().split(/[,;\s]+/).filter(Boolean).map(Number));
  return matrix;
}

export function parseVector(text) {
  return String(text || '').trim().split(/[,;\s\n]+/).filter(Boolean).map(Number);
}

export function parsePoints(text) {
  const points = String(text || '')
    .trim()
    .split('\n')
    .filter(Boolean)
    .map((line) => line.trim().split(/[,;\s]+/).filter(Boolean).map(Number))
    .filter((row) => row.length >= 2 && Number.isFinite(row[0]) && Number.isFinite(row[1]))
    .map((row) => ({ x: row[0], y: row[1] }));
  if (points.length < 2) throw new Error('Informe pelo menos dois pontos no formato x y.');
  return points;
}
