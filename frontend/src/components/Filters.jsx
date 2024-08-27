
import PropTypes from 'prop-types'
import { Link } from "react-router-dom";;
import { useEffect, useState } from 'react';

const Filters = ({ className, category, setCategory, name, setName }) => {
  // category will be birds, cats, dogs, fish or null
  // when category is null, all link buttons will have the default bg color (#f2e0c2)
  // when category is not null, only the selected link button will have bg color (#e4b972) and scaled up

  const categoryStyleSelected = 'w-16 text-md p-2 rounded-xl shadow-xl transition-all duration-150 bg-n2 scale-105';
  const categoryStyleDefault = 'w-16 text-md p-2 rounded-xl shadow-xl transition-all duration-150 bg-n1 hover:bg-n2 hover:scale-105';
  const [filter, setFilter] = useState(false);
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
    <div className={'z-20 relative transition-all duration-150 left-0 bg-n1 flex flex-col justify-center items-center gap-2 h-fit text-center px-4 py-8 rounded-xl shadow-xl ' + className + (filter ? ' ' : ' translate-x-[-150%]')}>
      <h1 className="text-xl">Shop Filters</h1>
      <h2 className="text-lg">Search</h2>
      <div className="flex justify-center items-center gap-1">
      <input type="text" placeholder="Search..." className='w-48 text-center shadow-xl p-2 rounded-full' value={name} onChange={(e) => setName(e.target.value)} />
      {name &&<button id='clear' onClick={() => setName('')} className='p-1 rounded-full bg-red-500 text-white w-8 text-sm hover:bg-red-600 scale-75 hover:scale-100 transition duration-150'>X</button>}
      </div>
      <h2 className="text-lg">Filters</h2>
      <Link id='all' to="/shop" className={categoryStyleDefault} onClick = {() => setCategory(null)}>All</Link>
      <div id="categories" className="grid grid-cols-2 justify-center items-center gap-4">
        <Link id='birds' to="/shop/birds" className={categoryStyleDefault} onClick = {() => setCategory('birds')}>Birds</Link>
        <Link id='cats' to="/shop/cats" className={categoryStyleDefault} onClick = {() => setCategory('cats')}>Cats</Link>
        <Link id='dogs' to="/shop/dogs" className={categoryStyleDefault} onClick = {() => setCategory('dogs')}>Dogs</Link>
        <Link id='fish' to="/shop/fish" className={categoryStyleDefault} onClick = {() => setCategory('fish')}>Fish</Link>
      </div>
      <button onClick={() => setFilter(!filter)} className={'text-black absolute top-4 right-1 p-2 text-sm rounded-full active:scale-75 transition duration-150' + (filter ? ' bg-n1 hover:bg-n2 pl-2' : ' translate-x-[320%] bg-n2 hover:bg-n1 pl-4')}>
        <img className="h-6 w-6" src={filter ? "/svg/leftArrow.svg" : "/svg/rightArrow.svg"} alt="" />
      </button>
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