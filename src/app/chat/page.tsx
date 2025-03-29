import { auth } from "@clerk/nextjs/server";
import { Chat } from "@/components/Chat";
import Modal from "@/components/Modal";

export default async function ChatPage() {
  const { userId, redirectToSignIn } = await auth();

  if (!userId) {
    return redirectToSignIn();
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-white ">
      <main className="w-full max-w-4xl flex-1 flex items-center justify-center">
        <Chat />
      </main>
      <Modal />
    </div>
  );
}
