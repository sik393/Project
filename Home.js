import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Home = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        const fetchBooks = async () => {
            const res = await axios.get('/api/books');
            setBooks(res.data);
        };
        fetchBooks();
    }, []);

    return (
        <div>
            <h1>Books</h1>
            <div className="row">
                {books.map((book) => (
                    <div className="col-md-4" key={book._id}>
                        <div className="card mb-4">
                            <img
                                src={book.image}
                                className="card-img-top"
                                alt={book.title}
                            />
                            <div className="card-body">
                                <h5 className="card-title">{book.title}</h5>
                                <p className="card-text">Author: {book.author}</p>
                                <p className="card-text">Price: ${book.price}</p>
                                <Link to={`/books/${book._id}`} className="btn btn-primary">
                                    View Details
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Home;
