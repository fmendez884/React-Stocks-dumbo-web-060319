import React, { Component } from 'react';
import Stock from '../components/Stock'

class PortfolioContainer extends Component {

  state = {
    portfolioStocks : [],
    sortedStocks: []
  }

  render() {
    return (
      <div>
        <h2>My Portfolio</h2>
          {
            //render your portfolio stocks here
            this.props.portfolioStocks.map((stock) => {
              return (
                <Stock 
                  stock={stock}
                  key={"portfolio-"+stock.id}
                  handleStockClick={this.props.handleStockClick}
                />
              )
            })
          }
      </div>
    );
  }

}

export default PortfolioContainer;
