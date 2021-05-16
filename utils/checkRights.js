import { useSession, getSession } from "next-auth/client";
import { useRouter } from "next/router";

const checkRightsClient = (WrappedComponent, right) => {
  return (props) => {
    const [session, loading] = useSession();
    // checks whether we are on client / browser or server.
    if (typeof window !== "undefined") {
      const Router = useRouter();

      // If there is no access token we redirect to "/" page.
      if (!session) {
        Router.replace("/");
        return null;
      }

      if (session?.user?.roles !== right) {
        return null;
      }
      return <WrappedComponent {...props} />;
      // If this is an accessToken we just render the component that was passed with all its props
    }

    // If we are on server, return null
    return null;
  };
};

const checkRightsAPI = async (req, right) => {
  const session = await getSession({ req });
  if (typeof window === "undefined") {
    // If there is no access token we redirect to "/" page.
    if (!session) {
      return false;
    }

    if (session?.user?.roles !== right) {
      return false;
    }
    return true;
    // If this is an accessToken we just render the component that was passed with all its props
  }
};

export { checkRightsClient, checkRightsAPI };
