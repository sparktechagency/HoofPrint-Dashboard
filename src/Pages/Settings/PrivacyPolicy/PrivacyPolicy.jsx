import { lazy, Suspense, useEffect, useMemo, useRef, useState } from "react";
// import JoditEditor from "jodit-react";
const JoditEditor = lazy(() => import("jodit-react"));

import { ConfigProvider, message } from "antd";
import {
  useAddPrivacyPolicyMutation,
  useGetPrivacyPolicyQuery,
} from "../../../features/api/settingApi";

const PrivacyPolicy = () => {
  const editor = useRef(null);
  const [content, setContent] = useState("");
  const [placeholder, setPlaceholder] = useState("Start typing...");

  // 🔹 RTK Query hooks
  const { data, isLoading, isError } = useGetPrivacyPolicyQuery();
  const [addPrivacyPolicy, { isLoading: isSaving, isSuccess, isError: saveError }] =
    useAddPrivacyPolicyMutation();

  // ✅ AntD message system
  const [messageApi, contextHolder] = message.useMessage();

  // 🔹 Prefill content when fetching existing policy
  useEffect(() => {
    if (data?.data?.description) {
      setContent(data.data.description);
    }
  }, [data]);

  // 🔹 Save handler
  const handleSave = async () => {
    if (!content) {
      messageApi.info("Please enter privacy policy before saving.");
      return;
    }

    try {
      await addPrivacyPolicy({ description: content }).unwrap();
      messageApi.success("Privacy policy saved successfully!");
    } catch (err) {
      const errorMessage = err?.message || "An unknown error occurred";
      messageApi.error(`Failed to save privacy policy: ${errorMessage}`);
    }
  };

  const config = useMemo(
    () => ({
      readonly: false,
      placeholder: placeholder,
      height: 400,
    }),
    [placeholder]
  );

  if (isLoading) return <div>Loading current privacy policy...</div>;
  if (isError) return <div>Error loading privacy policy.</div>;

  return (
  <Suspense fallback={<div>loading...</div>}>
      <ConfigProvider>
      {contextHolder}
      <div className="container mx-auto">
        <div className="p-6 mt-5 bg-white rounded-lg md:p-10">
          <h2 className="my-6 text-2xl font-bold">Privacy Policy</h2>
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
          </div>
        </div>
      </div>
    </ConfigProvider>
  </Suspense>
  );
};

export default PrivacyPolicy;
