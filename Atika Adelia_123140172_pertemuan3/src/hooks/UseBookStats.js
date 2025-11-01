import { useMemo } from 'react';

export const useBookStats = (books) => {
  const stats = useMemo(() => {
    const owned = books.filter((book) => book.status === 'owned').length;
    const reading = books.filter((book) => book.status === 'reading').length;
    const wishlist = books.filter((book) => book.status === 'wishlist').length;
    const total = books.length;

    return { owned, reading, wishlist, total };
  }, [books]);

  return stats;
};