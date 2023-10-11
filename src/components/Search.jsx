import React, { useEffect, useState } from 'react';
import { search } from '../services/BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';

const Search = (props) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const handleChange = (e) => {
        setQuery(e.target.value);
    };

    useEffect(() => {
        if (query === '') {
            setResults([]);
            return;
        }

        search(query).then((res) => {
            if (res?.length > 0) {
                setResults(res)
            }
        });
    }, [query]);

    return (
        <div className='p-2'>
            <div className='p-1 border-solid rounded-md border-gray-500'>
                <Link to="/search"><label>🔎</label></Link>
                <input className='' type='text' value={query} onChange={handleChange} name="search" placeholder='Search'/>
            </div>
            <div className='grid overflow-y-auto grid-cols-6 gap-2'>
                {results?.map((book) => (
                    <Book key={book.id} book={book} dropBook={props.dropBook} />
                ))}
            </div>
        </div>
    );
};

export default Search;