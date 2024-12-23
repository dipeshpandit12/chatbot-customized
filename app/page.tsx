import Link from "next/link";

export default function Home() {

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center">
      <h1 className="text-white text-5xl mb-4">Design your customized chatbot</h1>
      <Link href="/dashboard"><button className="bg-blue-500 text-white px-4 py-2 rounded-md">Create</button></Link>
    </div>
  );
}
