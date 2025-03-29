// import { auth } from "@clerk/nextjs/server";
import { Chat } from "@/components/Chat";
import Modal from "@/components/Modal";
import Image from "next/image";

export default async function ChatPage() {
  // const { userId, redirectToSignIn } = await auth();

  // if (!userId) {
  //   return redirectToSignIn();
  // }

  return (
    <div className="relative flex flex-col items-center justify-between min-h-screen bg-white/70">
      {/* Background Image with Blur */}
      <div className="absolute inset-0 -z-10">
        <Image
          src="/hero-illustration2.jpg" // Replace with your actual image path
          alt="Chat Background"
          fill
          className="object-cover object-center blur-lg"
          quality={100}
          priority
        />
        <div className="absolute inset-0 bg-black/40"></div> {/* Dark overlay */}
      </div>

      <main className="relative w-full max-w-4xl flex-1 flex items-center justify-center">
        <Chat />
      </main>

      <Modal />
    </div>
  );
}
