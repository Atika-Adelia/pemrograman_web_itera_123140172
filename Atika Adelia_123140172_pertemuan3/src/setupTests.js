import { expect, afterEach } from 'vitest';
import { cleanup } from '@testing-library/react';
import * as matchers from '@testing-library/jest-dom/matchers';

// 1. Menambahkan matchers jest-dom (.toBeInTheDocument(), dll)
expect.extend(matchers);

// 2. Ini adalah kuncinya:
// Menjalankan 'cleanup' (pembersih DOM) dari React Testing Library
// setelah SETIAP tes selesai.
afterEach(() => {
  cleanup();
});