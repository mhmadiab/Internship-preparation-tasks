import React from 'react'
import { Spinner } from 'react-bootstrap'

const Loading = ({text}) => {
  return (
    <div className="text-center mt-3">
        <Spinner animation="border" role="status" />
        <span className="ms-2">{text}...</span>
    </div>
  )
}

export default Loading