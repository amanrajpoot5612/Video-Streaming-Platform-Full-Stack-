import Render from "../Render/Render"


const Movies = () => {
  return (
    <div className='w-full h-full textured-bg'>
      <div className='header w-full h-12 bg-navbar flex items-center justify-center'>
        <h1 className='text-2xl'>Movies</h1>
      </div>
      <Render></Render>
    </div>
  )
}

export default Movies