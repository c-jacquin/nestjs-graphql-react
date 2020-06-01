import '@testing-library/jest-dom';
import 'jest-extended';
import 'jest-chain';

declare interface DOMEvent<T extends EventTarget> extends Event {
  target: T;
}
