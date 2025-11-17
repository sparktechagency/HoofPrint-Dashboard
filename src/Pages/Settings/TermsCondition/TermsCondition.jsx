import { lazy, useEffect, useMemo, useRef, useState } from "react";
// import JoditEditor from "jodit-react";
const JoditEditor = lazy(() => import("jodit-react"));

import { ConfigProvider, message } from "antd";
import { useAddTermsConditionsMutation, useGetTermsConditionsQuery } from "../../../features/api/settingApi";

const TermsCondition = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [placeholder, setPlaceholder] = useState("Start typing...");
  const { data, error, isLoading } = useGetTermsConditionsQuery();
  const [addTermsConditions, { isLoading: isSaving, isError, error: saveError, isSuccess }] =
    useAddTermsConditionsMutation();

  // ✅ Create message instance
  const [messageApi, contextHolder] = message.useMessage();

  useEffect(() => {
    if (data?.data?.description) {
      setContent(data.data.description);
    }
  }, [data]);

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      height: 400,
    }),
    [placeholder]
  );

  const handleSave = async () => {
    if (!content) {
      messageApi.info("Please enter terms and conditions before saving.");
      return;
    }

    try {
      await addTermsConditions({ description: content }).unwrap();
    } catch (err) {
      const errorMessage = err?.message || "An unknown error occurred";
      messageApi.error(`Failed to save terms: ${errorMessage}`);
    }
  };

  useEffect(() => {
    if (isSuccess) {
      messageApi.success("Terms and conditions saved successfully!");
    }
  }, [isSuccess]);

  if (isLoading) return <div>Loading current terms...</div>;

  if (isError) {
    return (
      <div className="container mx-auto">
        <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
          <h2 className="my-6 text-2xl font-bold">Error</h2>
          <div>
            {saveError?.status === 401
              ? "Unauthorized access. Please login to continue."
              : `Error occurred: ${saveError?.message || "An error occurred"}`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <ConfigProvider>
      {/* ✅ Needed for message to render */}
      {contextHolder}

      <div className="container mx-auto">
        <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
          <h2 className="my-6 text-2xl font-bold">Terms Condition</h2>
          <div>
            <JoditEditor
              ref={editor}
              value={content}
              config={config}
              tabIndex={1}
              onBlur={(newContent) => setContent(newContent)}
            />
            <button
              className="w-full bg-[#101749] p-2 text-white mt-2 rounded-lg"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? "Saving..." : "Save"}
            </button>
            {isError && (
              <p className="mt-2 text-red-500">
                {saveError?.message || "An error occurred while saving the terms."}
              </p>
            )}
          </div>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default TermsCondition;
