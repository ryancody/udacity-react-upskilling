import React, { useEffect, useState } from 'react';

const Dropdown = (props) => {
    const book = props.book;
    const bookMap = props.bookMap;
    const handleDropdownSelect = props.handleDropdownSelect;
    const [shelf, setShelf] = useState(bookMap[book.id]?.shelf ?? 'none');

    useEffect(() => {
        setShelf(bookMap[book.id]?.shelf ?? 'none');
    }, [bookMap, book.id]);


    return (
        <div>
            <select onChange={(e) => handleDropdownSelect(e, book)} value={shelf}>
                <option value="moveTo" disabled>Move to...</option>
                <option value="currentlyReading">Currently Reading</option>
                <option value="wantToRead">Want to Read</option>
                <option value="read">Read</option>
                <option value="none">None</option>
            </select>
        </div>
    )
}

export default Dropdown;
