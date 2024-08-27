import PropTypes from 'prop-types'
import colors from '../utils/colors'


const Paginate = ({page, setPage, options}) => {

  return (

    <div className={"flex flex-col bg-[" + colors.n2 + "] px-2 py-1 rounded-full justify-center items-center"}>
      <div className="flex gap-8">
        <button onClick={() => setPage(options.prevPage)} disabled={!options.hasPrevPage}>
          {!options.hasPrevPage ? <div className="h-6 w-6"></div> : <img className="h-6 w-6 hover:scale-110 transition duration-300" src="/svg/leftArrow.svg" alt="Prev" />}
        </button>
        <div className='flex items-center flex-col'>
          <span className="text-sm">Page</span>
          <span className="text-sm">{page}/{options.totalPages}</span>
          <span className="text-xs">Total {options.totalDocs}.</span>
        </div>
        <button onClick={() => setPage(options.nextPage)} disabled={!options.hasNextPage} >
          {!options.hasNextPage ? <div className="h-6 w-6"></div> : <img className="h-6 w-6 hover:scale-110 transition duration-300" src="/svg/rightArrow.svg" alt="Next" />}
        </button>
      </div>
    </div>

  )
}

Paginate.propTypes = {
  page: PropTypes.number,
  setPage: PropTypes.func,
  options: PropTypes.shape({
    prevPage: PropTypes.number,
    nextPage: PropTypes.number,
    hasNextPage: PropTypes.bool,
    hasPrevPage: PropTypes.bool,
    totalPages: PropTypes.number,
    totalDocs: PropTypes.number
  })
}

export default Paginate