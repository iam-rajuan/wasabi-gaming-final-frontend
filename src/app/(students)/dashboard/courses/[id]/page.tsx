import React from 'react'
import SingelCourse from './_components/singelCourse'

const page = ({ params }: { params: { id: string }}) => {
    return (
        <div>
            <SingelCourse id={params.id} />
        </div>
    )
}

export default page