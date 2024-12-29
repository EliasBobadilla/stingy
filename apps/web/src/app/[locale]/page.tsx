import auth from "@/auth";
import { LandingPage } from "@/components/LandingPage";
import { getServerSession } from "next-auth";

export default async function IndexPage() {
  const session = await getServerSession(auth);

  return <LandingPage session={session} />;
}
