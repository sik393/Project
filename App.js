import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Login from './pages/Login';
import Profile from './pages/Profile';
import BookDetails from './pages/BookDetails';
import Navbar from './components/Navbar';

const App = () => {
    return (
        <Router>
            <Navbar />
            <div className="container mt-3">
                <Switch>
                    <Route path="/" component={Home} exact />
                    <Route path="/register" component={Register} />
                    <Route path="/login" component={Login} />
                    <Route path="/profile" component={Profile} />
                    <Route path="/books/:id" component={BookDetails} />
                </Switch>
            </div>
        </Router>
    );
};

export default App;
