import { Button } from "@/components/ui/button";

interface InstructionsProps {
    onProceed: () => void;
    interview?: any;
}

export default function Instructions({ onProceed }: InstructionsProps) {
    return (
        <section className="min-h-screen bg-white py-12 md:py-20 px-4 md:px-8 lg:px-16 font-poppins">
            {/* ---------- Title (fixed‑like, but in flow) ---------- */}
            <div>
                <h1 className="text-4xl text-[#303030] mb-12">
                    Mock Interview Simulation
                </h1>
            </div>

            <div className="flex flex-col items-center">
                {/* ---------- Main Card ---------- */}
                <div className="w-full max-w-3xl bg-white border border-[#d9d9d9] rounded-lg p-8 md:p-12 shadow-sm text-[#4A5565]">
                    {/* Greeting */}
                    <p className="text-base text-[#303030] mb-6">
                        Dear Candidate,
                        <br />
                        As the next step in the recruitment process, you are invited to
                        complete a short AI video assessment. This simulates a real-world
                        interview and allows us to assess your foundational legal
                        competencies and communication skills. Instructions for the
                        Assessment:
                    </p>

                    <ul className="space-y-3 text-[#303030] mb-8">
                        <li>
                            • This video assessment is designed to take approximately 10
                            minutes. The exact number of questions may vary.
                        </li>
                        <li>• The entire assessment must be completed in one sitting.</li>
                        <li>
                            • After your first question appears, an automated timer will
                            begin. You will be given 20 seconds of preparation time before the
                            recording starts for each question. You may begin recording early
                            if you feel ready.
                        </li>
                        <li>
                            • You will have the opportunity to review your recorded answers at
                            the end of the entire assessment. If you feel your responses are
                            unsatisfactory, you will have one chance to retake the entire
                            assessment.
                        </li>
                        <li>
                            • The questions will be situational and competency-based to assess
                            your natural, spontaneous response under pressure—a key skill for
                            a legal professional.
                        </li>
                    </ul>

                    {/* Equipment Title */}
                    <p className="mb-4 font-semibold text-[#303030]">Essential Equipment & Environment Check:</p>

                    <ul className="space-y-3 text-[#303030]">
                        <li>
                            • Clarity is Crucial: Please conduct the interview in a well-lit
                            area with a strong, stable WiFi connection. Your face must be
                            clearly visible; avoid sitting directly in front of bright windows
                            or light sources that create shadows.
                        </li>
                        <li>
                            • Browser Requirement: This interview recording system is
                            currently only compatible with Chrome or Firefox. Please ensure
                            you are using one of these browsers.
                        </li>
                        <li>
                            • Technical Check: We will require access to your video camera and
                            microphone. You will be guided through a practice question to test
                            your audio and video quality before the actual assessment begins.
                        </li>
                        <li>
                            • Professional Setup: Please position yourself centrally within
                            the frame, sit upright, and maintain eye contact with your camera
                            as you deliver your responses.
                        </li>
                    </ul>
                    <p className="my-6 text-[#303030]">
                        Click on the &quot;Proceed&quot; button when you are confident and ready to
                        begin. Best of luck!
                    </p>
                </div>
                <div className="flex justify-center mt-10">
                    <Button
                        onClick={onProceed}
                        className="w-[227px] h-10 bg-[#ffff00] text-[#1e1e1e] hover:bg-[#e6e600] rounded-[14px] font-bold text-base shadow-none border-none"
                    >
                        Proceed
                    </Button>
                </div>
            </div>
        </section>
    );
}
