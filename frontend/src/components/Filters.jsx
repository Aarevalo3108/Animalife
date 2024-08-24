
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";;
import { useEffect } from 'react';

const Filters = ({ className, category, setCategory, name, setName }) => {
  // category will be birds, cats, dogs, fish or null
  // when category is null, all link buttons will have the default bg color (#f2e0c2)
  // when category is not null, only the selected link button will have bg color (#e4b972) and scaled up

  const categoryStyleSelected = 'min-w-28 text-lg p-4 rounded-xl shadow-xl transition-all duration-150 bg-[#e4b972] scale-105';
  const categoryStyleDefault = 'min-w-28 text-lg p-4 rounded-xl shadow-xl transition-all duration-150 bg-[#f2e0c2] hover:bg-[#e4b972] hover:scale-105';

  const checkCategory = () => {
    document.getElementById('all').className = categoryStyleDefault
    if(!category) {
      document.getElementById('all').className = categoryStyleSelected
    }
    document.getElementById('categories').childNodes.forEach(element => {
      element.className = element.id === category ? categoryStyleSelected : categoryStyleDefault
    });
  }

  useEffect(() => {
    checkCategory();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <div className={'bg-[#f2e0c2] flex flex-col justify-center items-center gap-4 h-fit text-center px-4 py-8 rounded-xl shadow-xl ' + className}>
      <h1 className="text-3xl">Shop Filters</h1>
      <h2 className="text-2xl">Search</h2>
      <div className="flex justify-center items-center gap-1">
      <input type="text" placeholder="Search..." className='p-2 rounded-full' value={name} onChange={(e) => setName(e.target.value)} />
      {name &&<button id='clear' onClick={() => setName('')} className='p-1 rounded-full bg-red-500 text-white w-8 text-sm hover:bg-red-600 scale-75 hover:scale-100 transition duration-150'>X</button>}
      </div>
      <h2 className="text-2xl">Filters</h2>
      <Link id='all' to="/shop" className={categoryStyleDefault} onClick = {() => setCategory(null)}>All</Link>
      <div id="categories" className="grid grid-cols-2 justify-center items-center gap-4">
        <Link id='birds' to="/shop/birds" className={categoryStyleDefault} onClick = {() => setCategory('birds')}>Birds</Link>
        <Link id='cats' to="/shop/cats" className={categoryStyleDefault} onClick = {() => setCategory('cats')}>Cats</Link>
        <Link id='dogs' to="/shop/dogs" className={categoryStyleDefault} onClick = {() => setCategory('dogs')}>Dogs</Link>
        <Link id='fish' to="/shop/fish" className={categoryStyleDefault} onClick = {() => setCategory('fish')}>Fish</Link>
      </div>
    </div>
  )
}

Filters.propTypes = {
  className: PropTypes.string,
  category: PropTypes.string,
  setCategory: PropTypes.func,
  name: PropTypes.string,
  setName: PropTypes.func
}

export default Filters