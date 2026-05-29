import { createFunction, derivative } from '../utils/mathParser';
import { round } from '../utils/format';

const EPS = 1e-10;

export function bisection(expression, a, b, tolerance = 0.0001, maxIterations = 50) {
  const f = createFunction(expression);
  let fa = f(a);
  let fb = f(b);
  if (fa * fb > 0) throw new Error('No método da Bisseção, f(a) e f(b) precisam ter sinais opostos.');
  const iterations = [];
  let mid = a;
  for (let i = 1; i <= maxIterations; i++) {
    mid = (a + b) / 2;
    const fm = f(mid);
    const error = Math.abs(b - a) / 2;
    iterations.push({ i, a: round(a), b: round(b), x: round(mid), fx: round(fm), error: round(error), detail: `Intervalo [${round(a)}, ${round(b)}]` });
    if (Math.abs(fm) < tolerance || error < tolerance) break;
    if (fa * fm < 0) { b = mid; fb = fm; } else { a = mid; fa = fm; }
  }
  return { type: 'root', method: 'Bisseção', root: mid, fx: f(mid), iterations, criteria: `|f(x)| < ${tolerance} ou erro < ${tolerance}` };
}

export function fixedPoint(expression, x0, tolerance = 0.0001, maxIterations = 50) {
  const g = createFunction(expression);
  let x = x0;
  const iterations = [];
  for (let i = 1; i <= maxIterations; i++) {
    const next = g(x);
    const error = Math.abs(next - x);
    iterations.push({ i, x: round(next), fx: round(g(next)), error: round(error), detail: `x${i} = g(x${i - 1})` });
    x = next;
    if (error < tolerance) break;
  }
  return { type: 'root', method: 'Ponto Fixo', root: x, fx: g(x), iterations, criteria: `erro < ${tolerance}` };
}

export function newtonRaphson(expression, x0, tolerance = 0.0001, maxIterations = 50) {
  const f = createFunction(expression);
  let x = x0;
  const iterations = [];
  for (let i = 1; i <= maxIterations; i++) {
    const fx = f(x);
    const dfx = derivative(f, x);
    if (Math.abs(dfx) < EPS) throw new Error('Derivada próxima de zero. Tente outro valor inicial.');
    const next = x - fx / dfx;
    const error = Math.abs(next - x);
    iterations.push({ i, x: round(next), fx: round(f(next)), error: round(error), detail: `x = x - f(x)/f'(x)` });
    x = next;
    if (error < tolerance || Math.abs(f(x)) < tolerance) break;
  }
  return { type: 'root', method: 'Newton-Raphson', root: x, fx: f(x), iterations, criteria: `|f(x)| < ${tolerance} ou erro < ${tolerance}` };
}

export function secant(expression, x0, x1, tolerance = 0.0001, maxIterations = 50) {
  const f = createFunction(expression);
  const iterations = [];
  for (let i = 1; i <= maxIterations; i++) {
    const f0 = f(x0);
    const f1 = f(x1);
    if (Math.abs(f1 - f0) < EPS) throw new Error('Divisão por valor muito próximo de zero no método das Secantes.');
    const x2 = x1 - (f1 * (x1 - x0)) / (f1 - f0);
    const error = Math.abs(x2 - x1);
    iterations.push({ i, x: round(x2), fx: round(f(x2)), error: round(error), detail: `Aproximação por secante` });
    x0 = x1;
    x1 = x2;
    if (error < tolerance || Math.abs(f(x1)) < tolerance) break;
  }
  return { type: 'root', method: 'Secantes', root: x1, fx: f(x1), iterations, criteria: `|f(x)| < ${tolerance} ou erro < ${tolerance}` };
}
