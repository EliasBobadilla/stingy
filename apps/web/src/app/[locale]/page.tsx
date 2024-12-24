import { getServerSession } from "next-auth";
import auth from "@/auth";
import { LandingPage } from "@/components/LandingPage";

export default async function IndexPage() {
  const session = await getServerSession(auth);

  return <LandingPage session={session} />;
}
