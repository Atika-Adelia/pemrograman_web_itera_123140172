import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { vi, test, expect } from 'vitest'; // <-- PASTIKAN INI ADA
import BookForm from './BookForm';

test('shows error messages for empty required fields on submit', () => {
  const mockSubmit = vi.fn();
  render(<BookForm onSubmit={mockSubmit} />);
  
  const submitButton = screen.getByRole('button', { name: /add book/i });
  fireEvent.click(submitButton);
  expect(screen.getByText('Title is required')).toBeInTheDocument();
  expect(screen.getByText('Author is required')).toBeInTheDocument() ; 
  expect(mockSubmit).not.toHaveBeenCalled();
});

test('calls onSubmit with form data when fields are valid', () => {
    const mockSubmit = vi.fn();
    render(<BookForm onSubmit={mockSubmit} />);
  
    fireEvent.change(screen.getByLabelText(/book title/i), {
      target: { value: 'Atomic Habits' },
    });
    fireEvent.change(screen.getByLabelText(/author/i), {
      target: { value: 'James Clear' },
    });
    fireEvent.change(screen.getByLabelText(/status/i), {
      target: { value: 'reading' },
    });
  
    const submitButton = screen.getByRole('button', { name: /add book/i });
    fireEvent.click(submitButton);
  
    expect(screen.queryByText('Title is required')).not.toBeInTheDocument();
    expect(screen.queryByText('Author is required')).not.toBeInTheDocument();
    expect(mockSubmit).toHaveBeenCalledWith({
      title: 'Atomic Habits',
      author: 'James Clear',
      status: 'reading',
    });
  });

  test('populates form with initialData in edit mode', () => {
    const mockData = {
      title: 'Clean Code',
      author: 'Robert C. Martin',
      status: 'owned',
    };
    
    render(<BookForm initialData={mockData} onSubmit={() => {}} />);
    expect(screen.getByLabelText(/book title/i).value).toBe('Clean Code');
    expect(screen.getByLabelText(/author/i).value).toBe('Robert C. Martin');
    expect(screen.getByLabelText(/status/i).value).toBe('owned');
    expect(screen.getByRole('button', { name: /update book/i })).toBeInTheDocument();
  });