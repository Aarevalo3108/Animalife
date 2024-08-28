
import '../styles/Loading.css'

const Loading = () => {
  return (
    <div className='absolute top-0 left-0 bg-[rgba(0,0,0,0.2)] w-full h-full flex items-center justify-center'>
      <div className="loaderDog"></div>
    </div>
  )
}

export default Loading