export function expectHasError(errors: Error[]) {
  expect(errors.length).toBeGreaterThan(0);
}

export function expectUnauthorized(errors: Error[]) {
  expectHasError(errors);
  expect(errors[0].message === 'Unauthorized');
}
