import { Header } from "@/components/layout/header";
import { ProfileInfo } from "@/features/profile/components/profile-info";
import { UserItems } from "@/features/profile/components/user-items";

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <ProfileInfo />
          <UserItems />
        </div>
      </main>
    </div>
  );
}
