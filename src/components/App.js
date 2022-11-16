import React from 'react';
import { Component } from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
//import WardrobeContainer from '../containers/WardrobeContainer.jsx'

class App extends Component {
    constructor(props) {
        super(props);
        console.log('hi');
    }
    
    render() {
        return(
            <div>
                <h1>Hey we are working</h1>
                {/*<WardrobeContainer/>*/}
            </div>

        )
    }
}

export default App;