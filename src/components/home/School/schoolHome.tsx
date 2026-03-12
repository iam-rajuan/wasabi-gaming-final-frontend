import Applications from '@/components/marketing-students-school/school/Applications'
import Assembly from '@/components/marketing-students-school/school/Assembly'
import Features from '@/components/marketing-students-school/school/Features'
import { FeaturesSection } from '@/components/marketing-students-school/school/FeaturesSection'
import Minutes from '@/components/marketing-students-school/school/Minutes'
import Student from '@/components/marketing-students-school/school/Student'
import { FAQSection } from '@/components/marketing-students-school/SchoolFAQSection'
import { SchoolHero } from '@/components/marketing-students-school/SchoolHero'
import Testimonial from '@/components/marketing-students-school/Testomonial'
import AchievementsSection from '@/components/marketing-students-school/web/achivement-section'
import { StoryBehind } from '@/components/marketing-students-school/web/behind-story'

const SchoolHome = () => {
  return (
    <div>
      {/* the actual components to be in school */}
      <SchoolHero />
      <Features />
      <FeaturesSection />
      <Minutes />
      <Assembly />
      <Student />
      <Applications />
      {/* <HowALNWorks /> */}
      <AchievementsSection />
      <Testimonial />
      {/* <ReviewsSection /> */}
      <StoryBehind />
      <FAQSection />
    </div>
  )
}

export default SchoolHome
