import Hero from '@/components/marketing-students-school/Hero'
import ToolsSection from '@/components/marketing-students-school/ToolsSection'
import CommunitySection from '@/components/marketing-students-school/CommunitySection'
import HowItWorksSection from '@/components/marketing-students-school/HowItWorksSection'
import Model from '@/components/marketing-students-school/Model'
import Interview from '@/components/marketing-students-school/Interview'
import HowALNWorks from '@/components/marketing-students-school/web/aln-network'
import AchievementsSection from '@/components/marketing-students-school/web/achivement-section'
import Testimonial from '@/components/marketing-students-school/Testomonial'
import { StoryBehind } from '@/components/marketing-students-school/web/behind-story'
import { StudentFAQSection } from '@/components/marketing-students-school/StudentFAQSection'

const StudentHome = () => {
  return (
    <div
      style={{
        background: 'linear-gradient(175deg, #FDF063 -4.84%, #FEFBDD 105.75%)',
      }}
    >
      <Hero />
      <ToolsSection />
      <CommunitySection />
      <HowItWorksSection />
      {/* <Opportunities /> */}
      <Model />
      <Interview />
      {/* <FeaturedOpportunities /> */}
      <HowALNWorks />
      <AchievementsSection />
      <Testimonial />
      {/* <ReviewsSection /> */}
      <StoryBehind />
      <StudentFAQSection />
    </div>
  )
}

export default StudentHome
