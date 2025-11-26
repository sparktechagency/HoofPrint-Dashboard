import { useGetPrivacyPolicyPublicQuery } from "../../../features/api/publicApi";

const GetPrivacyPolicy = () => {
  const { data, isLoading, isError } = useGetPrivacyPolicyPublicQuery();

  if (isLoading) return <div>Loading Privacy Policy...</div>;
  if (isError) return <div>Error loading Privacy Policy.</div>;

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="my-6 text-2xl font-bold">Privacy Policy</h2>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data?.data?.description }}
        ></div>
      </div>
    </div>
  );
};

export default GetPrivacyPolicy;
