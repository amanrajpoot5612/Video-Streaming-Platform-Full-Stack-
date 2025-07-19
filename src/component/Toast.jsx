import React from 'react'

const Toast = () => {
  return (
    <div>
        <div className="fixed bottom-4 right-4 bg-white text-black p-4 rounded-lg shadow-lg">
            <p className="text-sm">This is a toast notification!</p>
            <button className="mt-2 text-blue-500 hover:underline" onClick={() => console.log('Toast dismissed')}>
                Dismiss
            </button>
        </div>
    </div>
  )
}

export default Toast