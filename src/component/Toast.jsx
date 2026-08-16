const Toast = () => {
  return (
    <div className="bugsy-toast">
            <p className="text-sm">This is a toast notification!</p>
            <button className="bugsy-btn bugsy-btn--subtle bugsy-btn--compact" onClick={() => console.log('Toast dismissed')}>
                Dismiss
            </button>
    </div>
  )
}

export default Toast
