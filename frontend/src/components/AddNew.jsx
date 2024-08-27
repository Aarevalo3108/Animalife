import PropTypes from 'prop-types'
import colors from '../utils/colors';
import { Link } from "react-router-dom";

const AddNew = ({type}) => {

  return (
    <Link to={`/admin/${type}/new`} className={"p-4 text-lg bg-[" + colors.n4 + "] text-[" + colors.n1 + "] py-1 px-2 hover:scale-105 transition duration-300 rounded"}>Add new</Link>
  )
}

AddNew.propTypes = {
  type: PropTypes.string
}

export default AddNew