import React, { Component } from 'react';
import Navbar from './components/Navbar'
import Home from './pages/Home'

class App extends Component {
    render() {
        return (
            <div>
                <Navbar />
                <Home />
            </div>
        );
    }

}

export default App
