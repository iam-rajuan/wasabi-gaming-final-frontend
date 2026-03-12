import React, { Suspense } from 'react'
import RejectedContainer from './_components/rejected-container'

const RejectedPage = () => {
  return (
    <div>
       <Suspense>
         <RejectedContainer/>
       </Suspense>
    </div>
  )
}

export default RejectedPage