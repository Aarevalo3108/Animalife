import PropTypes from 'prop-types'
import { useState } from 'react'
import url from '../utils/urls'

const ImagesHandler = ({images, className=""}) => {
  const [img, setImg] = useState(images[0])
  return (
    <div className='flex items-center flex-col gap-4'>
      <img className={"h-64 w-64 rounded-lg object-cover hover:scale-105 transition duration-300 " + className} src={url.backend + "/" + (img ? img : "uploads/placeholder.svg")} alt="" />
      {/* thumbnails */}
      <div className='flex justify-center items-center gap-4'>
        {images.map((image) => (
          <img className={"h-10 w-10 hover:scale-105 hover:opacity-100 transition duration-300 rounded-lg cursor-pointer " + (image === img ? " border-2 border-n5" : "opacity-75")} key={image} onClick={() => setImg(image)} src={url.backend + "/" + image} alt="" />
        ))}
      </div>
    </div>
  )
}


ImagesHandler.propTypes = {
  images: PropTypes.array,
  className: PropTypes.string
}


export default ImagesHandler