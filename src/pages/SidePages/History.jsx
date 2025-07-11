import React from 'react'
import HistoryVideoCard from '../../component/HistoryVideoCard'
import videos from '../../context/DemoData'

const History = () => {
  return (
    <div className="history w-full h-full flex flex-col items-center justify-start gap-4">
    
    <div className="header h-full w-full bg-navbar flex items-center justify-center">
                <h1 className='text-2xl'>History</h1>
            </div>
    <div className='w-full h-full textured-bg history flex flex-col items-center justify-start gap-4'>
      {videos.map((video , index) => {
        return (
          <HistoryVideoCard video={video} key={index}/>
        )
      })}
    </div>
    </div>
  )
}

export default History