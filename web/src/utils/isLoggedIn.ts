import { useRouter } from "next/router";
import { useEffect } from "react";
import { useCurrentUserQuery } from "../generated/graphql";

export const isLoggedIn = () => {
  const [{ data, fetching }] = useCurrentUserQuery();
  const router = useRouter();
  useEffect(() => {
    if (!data?.currentUser && !fetching) {
      router.replace("/login?next=" + router.pathname);
    }
  }, [data, router]);
};
