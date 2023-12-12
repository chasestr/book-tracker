// import { useRouter } from "next/router";
// import { useEffect } from "react";
import { useCurrentUserQuery } from "../generated/graphql";

export const isLoggedIn = () => {
  const { data, loading } = useCurrentUserQuery({ ssr: false });
  if (!data?.currentUser && !loading) {
    return false;
  }
  return true;
  // const router = useRouter();
  // useEffect(() => {
  //   if (!data?.currentUser && !loading) {
  //     router.replace("/login?next=" + router.pathname);
  //   }
  // }, [data, router]);
};
