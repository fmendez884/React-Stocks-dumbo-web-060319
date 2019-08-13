import React, { Component } from 'react';
import StockContainer from './StockContainer'
import PortfolioContainer from './PortfolioContainer'
import SearchBar from '../components/SearchBar'

class MainContainer extends Component {

  state = {
    allStocks : [],
    portfolioStocks: [],
    filterTerm: "All",
    sortTerm: ""
  }

  componentDidMount() {
    fetch('http://localhost:3000/stocks', {
      method: "GET",
      headers: {
        "Content-Type" : "application/json",
        "Accept" : "application/json"
      }
    })
    .then(res => res.json())
    .then((data) => {
      this.setState({
        allStocks: data
      })
    })
  }

  handleFilter = (term) => {
    console.log(term)
    this.setState({
      filterTerm: term
    })
    // debugger
  }

  handleSort = (term) => {
    this.setState({
      sortTerm: term
    },() => {
      console.log(this.state.sortTerm)
    })
  }

  whichStocksToRender = () => {

    let copiedStocks = [...this.state.allStocks]

    if (this.state.filterTerm === "All") {
      copiedStocks = [...this.state.allStocks]
    } else {
      copiedStocks = copiedStocks.filter(stock => stock.type === this.state.filterTerm)
    }
    
    if (this.state.sortTerm === "Price") {
      copiedStocks.sort((a, b) => {
        return a.price - b.price 
      })
    } else if (this.state.sortTerm === "Alphabetical") {
      copiedStocks.sort((a,b) => {
        return a.name.localeCompare(b.name)
      })
    }

    return copiedStocks

  }

  whichPortfolioStocksToRender = () => {
    let copiedStocks = [...this.state.portfolioStocks]

    if (this.state.filterTerm === "All") {
      copiedStocks = [...this.state.allStocks]
    } else {
      copiedStocks = copiedStocks.filter(stock => stock.type === this.state.filterTerm)
    }
    
    if (this.state.sortTerm === "Price") {
      copiedStocks.sort((a, b) => {
        return a.price - b.price 
      })
    } else if (this.state.sortTerm === "Alphabetical") {
      copiedStocks.sort((a,b) => {
        return a.name.localeCompare(b.name)
      })
    }

    return copiedStocks
  }

  handleStockClick = (stock) => {
    console.log("stonk", stock)

    this.state.portfolioStocks.includes(stock)
    ?
    null
    :
    this.setState({
      portfolioStocks: [...this.state.portfolioStocks, stock]
    })
  }

  handlePortfolioStockClick = (stock) => {
    console.log(stock)
    this.setState({
      portfolioStocks: this.state.portfolioStocks.filter(
        (stockElement) => {
          return stockElement !== stock
        }
      )
    })
  }

  render() {
    console.log(this.state)
    return (
      <div>
        <SearchBar 
          handleFilter={this.handleFilter}
          handleSort={this.handleSort}
          filterTerm = {this.state.filterTerm}
          sortTerm = {this.state.sortTerm}
        />

          <div className="row">
            <div className="col-8">

              <StockContainer 
                allStocks={this.whichStocksToRender()}
                handleStockClick={this.handleStockClick}  
                
              />

            </div>
            <div className="col-4">

              <PortfolioContainer
                portfolioStocks={this.whichPortfolioStocksToRender()}
                handleStockClick={this.handlePortfolioStockClick}
              />

            </div>
          </div>
      </div>
    );
  }

}

export default MainContainer;
