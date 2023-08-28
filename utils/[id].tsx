import { useEffect } from "react";
import { useRouter } from "next/router";
import Spinner from "@/components/UI/Spinner";

export default function IdPage() {
  const router = useRouter();
  const { id } = router.query;
  const idWithDots = typeof id === "string" && /:/.test(id) ? id.replace(/:/g, ".") : id;

  // Simulate some delay for demonstration purposes
  useEffect(() => {
    router.push(`/server-detail/${idWithDots}`);
  }, []);

  // Show a loading spinner or message while redirecting
  return (
    <div className="flex flex-row justify-center items-center m-10">
      <p className="text-2xl mr-4">Redirecting...</p>
      <Spinner></Spinner>
    </div>
  );
}

export async function getServerSideProps() {
  // This won't actually be called, as the redirection happens in the useEffect
  return {
    props: {},
  };
}
