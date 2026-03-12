import Image from 'next/image'

export const Footer = () => {
  return (
    <footer className="main-bg-color py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8">
          {/* Logo & Description */}
          <div className="flex flex-col items-start">
            <Image
              src={'/aspiring.png'}
              alt="Aspiring Legal Network Logo"
              width={120}
              height={120}
              className="mb-6"
            />
            <p className="text-gray-800 text-sm md:text-base leading-relaxed">
              Supporting Tomorrow&apos;s Legal Talent Today!
            </p>
          </div>

          {/* About Links */}
          <div className="text-left">
            <h3
              className="text-xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Neuton', serif" }}
            >
              About
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-900 transition text-sm md:text-base"
                >
                  About us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-900 transition text-sm md:text-base"
                >
                  Contact us
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-900 transition text-sm md:text-base"
                >
                  FAQ
                </a>
              </li>
            </ul>
          </div>

          {/* Legal Links */}
          <div className="text-left">
            <h3
              className="text-xl font-bold text-gray-900 mb-4"
              style={{ fontFamily: "'Neuton', serif" }}
            >
              Legal and Accesibility
            </h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="#"
                  className="text-gray-800 hover:text-gray-900 transition text-sm md:text-base"
                >
                  Privacy policies
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider & Copyright */}
        <hr className="border-gray-400 mt-12 md:mt-16 mb-6" />
        <p className="text-left text-[#424242] font-bold text-sm main-font md:text-xl">
          @copyright aspiringlegalwork.2025 . All right reserves
        </p>
      </div>
    </footer>
  )
}
