import './index.css'

const ListOfCategory = props => {
  const {categoryName, onCategoryClick, isCategoryTrue} = props
  const {categoryId, name} = categoryName

  const cssValueInCategory = isCategoryTrue ? 'istrue' : ''

  const clickCategory = () => {
    onCategoryClick(categoryId)
  }

  return (
    <li className="list-of-category">
      <button className="button-category" onClick={clickCategory}>
        <p className={`text-category ${cssValueInCategory}`}>{name}</p>
      </button>
    </li>
  )
}

const ListOfRating = props => {
  const {ratingDetails, onRatingClick, isRatingTrue} = props
  const {ratingId, imageUrl} = ratingDetails

  const cssValueInRating = isRatingTrue ? 'istrue' : ''

  const clickRating = () => {
    onRatingClick(ratingId)
  }

  return (
    <li className="list-of-rating">
      <img src={imageUrl} alt={`rating ${ratingId}`} className="rating-img" />
      <button className="button-rating" onClick={clickRating}>
        <p className={`text-category ${cssValueInRating}`}>&& UP</p>
      </button>
    </li>
  )
}

const FiltersGroup = props => {
  const {
    categoryList,
    ratingList,
    onCategoryClick,
    onRatingClick,
    ratingValue,
    categoryValue,
    clickClearBtn,
    searchOnChange,
    searchKeyDwon,
    tempararySearchValue,
  } = props

  const changeValue = event => {
    searchOnChange(event.target.value)
  }

  const clickKeyDwon = event => {
    searchKeyDwon(event.key)
  }

  const clearBtn = () => {
    clickClearBtn()
  }

  return (
    <div className="filters-group-container">
      <div className="input-container">
        <input
          type="search"
          id="input"
          value={tempararySearchValue}
          className="input"
          placeholder="Search"
          onChange={changeValue}
          onKeyDown={clickKeyDwon}
        />
      </div>
      <h1 className="category-heading">Category</h1>
      <ul className="un-order-category">
        {categoryList.map(echValue => (
          <ListOfCategory
            categoryName={echValue}
            key={echValue.categoryId}
            onCategoryClick={onCategoryClick}
            isCategoryTrue={echValue.categoryId === categoryValue}
          />
        ))}
      </ul>
      <h1 className="category-heading">Rating</h1>
      <ul className="un-order-rating">
        {ratingList.map(echValue => (
          <ListOfRating
            ratingDetails={echValue}
            key={echValue.ratingId}
            onRatingClick={onRatingClick}
            isRatingTrue={echValue.ratingId === ratingValue}
          />
        ))}
      </ul>
      <button className="clear-filter-btn" onClick={clearBtn}>
        Clear Filters
      </button>
    </div>
  )
}

export default FiltersGroup
