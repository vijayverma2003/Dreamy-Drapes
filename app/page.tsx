import { getServerSession } from "next-auth";
import Collection from "./components/Collection";
import Footer from "./components/Footer";
import GetInTouch from "./components/GetInTouch";
import Hero from "./components/Hero";
import Navbar from "./components/Navbar";
import authOptions from "./auth/authOptions";

export default async function Home() {
  const session = await getServerSession(authOptions);
  console.log(session);

  return (
    <main>
      <Hero />
      <Collection />
      <GetInTouch />
    </main>
  );
}
