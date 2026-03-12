
import { CircleCheckBig } from 'lucide-react'
import React from 'react'

const StartBuildingYourStudent = () => {
  return (
    <div>
        <div className="w-full bg-[#FFFF00] rounded-2xl py-14 md:py-16 lg:py-20 px-5 text-center ">
                <div className="w-12 h-12 bg-[#1E1E1E] rounded-[16px] flex items-center justify-center mx-auto mb-6">
                    <CircleCheckBig  className="text-[#FFFF00] w-6 h-6" />
                </div>
                <h3 className="text-2xl md:text-3xl lg:text-4xl font-normal text-[#1E1E1E] mb-3">Start Building Your Student Network</h3>
                <p className="text-[#1E1E1ECC]/80 text-base md:text-lg font-normal">Invite students now and help them succeed in their career journey through personalized guidance and opportunities.</p>
                
            </div>
    </div>
  )
}

export default StartBuildingYourStudent