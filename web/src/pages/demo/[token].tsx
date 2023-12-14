import React, { useEffect, useState } from "react";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { PageWrapper } from "../../components/PageWrapper";
import { ErrorComponent } from "../../components/base/Error";
import LoadingSpinner from "../../components/base/LoadingSpinner";
import DemoModal from "../../components/demo/DemoModal";
import { useCreateDemoUserMutation } from "../../generated/graphql";
import withNoSSR from "../../components/base/NoSSR";

export const CreateDemo: NextPage = () => {
  const router = useRouter();
  const [createAccount, { loading, error }] = useCreateDemoUserMutation();
  const [showModal, setShowModal] = useState(true);
  const token =
    typeof router.query.token === "string" ? router.query.token : "";

  const valid = token === process.env.NEXT_PUBLIC_DEMO_TOKEN;

  useEffect(() => {
    const verifyAndCreateAccount = async () => {
      try {
        if (valid) {
          await createAccount();
        }
      } catch (error) {
        console.error("Account creation failed:", error);
      }
    };

    verifyAndCreateAccount();
  }, []);

  if (!valid) {
    return (
      <PageWrapper>
        <ErrorComponent
          message={`The token provided in your URL is not the correct demo token. Please verify the URL or reach out for a new one.`}
        />
      </PageWrapper>
    );
  }

  if (!showModal && loading) {
    return (
      <PageWrapper demo>
        <LoadingSpinner />
      </PageWrapper>
    );
  }

  if (!valid) {
    return (
      <PageWrapper>
        <ErrorComponent
          message={`We were unable to create your demo account. Please try again or contact for assistance.`}
        />
      </PageWrapper>
    );
  }

  if (!showModal && !loading && !error) {
    router.push("/");
  }

  if (showModal) {
    return (
      <PageWrapper demo>
        <DemoModal isOpen={showModal} onClose={() => setShowModal(false)} />
      </PageWrapper>
    );
  }

  return (
    <PageWrapper demo>
      <LoadingSpinner />
    </PageWrapper>
  );
};

export default withNoSSR(CreateDemo);
