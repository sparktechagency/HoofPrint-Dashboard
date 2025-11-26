import React, { useState } from "react";
import { Button, Input, Table, Modal, message } from "antd";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  ExclamationCircleOutlined,
} from "@ant-design/icons";
import {
  useAddColorMutation,
  useGetAllColorsQuery,
  useUpdateColorMutation,
  useDeleteColorMutation,
} from "../../features/api/colorApi";

const Color = () => {
  const { data, isLoading } = useGetAllColorsQuery();

  const [addColor] = useAddColorMutation();
  const [updateColor] = useUpdateColorMutation();
  const [deleteColor] = useDeleteColorMutation();

  const [createModal, setCreateModal] = useState(false);
  const [name, setName] = useState("");
  const [editModal, setEditModal] = useState(false);
  const [editData, setEditData] = useState({ id: "", name: "" });
  const [deleteModal, setDeleteModal] = useState(false);
  const [deleteId, setDeleteId] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) {
      message.error("Color name is required");
      return;
    }

    try {
      await addColor({ name: name.trim() }).unwrap();
      message.success("Color created successfully");
      setName("");
      setCreateModal(false);
    } catch (error) {
      message.error(error?.data?.message || "Failed to create color");
    }
  };

  const handleUpdate = async () => {
    if (!editData.name.trim()) {
      message.error("Color name is required");
      return;
    }

    try {
      await updateColor({
        id: editData.id,
        data: { name: editData.name.trim() },
      }).unwrap();
      message.success("Color updated successfully");
      setEditModal(false);
    } catch (error) {
      message.error(error?.data?.message || "Failed to update color");
    }
  };

  const handleDelete = async () => {
    try {
      await deleteColor(deleteId).unwrap();
      message.success("Color deleted successfully");
      setDeleteModal(false);
      setDeleteId("");
    } catch (error) {
      message.error(error?.data?.message || "Failed to delete color");
    }
  };

  const columns = [
    {
      title: "Color Name",
      dataIndex: "name",
      key: "name",
      render: (text) => (
        <span className="font-medium text-gray-800">{text}</span>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      width: 200,
      render: (row) => (
        <div className="flex gap-2">
          <Button
            type="default"
            icon={<EditOutlined />}
            onClick={() => {
              setEditData({ id: row._id, name: row.name });
              setEditModal(true);
            }}
            className="hover:border-blue-500 hover:text-blue-500"
          >
            Edit
          </Button>

          <Button
            danger
            icon={<DeleteOutlined />}
            onClick={() => {
              setDeleteId(row._id);
              setDeleteModal(true);
            }}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 mt-20  to-gray-100 p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header Section */}
        <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Color Management
              </h1>
              <p className="text-gray-500">Manage your color catalog</p>
            </div>
            <Button
              type="primary"
              size="large"
              icon={<PlusOutlined />}
              onClick={() => setCreateModal(true)}
              className="bg-blue-600 hover:bg-blue-700 shadow-md"
            >
              Add New Color
            </Button>
          </div>
        </div>

        {/* Table Section */}
        <div className="bg-white rounded-xl shadow-sm overflow-hidden">
          <Table
            dataSource={data?.data}
            loading={isLoading}
            rowKey="_id"
            columns={columns}
            pagination={{
              pageSize: 10,
              showSizeChanger: false,
              position: ["bottomCenter"],
            }}
            className="custom-table"
          />
        </div>
      </div>

      {/* Create Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg font-semibold">
            <span>Create New Color</span>
          </div>
        }
        open={createModal}
        onCancel={() => {
          setCreateModal(false);
          setName("");
        }}
        onOk={handleCreate}
        okText="Create"
        cancelText="Cancel"
        okButtonProps={{ className: "bg-blue-600" }}
        width={500}
        centered
      >
        <div className="py-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Name
          </label>
          <Input
            placeholder="e.g., Sky Blue, Forest Green"
            value={name}
            onChange={(e) => setName(e.target.value)}
            size="large"
            onPressEnter={handleCreate}
          />
        </div>
      </Modal>

      {/* Edit Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg font-semibold">
            <EditOutlined className="text-blue-600" />
            <span>Edit Color</span>
          </div>
        }
        open={editModal}
        onCancel={() => setEditModal(false)}
        onOk={handleUpdate}
        okText="Update"
        cancelText="Cancel"
        okButtonProps={{ className: "bg-blue-600" }}
        width={500}
        centered
      >
        <div className="py-4">
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Color Name
          </label>
          <Input
            value={editData.name}
            onChange={(e) =>
              setEditData((p) => ({ ...p, name: e.target.value }))
            }
            size="large"
            onPressEnter={handleUpdate}
          />
        </div>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal
        title={
          <div className="flex items-center gap-2 text-lg font-semibold text-red-600">
            <ExclamationCircleOutlined />
            <span>Confirm Delete</span>
          </div>
        }
        open={deleteModal}
        onCancel={() => {
          setDeleteModal(false);
          setDeleteId("");
        }}
        onOk={handleDelete}
        okText="Delete"
        cancelText="Cancel"
        okButtonProps={{ danger: true }}
        width={500}
        centered
      >
        <div className="py-4">
          <p className="text-gray-700 text-base">
            Are you sure you want to delete this color? This action cannot be
            undone.
          </p>
        </div>
      </Modal>
    </div>
  );
};

export default Color;
