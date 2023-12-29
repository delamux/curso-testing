export function add(a: number, b: number) {
	return a + b;
}

export function subtract(a: number, b: number) {
	return a - b;
}

export function multiply(a: number, b: number) {
	return a * b;
}

export function divide(a: number, b: number) {
	return a / b;
}

export type Arithmetic = {
	add(a: number, b: number): number;
	subtract(a: number, b: number): number;
	multiply(a: number, b: number): number;
	divide(a: number, b: number): number;
};
