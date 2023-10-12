import React from 'react';
import Book from './Book';

const Shelf = (props) => {
    const books = props.books;
    const dragOver = props.id === props.currentShelf;
    let borderStyle = '';

    if (dragOver) {
        borderStyle = 'border-2 border-sky-500 '
    } else {
        borderStyle = 'shadow-inner'
    }

    return (
        <div className={`flex basis-1/3 flex-col bg-white ${borderStyle}`}>
            <div className='font-bold text-center text-base font-sans font-mono'>{props.name}</div>
            <div
                onDragEnter={(e) => {
                    props.onDragEnter(props.id);
                    e.preventDefault();
                }}
                className={`border-solid rounded-md p-4 overflow-auto h-full min-h-screen`}
            >
                <div className='flex flex-wrap gap-2'>
                    {
                        books?.map((book) => (
                            <Book key={book.id} book={book} dropBook={props.dropBook} showDropdown={false} />
                        ))
                    }
                </div>
            </div >
        </div>
    );
};

export default Shelf;
