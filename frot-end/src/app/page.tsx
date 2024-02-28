import { Login } from "@/components/Login";
import Image from "next/image";

const Home = () => {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between">
      <Login />
    </main>
  );
}

export default Home