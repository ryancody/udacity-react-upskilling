import React from 'react';
import Book from './Book';

const Shelf = (props) => {
    const books = props.books;
    const dragOver = props.id === props.currentShelf;
    let className = ' border-solid rounded-md p-4 overflow-auto h-full';

    if (dragOver) {
        className += 'border-2 border-sky-500 '
    } else {
        className += ' border-gray-500 shadow-inner'
    }

    return (
        <div
            onDragEnter={(e) => {
                props.onDragEnter(props.id);
                e.preventDefault();
            }}
            className={className}
        >
            <div className='font-bold text-center text-base font-sans font-mono'>{props.name}</div>
            <div className='grid grid-flow-col auto-cols-max gap-2 h-full'>
                {
                    books?.map((book) => (
                        <Book key={book.id} book={book} dropBook={props.dropBook} showDropdown={false} />
                    ))
                }
            </div>
        </div >
    );
};

export default Shelf;
