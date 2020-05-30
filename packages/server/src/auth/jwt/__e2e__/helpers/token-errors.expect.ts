import { Errors } from '@app/common';

export function expectMissingToken(errors: Error[]) {
  expect(errors.length).toBe(1);
  expect(errors[0].message === Errors.ACCESS_TOKEN_MISSING);
}

export function expectExpiredToken(errors: Error[]) {
  expect(errors.length).toBe(1);
  expect(errors[0].message === Errors.ACCESS_TOKEN_EXPIRED);
}
