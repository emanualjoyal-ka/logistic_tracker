

const notFound = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
        <p className="text-6xl pb-5 tracking-widest font-bold">404 <span className="text-gray-400">ERROR</span></p>
        <p className="tracking-widest text-gray-400 uppercase">The page you are trying to access doesn't exist or has been removed.</p>
    </div>
  )
}

export default notFound