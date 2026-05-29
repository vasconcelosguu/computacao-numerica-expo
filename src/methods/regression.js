import { gaussPivot } from './systems';
import { round } from '../utils/format';

const EPS = 1e-10;

export function linearRegression(points) {
  const n = points.length;
  const sx = points.reduce((acc, p) => acc + p.x, 0);
  const sy = points.reduce((acc, p) => acc + p.y, 0);
  const sxy = points.reduce((acc, p) => acc + p.x * p.y, 0);
  const sx2 = points.reduce((acc, p) => acc + p.x * p.x, 0);
  const denominator = n * sx2 - sx * sx;
  if (Math.abs(denominator) < EPS) throw new Error('Não foi possível calcular a regressão linear.');
  const a = (n * sxy - sx * sy) / denominator;
  const b = (sy - a * sx) / n;
  const meanY = sy / n;
  const ssTot = points.reduce((acc, p) => acc + Math.pow(p.y - meanY, 2), 0);
  const ssRes = points.reduce((acc, p) => acc + Math.pow(p.y - (a * p.x + b), 2), 0);
  const r2 = ssTot === 0 ? 1 : 1 - ssRes / ssTot;
  return { type: 'regression', method: 'Regressão Linear', coefficients: [b, a], equation: `y = ${round(a)}x + ${round(b)}`, r2, iterations: [{ i: 1, x: `a = ${round(a)}` }, { i: 2, x: `b = ${round(b)}` }, { i: 3, x: `R² = ${round(r2)}` }] };
}

function transpose(matrix) {
  return matrix[0].map((_, col) => matrix.map((row) => row[col]));
}

function multiplyMatrix(A, B) {
  return A.map((row) => B[0].map((_, j) => row.reduce((sum, value, i) => sum + value * B[i][j], 0)));
}

function multiplyMatrixVector(A, v) {
  return A.map((row) => row.reduce((sum, value, i) => sum + value * v[i], 0));
}

export function polynomialRegression(points, degree) {
  if (points.length <= degree) throw new Error('Use mais pontos do que o grau do polinômio.');
  const X = points.map((p) => Array.from({ length: degree + 1 }, (_, power) => Math.pow(p.x, power)));
  const y = points.map((p) => p.y);
  const XT = transpose(X);
  const XTX = multiplyMatrix(XT, X);
  const XTy = multiplyMatrixVector(XT, y);
  const result = gaussPivot(XTX, XTy);
  const coefficients = result.solution;
  const equation = coefficients.map((coef, i) => {
    if (i === 0) return `${round(coef)}`;
    if (i === 1) return `${round(coef)}x`;
    return `${round(coef)}x^${i}`;
  }).join(' + ');
  return { type: 'regression', method: 'Mínimos Quadrados Polinomial', coefficients, equation: `y = ${equation}`, iterations: result.iterations, extra: `Sistema normal resolvido por Gauss. Grau: ${degree}` };
}

export function evaluatePolynomial(coefficients, x) {
  return coefficients.reduce((sum, c, i) => sum + c * Math.pow(x, i), 0);
}
