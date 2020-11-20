import React from "react"
import "./Loading.css"

export const Loading = () => {
  return (
    <div className="loading-backdrop">
      <div className="spinner-border text-light" role="status">
        <span className="sr-only">Loading...</span>
      </div>
    </div>
  )
}
