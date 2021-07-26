import React, { useEffect, useState } from 'react';
import ListItem from './components/ListItem';
import SearchInput from './components/SearchInput';
import { fetchSearchResults, debounce } from './utils/imdb';
import './App.css';

function App() {

  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const fetchData = async (query, cb) => {
    const res = await fetchSearchResults(query);
    cb(res);
  };

  const debouncedFetchData = debounce((query, cb) => {
    fetchData(query, cb);
  }, 500);

  useEffect(() => {
    if (query && query.length > 0)
      debouncedFetchData(query, res => {
        console.log(res.results)
        setResults(res.results ? res.results : []);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query]);

  return (
    <div className="main-container">
      
      <SearchInput
        value={query}
        onChangeText={e => {
          setQuery(e.target.value);
        }}
      />

      {!results.length ? 'Nothing here. Type something!' : null}
      {results.map((result, index) => (
        <div className='accordion' key={index}>
          <ListItem
            item={result}
          />
        </div>
      ))}

    </div>
  );
}

export default App;
