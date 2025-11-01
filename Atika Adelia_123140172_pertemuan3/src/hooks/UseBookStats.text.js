import { test, expect } from 'vitest'; // <-- TAMBAHKAN INI
import { renderHook } from '@testing-library/react';
import { useBookStats } from './UseBookStats';

const mockBooks = [
  { id: '1', status: 'owned' },
  { id: '2', status: 'owned' },
  { id: '3', status: 'reading' },
  { id: '4', status: 'wishlist' },
];

test('should return correct book counts', () => {
  const { result } = renderHook(() => useBookStats(mockBooks));
  
  expect(result.current.owned).toBe(2);
  expect(result.current.reading).toBe(1);
  expect(result.current.wishlist).toBe(1);
  expect(result.current.total).toBe(4);
});