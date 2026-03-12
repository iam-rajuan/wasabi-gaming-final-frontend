import React from 'react';

const FeaturedOpportunities = () => {
  const opportunities = [
    { title: 'DWF', desc: 'Solicitor Apprenticeship Insights Evening' },
    { title: 'Allen & Overy', desc: 'Summer Vacation Scheme' },
    { title: 'Clifford Chance', desc: 'Virtual Insight Session' },
    // { title: 'Linklaters', desc: 'Work Experience Programme' },
    // { title: 'Freshfields', desc: 'Legal Workshop' },
    // { title: 'Slaughter and May', desc: 'Open Day' },
    // Add more opportunities here
  ];

  return (
    <section className="py-20">
      <h3 className="text-3xl font-bold text-center mb-12">Featured Opportunities</h3>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {opportunities.map((opportunity, index) => (
          <div
            key={index}
            className="bg-white rounded-xl shadow-lg p-6 flex flex-col justify-between "
          >
            <div className='space-y-3'>
              <h2 className="text-xl font-bold text-[#0A0A0A] text-[40px] mb-2">{opportunity.title}</h2>
                <p className="text-[#0A0A0A]">{opportunity.desc}</p>
              <p className="text-[#0A0A0A] text-sm">10 July 2024</p>
            </div>
            <button className="bg-[#F7E83D] hover:bg-[#F7E83D]/80 text-black font-semibold py-2 px-6 rounded-full mt-4  transition">
              View details
            </button>
          </div>
        ))}
      </div>

      <div className="text-center mt-12">
        <button className="bg-[#F7E83D] hover:bg-[#F7E83D]/80 text-black font-bold py-3 px-8 rounded-full transition">
          View all live opportunities
        </button>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;
