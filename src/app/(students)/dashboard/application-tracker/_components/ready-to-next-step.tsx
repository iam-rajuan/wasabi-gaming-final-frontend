


// "use client";

// import { useState } from "react";
// import { Button } from "@/components/ui/button";
// import { Plus, Search } from "lucide-react";
// import RecommendedJobsModal from "./RecommendedJobsModal";

// const ReadyToNextStep = () => {
//   const [isModalOpen, setIsModalOpen] = useState(false);

//   return (
//     <>
//       <div className="rounded-[16px] bg-gradient-to-b from-[#FFFF00] to-[#E6E600] py-10 px-6 text-center space-y-6 shadow-md">
//         <div className="space-y-2">
//           <h2 className="text-xl md:text-2xl font-semibold text-[#1E1E1E] leading-[32px]">
//             Ready to Take the Next Step?
//           </h2>
//           <p className="text-sm md:text-base text-[#1E1E1E] leading-[24px] font-normal">
//             Track progress. Stay organized. Keep growing with Aspiring.
//           </p>
//         </div>

//         <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
//           <Button
//             variant="secondary"
//             className="w-full md:w-auto bg-white shadow-[0px_4px_6px_-1px_#0000001A] rounded-[14px] border-[2px] border-white hover:border-[#FFFF00] py-2 px-6 gap-2 text-sm font-medium text-[#1E1E1E] leading-[20px]"
//           >
//             <Plus className="w-4 h-4" />
//             Add New Application
//           </Button>

//           <Button
//             onClick={() => setIsModalOpen(true)}
//             className="w-full md:w-auto rounded-[14px] px-6 py-2 gap-2 border border-[#1E1E1E] bg-transparent text-[#1E1E1E] hover:bg-black/90 hover:text-white"
//           >
//             <Search className="w-4 h-4" />
//             View Recommended Jobs
//           </Button>
//         </div>
//       </div>

//       <RecommendedJobsModal
//         open={isModalOpen}
//         onOpenChange={setIsModalOpen}
//       />
//     </>
//   );
// };

// export default ReadyToNextStep;




"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Search } from "lucide-react";
import RecommendedJobsModal from "./RecommendedJobsModal";
import AddManualJobModal from "./AddManualJobModal";   // ← new import

export default function ReadyToNextStep() {
  const [isRecommendModalOpen, setIsRecommendModalOpen] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  return (
    <>
      <div className="rounded-[16px] bg-gradient-to-b from-[#FFFF00] to-[#E6E600] py-10 px-6 text-center space-y-6 shadow-md">
        <div className="space-y-2">
          <h2 className="text-xl md:text-2xl font-semibold text-[#1E1E1E] leading-[32px]">
            Ready to Take the Next Step?
          </h2>
          <p className="text-sm md:text-base text-[#1E1E1E] leading-[24px] font-normal">
            Track progress. Stay Organised. Keep growing with Aspiring Legal Network.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            onClick={() => setIsAddModalOpen(true)}
            variant="secondary"
            className="w-full md:w-auto bg-white shadow-[0px_4px_6px_-1px_#0000001A] rounded-[14px] border-[2px] border-white hover:border-[#FFFF00] py-2 px-6 gap-2 text-sm font-medium text-[#1E1E1E] leading-[20px]"
          >
            <Plus className="w-4 h-4" />
            Add New Application
          </Button>

          <Button
            onClick={() => setIsRecommendModalOpen(true)}
            className="w-full md:w-auto rounded-[14px] px-6 py-2 gap-2 border border-[#1E1E1E] bg-transparent text-[#1E1E1E] hover:bg-black/90 hover:text-white"
          >
            <Search className="w-4 h-4" />
            View Recommended Jobs
          </Button>
        </div>
      </div>

      <RecommendedJobsModal
        open={isRecommendModalOpen}
        onOpenChange={setIsRecommendModalOpen}
      />

      <AddManualJobModal
        open={isAddModalOpen}
        onOpenChange={setIsAddModalOpen}
      />
    </>
  );
}