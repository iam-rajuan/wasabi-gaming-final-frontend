import { useState } from 'react'
import { PiCaretUpDownFill } from 'react-icons/pi'
import { Star } from 'lucide-react'
import image1 from '../../../assets/images/stars 1.png'
import image2 from '../../../assets/images/staro 1.png'
import image3 from '../../../assets/images/blacko 1.png'
import image4 from '../../../assets/images/Starblack 1.png'
import BannerCard from './bannerCard.jsx'
import JoinCommunityModal from '@/components/marketing-students-school/JoinCommunityModal'
import { useRouter } from 'next/navigation'
import { useUserProfile } from '@/hooks/useUserProfile'
import { toast } from 'sonner'
const StudentHero = () => {
  const [selectedType, setSelectedType] = useState('')
  const [selectedLocation, setSelectedLocation] = useState('')
  const [openModal, setOpenModal] = useState(false)
  const router = useRouter()
  const { hasActiveSubscription, isAuthenticated } = useUserProfile()
  const [isTypeOpen, setIsTypeOpen] = useState(false)
  const [isLocationOpen, setIsLocationOpen] = useState(false)

  const types = ['Apartment', 'House', 'Villa', 'Condo', 'Studio']
  const locations = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Miami']

  const handleSearch = () => {
    console.log('Searching with:', { selectedType, selectedLocation })
    alert(
      `Searching for:\nType: ${selectedType || 'Any'}\nLocation: ${selectedLocation || 'Any'
      }`,
    )
  }
  return (
    <div className="bg-[#fefbd7] h-auto py-10 relative">
      {/* content */}
      <div className="md:pt-8  lg:pt-16  p-4 relative">
        <img
          className="absolute top-0 left-[140px] z-0"
          src={image1.src}
          alt=""
        />
        <img className="absolute top-0 right-0 z-0" src={image2.src} alt="" />
        <img
          className="absolute bottom-[-40px]  left-[60px] z-0"
          src={image3.src}
          alt=""
        />

        <div className="flex flex-col justify-center items-center md:space-y-6 space-y-2 lg:space-y-8 z-30">
          <h1 className="banner-color highlight-color source text-xs md:text-2xl lg:text-[34px] 2xl:text-[52px] uppercase font-semibold text-center  z-30 ">
            Pursue your legal <span className="text-[#D9D937]">dreams </span>
            with confidence
          </h1>
          <p className=" source text-[#464646] md:text-base text-xs lg:text-xl font-normal uppercase  z-30 ">
            Join the Aspiring Legal Network - Get the support, tools, and
            guidance you need to start your journey in law.
          </p>
          {/* input field for search start */}
          <div className="flex items-center justify-center p-4 container mx-auto w-3/4  z-30">
            <div className="w-full  bg-white rounded-xl shadow-sm px-4 py-2">
              <div className="flex flex-col md:flex-row items-stretch md:items-center gap-3">
                {/* Type Dropdown */}
                <div className="relative flex-1">
                  <button
                    onClick={() => {
                      setIsTypeOpen(!isTypeOpen)
                      setIsLocationOpen(false)
                    }}
                    className="w-full px-3 py-2 bg-white text-left base-color neuton text-base flex items-center justify-between focus:outline-none"
                  >
                    <span
                      className={selectedType ? 'text-gray-700 ' : 'base-color'}
                    >
                      {selectedType || 'Select Type'}
                    </span>
                    <PiCaretUpDownFill />
                  </button>

                  {isTypeOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg">
                      {types.map(type => (
                        <button
                          key={type}
                          onClick={() => {
                            setSelectedType(type)
                            setIsTypeOpen(false)
                          }}
                          className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg"
                        >
                          {type}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Vertical Divider */}
                <div className="w-px h-8 bg-gray-200"></div>

                {/* Location Dropdown */}
                <div className="relative flex-1">
                  <button
                    onClick={() => {
                      setIsLocationOpen(!isLocationOpen)
                      setIsTypeOpen(false)
                    }}
                    className="w-full px-3 py-2 bg-white text-left base-color neuton text-base flex items-center justify-between focus:outline-none   z-30"
                  >
                    <span
                      className={
                        selectedLocation ? 'text-gray-700 ' : 'base-color '
                      }
                    >
                      {selectedLocation || 'Select Location'}
                    </span>
                    <PiCaretUpDownFill />
                  </button>

                  {isLocationOpen && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-100 rounded-lg shadow-lg">
                      {locations.map(location => (
                        <button
                          key={location}
                          onClick={() => {
                            setSelectedLocation(location)
                            setIsLocationOpen(false)
                          }}
                          className="w-full px-3 py-2 text-sm text-left hover:bg-gray-50 transition-colors first:rounded-t-lg last:rounded-b-lg z-30"
                        >
                          {location}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* Search Button */}
                <button
                  onClick={handleSearch}
                  className=" px-2 lg:px-6 py-2 yellow main-color font-bold neuton rounded-lg  transition-colors border border-[#D9D937]"
                >
                  Search
                </button>
              </div>
            </div>
          </div>
          {/* input field for search end*/}

          <div className="flex flex-col lg:flex-row gap-7 items-center">
            <button className="yellow main-color font-bold border-2 border-[#D9D937] py-2 px-8 lg:px-16 rounded-full neuton">
              Start Now
            </button>
            <button onClick={() => {
              if (!isAuthenticated || !hasActiveSubscription) {
                toast.error('This feature requires an active subscription')
                router.push('/plans')
                return
              }
              setOpenModal(true)
            }} className="hover:yellow main-color font-bold border-2 border-[#D9D937] py-2 px-8 lg:px-16 rounded-full neuton">
              Join community
            </button>
          </div>
        </div>

        {/* Floating Stats Card - Refined */}
        <div className="absolute top-[10%] right-[3%] hidden lg:flex bg-white py-3 px-4 rounded-[30px] shadow-2xl flex-col items-start gap-3 z-30 animate-in fade-in slide-in-from-bottom-4 duration-700">
          {/* Avatars */}
          <div className="flex -space-x-4">
            {[
              '/testomonial1.jpg',
              '/testomonial2.jpg',
              '/testomonial3.jpg',
              '/heroimage.jpg',
              '/career.jpg',
            ].map((src, i) => (
              <div
                key={i}
                className="relative w-10 h-10 border-[3px] border-white rounded-full overflow-hidden shadow-sm"
              >
                <img
                  src={src}
                  alt="Student"
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>

          {/* Stars */}
          <div className="flex gap-1.5">
            {[...Array(5)].map((_, i) => (
              <Star key={i} className="w-5 h-5 fill-[#FFB903] text-[#FFB903]" />
            ))}
          </div>

          {/* Text */}
          <p
            className="text-black whitespace-nowrap"
            style={{
              fontWeight: 400,
              fontSize: '12px',
              lineHeight: '120%',
              letterSpacing: '0%',
            }}
          >
            Joined by Students Nationwide
          </p>
        </div>
      </div>

      {/* card section */}
      <div className="mt-10 relative">
        <img className="absolute top-0 right-0 z-0" src={image4.src} alt="" />
        <div className="flex flex-col justify-center items-center space-y-3">
          <h1 className="font-bold text-4xl neuton main-color">
            Everything You Need to Launch Your Career
          </h1>
          <p className="base-color source text-center px-4 lg:text-2xlg text-xl">
            The Aspiring Legal Network equips you with smart tools to build,
            prepare, and excel in your career.
          </p>

          <BannerCard></BannerCard>
        </div>
        <img
          className="absolute bottom-[400px] right-0 z-0"
          src={image2.src}
          alt=""
        />
        <img
          className="absolute bottom-[-40px]  left-[60px] z-0"
          src={image3.src}
          alt=""
        />
      </div>
      {/* MODAL */}
      <JoinCommunityModal open={openModal} onOpenChange={setOpenModal} />
    </div>
  )
}

export default StudentHero
