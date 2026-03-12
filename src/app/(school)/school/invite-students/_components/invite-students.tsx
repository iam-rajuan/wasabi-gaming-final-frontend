import React from 'react'
import BulkInvitation from './bulk-invitation'
import SingleInvitation from './single-invitation'

const InviteStudents = () => {
    return (
        <div className="">
            <div className="bg-[#FFFEF0]">
                <div className="container mx-auto bg-[#FFFEF0]  py-8 md:py-12 lg:py-16">
                     <h1 className="text-2xl md:text-4xl lg:text-5xl text-[#1E1E1E] font-normal ">Invite Students</h1>
                <p className="text-base md:text-lg lg:text-xl font-normal text-[#666666] pt-3">Quickly onboard students to your platform with personalised invitations</p>
                </div>
               
            </div>

            <div className='container mx-auto grid grid-cols-1 md:grid-cols-2 gap-6 py-8 md:py-12 lg:py-16'>
                <SingleInvitation />
                <BulkInvitation />
            </div>
        </div>
    )
}

export default InviteStudents