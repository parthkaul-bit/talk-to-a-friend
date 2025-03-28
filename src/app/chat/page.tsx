import { auth } from "@clerk/nextjs/server";
import { Chat } from "@/components/Chat";

export default async function ChatPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-ffffff">
      <main className="w-full max-w-4xl p-4">
        <Chat />
      </main>
    </div>
  );
}
