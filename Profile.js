import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

const Profile = () => {
    const [books, setBooks] = useState([]);
    const history = useHistory();

    useEffect(() => {
        const fetchBooks = async () => {
            const token = localStorage.getItem('token');
            if (!token) {
                history.push('/login');
                return;
            }
            const res = await axios.get('/api/books', {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            });
            setBooks(res.data);
        };
        fetchBooks();
    }, [history]);

    return (
        <div>
            <h1>Your Books</h1>
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
                                <button className="btn btn-danger">Delete</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Profile;
