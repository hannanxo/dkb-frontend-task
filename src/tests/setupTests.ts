import '@testing-library/jest-dom/vitest';

// jsdom doesn't implement ResizeObserver,
// but Ant Design components rely on it,
// so we mock it for tests.
class ResizeObserverMock {
    observe() {}
    unobserve() {}
    disconnect() {}
}

Object.defineProperty(window, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserverMock
});

Object.defineProperty(globalThis, 'ResizeObserver', {
    writable: true,
    configurable: true,
    value: ResizeObserverMock
});
