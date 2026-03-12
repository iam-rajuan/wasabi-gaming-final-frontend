import Image from 'next/image'
import Link from 'next/link'
import { Sparkles } from 'lucide-react'
import { Button } from '../ui/button'

const CommunitySection = () => {
  return (
    <section
      className="lg:py-28 py-7 px-4"
      style={{
        backgroundImage: "url('/banner.png')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="mx-auto container flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-40">
        {/* Image */}
        <div className="w-full max-w-md sm:max-w-lg lg:max-w-xl">
          <Image
            src="/project2.png"
            alt="Community"
            width={900}
            height={900}
            className="w-full h-auto rounded-xl shadow-lg"
            priority
          />
        </div>

        {/* Text Content */}
        <div className="max-w-4xl text-center lg:text-left">
          <Button
            variant="secondary"
            size="sm"
            className="rounded-full border mb-5 border-[#EBEBEB] text-[#2B6BA1] bg-[#EBEBEB] backdrop-blur"
          >
            <Sparkles className="mr-2 h-4 w-4" />
            Career Insight Tools
          </Button>
          <h3 className="text-2xl sm:text-[52px] leading-10 lg:leading-[60px]  font-bold mb-4">
            <span className="text-[#E4E403]">
              Psychometric Test <br />{' '}
            </span>{' '}
            Discover Your Strengths, Interests, And Career Fit
          </h3>

          <p className="text-[#5A5A5A]">
            Discover how your skills, interests, and working style align with
            different career paths, helping you make more confident choices
            about your next steps.
          </p>

          <Link href="/dashboard/psychometric-test">
            <Button className="py-3 px-8 mt-6 rounded-full hover:bg-[#E4E403]/90 bg-[#FFFF00] text-[#0A0A0A] font-bold shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 transition-all duration-300">
              Start Assessment
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default CommunitySection
