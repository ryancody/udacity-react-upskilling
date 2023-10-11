import React, { useState } from 'react';
import { update, get } from '../services/BooksAPI';

const Dropdown = (props) => {
    const book = props.book;
    const [shelf, setShelf] = useState('none');
    const handleSelect = (e) => {
        update(book, e.target.value).then(() => {
            setShelf(book.shelf);
        });
    };
    get(book.id).then((res) => {
        setShelf(res.shelf);
    });

    return (
        <div className="book-shelf-changer">
            <select onChange={handleSelect} value={shelf}>
                <option value="none" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

export default Dropdown;
