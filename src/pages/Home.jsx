import React, { useEffect, useState } from "react";
import Shelf from '../components/Shelf';
import { getAll } from '../services/BooksAPI';

const Home = () => {
    const shelves = [
        { "id": "currentlyReading", "name": "Currently Reading" },
        { "id": "wantToRead", "name": "Want to Read" },
        { "id": "read", "name": "Read" },
    ]
    const [myBooks, setMyBooks] = useState([]);
    const [currentShelf, setCurrentShelf] = useState(null);
    const handleDropBook = (book) => {
        setCurrentShelf(null);
        setMyBooks([...myBooks, book]);
    }
    const onDragEnter = (shelf) => {
        setCurrentShelf(shelf);
    }

    useEffect(() => {
        getAll().then((res) => {
            console.log('res', res)
            setMyBooks(res);
        });
    }, []);
    console.log('myBooks', myBooks)
    return (
        <div className='container mx-auto h-full'>
            <div className='w-full font-bold text-3xl font-mono h-24 inline-block align-baseline'>MyReads</div>
            <div className='grid grid-cols-3 gap-2 h-full'>
                {shelves.map((shelf) =>
                    <Shelf name={shelf.name} id={shelf.id} key={shelf.id}
                        books={myBooks?.filter((b) => b.shelf === shelf.id)}
                        dropBook={handleDropBook}
                        onDragEnter={onDragEnter}
                        currentShelf={currentShelf} />
                )}
            </div>
        </div>
    );
};

export default Home;
