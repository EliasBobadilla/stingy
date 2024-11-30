import { handleGoogleSignIn } from "@/app/actions/authActions";

export default function SignIn() {
  return (
    <div>
      <form
        action={() => handleGoogleSignIn()}
        className="bg-white p-6 rounded-lg shadow-md"
      >
        <button type="submit">Sign in with Google</button>
      </form>
    </div>
  );
}
