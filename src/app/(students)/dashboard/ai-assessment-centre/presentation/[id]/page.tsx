
import React from 'react'
import PresentationTaskPage from './_components/presentation-container'

const PresentationPage = ({params}:{params:{id:string}}) => {
  return (
    <div>
        <PresentationTaskPage id={params?.id}/>
    </div>
  )
}

export default PresentationPage