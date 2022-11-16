import React, { Component } from 'react';
import { connect } from 'react-redux';
// import actions from action creators file
import * as actions from '../actions/actions';
// import child components...
import MarketCreator from '../components/MarketCreator.jsx';
import MarketsDisplay from '../components/MarketsDisplay.jsx'; 
//import Dispatch from 'react' //help
const mapStateToProps = state => ({
//return {
// provide pertinent state here
    totalMarkets: state.markets.totalMarkets,
    totalCards: state.markets.totalCards,
    marketList: state.markets.marketList,
    lastMarketId: state.markets.lastMarketId,
    newLocation: state.markets.newLocation,
    cards: state.markets.cards,
    percentOfTotal: state.markets.percentOfTotal
//}
});



const mapDispatchToProps = dispatch => ({
//return {
    addMarket: () => dispatch(actions.addMarketActionCreator()),
    addCard: () => dispatch(actions.addCardActionCreator()),
    setNewLocation: () => dispatch(actions.setNewLocationActionCreator()),
    deleteCard: () => dispatch(actions.deleteCardActionCreator()),
})
// create functions that will dispatch action creators
//addMarket: onClick=() => dispatch({ type: ADD_MARKET, payload: "text"})
//const dispatch = useDispatch() // help
//dispatch({ type: ADD_MARKET, payload: "text"}) // help

// re set state


class MarketsContainer extends Component {
constructor(props) {
    super(props);
}


render() {
    return(
    <div className="innerbox">
        { /* add components here... */ }
        <MarketCreator 
        addMarket={this.props.addMarket}
        setNewLocation={this.props.setNewLocation}
        newLocation={this.props.newLocation}
        />
        <MarketsDisplay 
        marketList={this.props.marketList}
        lastMarketId={this.props.lastMarketId}
        newLocation={this.props.newLocation}
        cards={this.props.cards}
        percentOfTotal={this.props.percentOfTotal}
        />
    </div>
    );
}
}

export default connect(mapStateToProps, mapDispatchToProps)(MarketsContainer);
//