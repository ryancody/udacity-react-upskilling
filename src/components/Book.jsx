import React from 'react';
import Dropdown from './Dropdown';

const Book = (props) => {
    const book = props.book;

    let backgroundImage = '';
    if (book?.imageLinks?.smallThumbnail) {
        backgroundImage = `url(${book.imageLinks.smallThumbnail})`;
    }

    return (
        <div
            draggable
            className='draggable'
            onDragEnd={() => props.dropBook(book)}
            style={{
                width: 128,
                height: 188,
                backgroundImage: backgroundImage
            }}
        >
            {props.showDropdown ? <Dropdown book={book} /> : <></>}
        </div>
    );
};

export default Book;