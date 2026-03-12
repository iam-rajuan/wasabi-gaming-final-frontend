import StudentApplications from "@/components/school/student-management/StudentApplications";

export const metadata = {
    title: "Student Applications | Aspiring",
    description: "View student application history and status.",
};

export default function StudentApplicationsPage() {
    return (
        <main>
            <StudentApplications />
        </main>
    );
}
