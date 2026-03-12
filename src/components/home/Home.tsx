import React, { useState, useEffect } from 'react'

import StudentHome from './student/studentHome'
import { secureStorage } from '../../utils/secureStorage'
import { ActiveSection } from '../../constant/navConstant'
import SchoolHome from './School/schoolHome'

const Home = () => {
  const [activeSection, setActiveSection] = useState(
    secureStorage.getItem('activeSection') || ActiveSection.Students,
  )

  useEffect(() => {
    const interval = setInterval(() => {
      const storedSection =
        secureStorage.getItem('activeSection') || ActiveSection.Students
      if (storedSection !== activeSection) {
        setActiveSection(storedSection)
      }
    }, 300)

    return () => clearInterval(interval)
  }, [activeSection])

  return (
    <div>
      {activeSection === ActiveSection.School ? (
        <SchoolHome />
      ) : (
        <StudentHome />
      )}
    </div>
  )
}

export default Home
