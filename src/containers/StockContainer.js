import React, { Component } from 'react';
import Stock from '../components/Stock'

class StockContainer extends Component {

  render() {
    return (
      <div>
        <h2>Stocks</h2>
        {
          //render the list of stocks here
          this.props.allStocks.map((stock) => {
            return (
              <Stock 
                stock={stock} 
                key={stock.id}
                handleStockClick={this.props.handleStockClick}
              />
          )})
        }
      </div>
    );
  }

}

export default StockContainer;
