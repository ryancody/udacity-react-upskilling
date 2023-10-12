import React, { useEffect, useState } from 'react';
import { search, update } from '../services/BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
import { getAll } from '../services/BooksAPI';

const Search = (props) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [bookMap, setBookMap] = useState({});
    const handleChange = (e) => {
        setQuery(e.target.value);
    };
    const refreshBookMap = () => {
        getAll().then((res) => {
            let bookMap = Object.assign({}, ...res.map((b) => ({[b.id]: b})));
    
            setBookMap(bookMap);
        });
    };
    const handleDropdownSelect = (e, book) => {
        console.log('book', book)
        update(book, e.target.value).then(() => {
            refreshBookMap();
        });
    };

    useEffect(() => {
        getAll().then((res) => {
            refreshBookMap();
        });

        if (query === '') {
            setResults([]);
            return;
        }

        console.log('searching', query)
        search(query).then((res) => {
            if (res?.length > 0) {
                setResults(res);
            }
        });
    }, [query]);

    return (
        <div className='p-2'>
            <div className='p-1 border-solid rounded-md border-gray-500'>
                <label>🔎</label>
                <input className='' type='text' value={query} onChange={handleChange} name="search" placeholder='Search' />
            </div>
            <div className='grid overflow-y-auto grid-cols-6 gap-2'>
                {results?.map((book) => (
                    <Book key={book.id} book={book} 
                        dropBook={props.dropBook} 
                        showDropdown={true} 
                        bookMap={bookMap} 
                        handleDropdownSelect={handleDropdownSelect} />
                ))}
            </div>
            <div className='fixed bottom-0 right-0 m-8'>
                <Link to="/">
                    <div className='p-4 bg-green-100 rounded-full flex justify-center'>Home</div>
                </Link>
            </div>
        </div>
    );
};

export default Search;
