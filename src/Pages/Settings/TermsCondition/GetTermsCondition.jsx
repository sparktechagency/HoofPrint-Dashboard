import { useGetTermsConditionsPublicQuery } from "../../../features/api/publicApi";

const GetTermsCondition = () => {
  const { data, isLoading, isError } = useGetTermsConditionsPublicQuery();

  if (isLoading) return <div>Loading Terms & Conditions...</div>;
  if (isError) return <div>Error loading Terms & Conditions.</div>;

  return (
    <div className="container mx-auto">
      <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
        <h2 className="my-6 text-2xl font-bold">Terms & Conditions</h2>

        <div
          className="prose max-w-none"
          dangerouslySetInnerHTML={{ __html: data?.data?.description }}
        ></div>
      </div>
    </div>
  );
};

export default GetTermsCondition;
