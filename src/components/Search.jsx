import React, { useEffect, useState } from 'react';
import { search, update } from '../services/BooksAPI';
import Book from './Book';
import { Link } from 'react-router-dom';
import { getAll } from '../services/BooksAPI';
import { debounce } from 'lodash';

const Search = (props) => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [bookMap, setBookMap] = useState({});
    const refreshBookMap = () => {
        getAll().then((res) => {
            let bookMap = Object.assign({}, ...res.map((b) => ({ [b.id]: b })));

            setBookMap(bookMap);
        });
    };
    const handleDropdownSelect = (e, book) => {
        update(book, e.target.value).then(() => {
            refreshBookMap();
        });
    };
    const debounceInput = debounce((e) => {
        setQuery(e.target.value);
    }, 500);

    useEffect(() => {
        if (query?.length === 0) {
            setResults([]);
            return;
        }

        search(query).then((res) => {
            if (res?.error) {
                console.log("no results")
                setResults([]);
                return;
            }

            if (res?.length > 0) {
                setResults(res);
            }
        });

    }, [query]);

    useEffect(() => {
        refreshBookMap();
    }, []);

    return (
        <div className='p-2'>
            <div className='p-1 border-solid rounded-md border-gray-500'>
                <label>🔎</label>
                <input className='' type='text' onChange={debounceInput} name="search" placeholder='Search' />
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
