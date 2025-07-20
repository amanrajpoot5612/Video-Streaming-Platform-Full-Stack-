import React from 'react'
import HistoryVideoCard from '../../component/HistoryVideoCard'
import videos from '../../context/DemoData'
import RenderHistory from '../Render/RenderHistory'

const History = () => {
  return (
    <div className="history w-full h-full flex flex-col items-center justify-start gap-4">
    
    <div className="header h-full w-full bg-navbar flex items-center justify-center">
                <h1 className='text-2xl'>History</h1>
            </div>
    <RenderHistory/>
    </div>
  )
}

export default History