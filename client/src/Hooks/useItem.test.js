import { render, screen } from '@testing-library/react';
import Index from '../components/Index';
import { useItem } from '../Hooks/useItem';

jest.mock('../Hooks/useItem', () => ({
  __esModule: true,
  useItem: jest.fn(),
}));

describe('Error Handling', () => {
  it('should show error message if there is a failure while fetching items', () => {
    useItem.mockReturnValue({
      handleDelete: jest.fn(),
      handleAdd: jest.fn(),
      handleBlur: jest.fn(),
      handleChange: jest.fn(),
      getdata: [],
      getloading: false,
      getmessage: 'Failed to fetch data',
      getsuccess: false,
      addloading: false,
      addmessage: '',
      addsuccess: false,
      formErrors: [],
      formData: {},
      warnings: [],
    });

    render(<Index />);

    // Check if error message is displayed
    expect(screen.getByText('Failed to fetch data')).toBeInTheDocument();
  });
});
