import React, { Suspense } from 'react'
import AcceptedContainerPage from './_components/accepted-container'

const AcceptedPage = () => {
  return (
    <div className="h-screen flex items-center justify-center px-4 md:px-2">
      <Suspense >
        <AcceptedContainerPage/>
      </Suspense>
    </div>
  )
}

export default AcceptedPage