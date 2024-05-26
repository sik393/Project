import React, { useState, useEffect } from 'react';
import axios from 'axios';

const BookDetails = ({ match }) => {
    const [book, setBook] = useState({});

    useEffect(() => {
        const fetchBook = async () => {
            const res = await axios.get(`/api/books/${match.params.id}`);
            setBook(res.data);
        };
        fetchBook();
    }, [match.params.id]);

    return (
        <div>
            <h1>{book.title}</h1>
            <img src={book.image} alt={book.title} />
            <p>Author: {book.author}</p>
            <p>Condition: {book.condition}</p>
            <p>Price: ${book.price}</p>
        </div>
    );
};

export default BookDetails;
