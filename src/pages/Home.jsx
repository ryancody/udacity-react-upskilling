import React, { useEffect, useState } from "react";
import Shelf from '../components/Shelf';
import { getAll, update } from '../services/BooksAPI';
import { Link } from 'react-router-dom';

const Home = () => {
    const shelves = [
        { "id": "currentlyReading", "name": "Currently Reading" },
        { "id": "wantToRead", "name": "Want to Read" },
        { "id": "read", "name": "Read" },
    ]
    const [myBooks, setMyBooks] = useState([]);
    const [currentShelf, setCurrentShelf] = useState(null);
    const handleDropBook = (book) => {
        update(book, currentShelf).then(() => {
            console.log('updated', book, currentShelf)
            getAll().then((res) => {
                setMyBooks(res);
                setCurrentShelf(null);
            });
        });
    }
    const onDragEnter = (shelf) => {
        setCurrentShelf(shelf);
    }

    useEffect(() => {
        console.log('useeffect');
        getAll().then((res) => {
            setMyBooks(res);
        });
    }, []);

    return (
        <div>
            <div className='w-full font-bold text-3xl font-mono h-24 inline-block align-baseline p-4'>MyReads</div>
            <div className='flex flex-row gap-2 p-2'>
                {shelves.map((shelf) =>
                    <Shelf name={shelf.name} id={shelf.id} key={shelf.id}
                        books={filterBooks(myBooks, shelf.id)}
                        dropBook={handleDropBook}
                        onDragEnter={onDragEnter}
                        currentShelf={currentShelf} />
                )}
            </div>
            <div className='fixed bottom-0 right-0 m-8'>
                <Link to="/search">
                    <div className='p-4 bg-green-100 rounded-full flex justify-center'>Add A Book</div>
                </Link>
            </div>
        </div>
    );
};

const filterBooks = (books, shelf) => {
    if(!books || books.length === 0){
        return [];
    }
    
    books = books.filter((book) => {
        return book.shelf === shelf;
    });

    return books;
};

export default Home;
