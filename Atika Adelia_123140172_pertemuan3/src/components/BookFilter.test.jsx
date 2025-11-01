import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, test, expect } from 'vitest'; 
import BookFilter from './BookFilter';

test('renders all filter buttons', () => {
  render(<BookFilter activeFilter="all" onFilterChange={() => {}} />);
  
  expect(screen.getByText('All')).toBeInTheDocument();
  expect(screen.getByText('Owned')).toBeInTheDocument();
  expect(screen.getByText('Reading')).toBeInTheDocument();
  expect(screen.getByText('Wishlist')).toBeInTheDocument();
});

test('calls onFilterChange with correct value when clicked', () => {
  const mockFilterChange = vi.fn();
  render(<BookFilter activeFilter="all" onFilterChange={mockFilterChange} />);
  
  const ownedButton = screen.getByText('Owned');
  fireEvent.click(ownedButton);
  
  expect(mockFilterChange).toHaveBeenCalledTimes(1);
  expect(mockFilterChange).toHaveBeenCalledWith('owned');
});