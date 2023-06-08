import React, { ChangeEvent, useState } from 'react';
import { Form } from 'react-bootstrap';

interface SearchInputProps {
  searchFilter: string;
  setSearchFilter: (value: string) => void;
}

const SearchInput: React.FC<SearchInputProps> = ({ searchFilter, setSearchFilter }) => {
  const [debounceTimeout, setDebounceTimeout] = useState<NodeJS.Timeout | null>(null);
  const [searchValue, setSearchValue] = useState(searchFilter);

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const value = event.target.value;
    setSearchValue(value);
    if (!value) {
      setSearchFilter('');
    }

    if (debounceTimeout) {
      clearTimeout(debounceTimeout);
    }

    const newTimeout = setTimeout(() => {
      setSearchFilter(value);
      setSearchValue(value);
    }, 2000);

    setDebounceTimeout(newTimeout);
  };

  return (
    <Form.Control type="text" placeholder="Search" value={searchValue} onChange={handleChange} />
  );
};
SearchInput.displayName = 'SearchInput';

export default SearchInput;
