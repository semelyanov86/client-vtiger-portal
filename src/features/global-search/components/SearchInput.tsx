import React, { useState, useEffect, useRef } from 'react';
import Autosuggest from 'react-autosuggest';
import { Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router';

import { DEFAULT_PATHS } from '../../../config';
import { useGlobalSearch } from '../api/getSearchItems.ts';
import { SearchItem } from '../types';

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SearchInput: React.FC<Props> = ({ show, setShow }) => {
  const navigate = useNavigate();
  const searchInput = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const resultCount = React.useRef<number>(0);
  const selectedItem = React.useRef<SearchItem>({ label: '', crmid: '', module: '', parent: '' });
  const mySelectedIndexRef = React.useRef<number | null>(selectedIndex);
  const setMySelectedIndex = (currenData: number) => {
    mySelectedIndexRef.current = currenData;
    setSelectedIndex(currenData);
  };

  const routesQuery = useGlobalSearch({ query });

  const onResultClick = (searchItem: SearchItem) => {
    setShow(false);
    if (searchItem.module == 'Faq') {
      navigate(DEFAULT_PATHS.FAQ + '?crmid=' + searchItem.crmid);
    } else if (searchItem.module == 'HelpDesk') {
      navigate(DEFAULT_PATHS.HELPDESK + '/' + searchItem.crmid);
    } else if (searchItem.module == 'ProjectTask') {
      navigate(DEFAULT_PATHS.PROJECT + '/' + searchItem.parent + '/tasks/' + searchItem.crmid);
    } else if (searchItem.module == 'Project') {
      navigate(DEFAULT_PATHS.PROJECT + '/' + searchItem.crmid);
    }
  };

  const onKeyDown = (e: KeyboardEvent) => {
    if (![38, 40, 13].includes(e.keyCode)) {
      return;
    }
    const rCount = resultCount.current;
    const sIndex = mySelectedIndexRef.current;
    if (rCount <= 0) return;

    if (sIndex === null) {
      setMySelectedIndex(0);
      return;
    }

    if (e.keyCode === 38) {
      // up
      setMySelectedIndex(sIndex <= 0 ? rCount - 1 : sIndex - 1);
    } else if (e.keyCode === 40) {
      // down
      setMySelectedIndex(sIndex >= rCount - 1 ? 0 : sIndex + 1);
    } else {
      // enter
      const sCurrent = selectedItem.current;
      if (sCurrent) {
        onResultClick(sCurrent);
      }
    }
  };

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown);

    return () => {
      document.removeEventListener('keydown', onKeyDown);
    };
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (show) {
      setTimeout(() => {
        searchInput.current?.focus();
      }, 0);
    } else {
      setQuery('');
    }
  }, [show]);

  useEffect(() => {
    setMySelectedIndex(0);
    resultCount.current = 0;
    selectedItem.current = { label: '', crmid: '', module: '', parent: '' };
  }, [query]);

  return (
    <>
      <Autosuggest
        suggestions={routesQuery.data ?? []}
        onSuggestionsFetchRequested={({ value: val }) => setQuery(val)}
        onSuggestionsClearRequested={() => setQuery('')}
        getSuggestionValue={(suggestion: SearchItem) => suggestion.label}
        renderSuggestion={(suggestion: SearchItem) => <div>{suggestion.label}</div>}
        focusInputOnSuggestionClick={false}
        inputProps={{
          placeholder: '',
          value: query,
          onChange: (_, { newValue }) => {
            setQuery(newValue);
          },
        }}
        onSuggestionSelected={(_, { suggestion }) => onResultClick(suggestion)}
        renderInputComponent={(props) => (
          <>
            <input {...props} className="form-control" />
          </>
        )}
      />
      {routesQuery.isLoading && <Spinner animation="border" variant="secondary" />}
    </>
  );
};

export default SearchInput;
