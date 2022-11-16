import React, { Component } from 'react';
import { connect } from 'react-redux';
//import { Link } from 'react-router-dom';
import HeadwearCard from './HeadwearCard.jsx';
import { addHeadwearctionCreator, removeHeadwearActionCreator } from '../actions/actions.js'

const mapStateToProps = (state) => {
    return {
        headwear: state.headwear
    };
};


const HeadwearDrawer = props => {
    const headwear = []; 
    const arrOfHeadwear = props.headwear;
    for (let i = 0; i < arrOfHeadwear.length; i++) {
        const currentHeadwear = arrOfHeadwear[i];
        headwear.push(
            <HeadwearCard
                key = {i}
                index = {i}
            />);
    }
    return(
        <div className="headwearBox">
            <h1>Headwear</h1>
            {headwear}
        </div>
    );
};


export default connect(mapStateToProps) (HeadwearDrawer);


// class HeadwearDrawer extends Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             headwear: []
//         }
//     };
//     //this.openModal = this.openModal.bind(this);
//     //this.closeModal = this.closeModal.bind(this);
// }

// componentDidMount() {
//     fetch('/api/')
//     .then(res => res.json())
//     .then((headwear) => {
//         if (!Array.isArray(headwear)) headwear = [];
//         return this.setState({
//             headwear
//         });
//     })
//     .catch(err => console.log('HeadwearDrawer.componentDidMount: get headwear: ERROR: ', err));
// }

// render() {
//     if (!this.state.headwear) return (
//         <div>
//             <h1>Waiting for hats...</h1>
//         </div>
//     );
    
//     const { headwear } = this.state;

//     if (!headwear) return null;

//     if (!headwear.length) return (
//         <div>You got 0 hats, o' hatless wonder</div>
//     );

//     const headwearItems = => {
//         return (
//             <headwearCard
//             id = {index}
            
//         ) 
//     }


// }