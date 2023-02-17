import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const statusDetails = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    activeOptionId: sortbyOptions[0].optionId,
    ratingValue: '',
    categoryValue: '',
    searchValue: '',
    status: statusDetails.loading,
    tempararySearchValue: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  onFailure = () => {
    this.setState({status: statusDetails.failure})
  }

  getProducts = async () => {
    this.setState({
      status: statusDetails.loading,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied

    const {activeOptionId, ratingValue, categoryValue, searchValue} = this.state
    console.log(ratingValue)
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&category=${categoryValue}&title_search=${searchValue}&rating=${ratingValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        status: statusDetails.success,
      })
    } else {
      this.onFailure()
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  noProductImg = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
        className="failure-img"
        alt="no products"
      />
      <h1 className="failure-heading">No Products Found</h1>
      <p className="failure-discriptions">
        We could not find any products. Try other filters.
      </p>
    </div>
  )

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return this.noProductImg()
    }

    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onCategoryClick = id => {
    this.setState({categoryValue: id}, this.getProducts)
  }

  onRatingClick = id => {
    this.setState({ratingValue: id}, this.getProducts)
  }

  clickClearBtn = () => {
    this.setState(
      {
        activeOptionId: sortbyOptions[0].optionId,
        ratingValue: '',
        categoryValue: '',
        searchValue: '',
      },
      this.getProducts,
    )
  }

  // TODO: Add failure view

  failureView = () => (
    <div className="failure-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        className="failure-img"
        alt="products failure"
      />
      <h1 className="failure-heading">Something Went Worng</h1>
      <p className="failure-discriptions">
        we are having some trouble processing your request.please try again.
      </p>
    </div>
  )

  displayComponent = () => {
    const {status} = this.state
    switch (status) {
      case statusDetails.success:
        return this.renderProductsList()
      case statusDetails.failure:
        return this.failureView()
      case statusDetails.loading:
        return this.renderLoader()
      default:
        return null
    }
  }

  searchKeyDwon = key => {
    if (key === 'Enter') {
      const {tempararySearchValue} = this.state
      this.setState(
        {searchValue: tempararySearchValue, tempararySearchValue: ''},
        this.getProducts,
      )
    }
  }

  searchOnChange = valueOfInput => {
    this.setState({tempararySearchValue: valueOfInput})
  }

  render() {
    const {
      isLoading,
      ratingValue,
      categoryValue,
      tempararySearchValue,
    } = this.state

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryList={categoryOptions}
          ratingList={ratingsList}
          onCategoryClick={this.onCategoryClick}
          onRatingClick={this.onRatingClick}
          ratingValue={ratingValue}
          categoryValue={categoryValue}
          clickClearBtn={this.clickClearBtn}
          searchOnChange={this.searchOnChange}
          searchKeyDwon={this.searchKeyDwon}
          tempararySearchValue={tempararySearchValue}
        />

        {this.displayComponent()}
      </div>
    )
  }
}

export default AllProductsSection
