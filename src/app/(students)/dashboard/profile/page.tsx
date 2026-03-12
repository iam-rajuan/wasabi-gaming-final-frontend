import ProfileSettingsSection from "@/components/student/ProfileSettingsSection";

export const metadata = {
    title: "Profile Settings | Aspiring",
    description: "Manage your professional identity and account security.",
};

export default function ProfilePage() {
    return (
        <main>
            <ProfileSettingsSection />
        </main>
    );
}
