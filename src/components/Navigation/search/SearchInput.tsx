import React, { useMemo, useState, useEffect, useRef } from 'react';
import { useIntl } from 'react-intl';

import { USE_MULTI_LANGUAGE } from '../../../config';
import { useAuthContext } from '../../../lib/auth.tsx';

interface SearchItem {
  label: string;
  path: string;
}

interface Props {
  show: boolean;
  setShow: (show: boolean) => void;
}

const SearchInput: React.FC<Props> = ({ show, setShow }) => {
  const searchInput = useRef<HTMLInputElement>(null);
  const [data, setData] = useState<SearchItem[] | null>(null);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const resultCount = React.useRef<number>(0);
  const selectedItem = React.useRef<SearchItem>({ label: '', path: '' });
  const mySelectedIndexRef = React.useRef<number | null>(selectedIndex);
  const setMySelectedIndex = (currenData: number) => {
    mySelectedIndexRef.current = currenData;
    setSelectedIndex(currenData);
  };
  const { user } = useAuthContext();

  const routes = useMemo<SearchItem[]>(() => [], [user]);
  const { formatMessage: f } = useIntl();

  const onResultClick = (path: string) => {
    if (path) {
      setShow(false);
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
        onResultClick(sCurrent.path);
      }
    }
  };

  useEffect(() => {
    if (USE_MULTI_LANGUAGE) {
      const formatedRoutes = routes.map((d) => ({
        ...d,
        label: f({ id: d.label || 'menu.home' }),
      }));
      setData(formatedRoutes);
    } else {
      setData(routes);
    }
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [show]);

  useEffect(() => {
    setMySelectedIndex(0);
    resultCount.current = 0;
    selectedItem.current = { label: '', path: '' };
    // eslint-disable-next-line
  }, [query]);

  if (data) {
    return (
      <>
        <input
          ref={searchInput}
          id="searchPagesInput"
          className="form-control form-control-xl borderless ps-0 pe-0 mb-1 auto-complete"
          type="text"
          autoComplete="off"
          onChange={(e) => setQuery(e.target.value)}
          value={query}
          placeholder="Search for Pages"
        />
        <ul id="searchPagesResults" className="auto-complete-result">
          <li className="no_resulst">No Results</li>
        </ul>
      </>
    );
  }
  return <></>;
};

export default SearchInput;
