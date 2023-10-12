import React from 'react';
import Dropdown from './Dropdown';

const Book = (props) => {
    const book = props.book;
    const bookMap = props.bookMap;
    const handleDropdownSelect = props.handleDropdownSelect;

    let backgroundImage = '';
    if (book?.imageLinks?.smallThumbnail) {
        backgroundImage = `url(${book.imageLinks.smallThumbnail})`;
    }

    return (
        <>
            <div
                draggable
                className='draggable bg-no-repeat bg-center bg-cover'
                onDragEnd={() => props.dropBook(book)}
                style={{
                    width: 128,
                    height: 188,
                    backgroundImage: backgroundImage
                }}
            >
                {props.showDropdown ? <Dropdown book={book} bookMap={bookMap} handleDropdownSelect={handleDropdownSelect} /> : <></>}
            </div>
            
        </>
    );
};

export default Book;
