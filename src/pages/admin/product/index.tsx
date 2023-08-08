import React, { useState } from 'react';
import { useGetProductsQuery, useRemoveProductMutation } from "@/api/product";
import { IProduct } from "@/interfaces/product";
import { Table, Button, Skeleton, Modal, Alert } from "antd";
import { Link } from "react-router-dom";
import { AiOutlinePlus } from "react-icons/ai";

const AdminProduct = () => {
    const { data: productData, error, isLoading } = useGetProductsQuery();
    const [removeProduct, { isLoading: isRemoveLoading, isSuccess: isRemoveSuccess }] =
        useRemoveProductMutation();

    const [isConfirmModalVisible, setIsConfirmModalVisible] = useState(false);
    const [selectedProductId, setSelectedProductId] = useState<number | null>(null);

    const showConfirmModal = (id: number) => {
        setSelectedProductId(id);
        setIsConfirmModalVisible(true);
    };

    const handleDelete = () => {
        if (selectedProductId) {
            removeProduct(selectedProductId);
            setIsConfirmModalVisible(false);
        }
    };

    const handleCancel = () => {
        setIsConfirmModalVisible(false);
    };

    const dataSource = productData?.map(({ id, name, price, image, desc }: IProduct) => ({
        key: id,
        name,
        price,
        image,
        desc
    }));

    const columns = [
        {
            title: "Tên sản phẩm",
            dataIndex: "name",
            key: "name",
        },
        {
            title: "Giá",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Ảnh",
            dataIndex: "image",
            key: "image",
            render: (image: string) => (
                <img src={image} alt="Ảnh sản phẩm" style={{ width: 100, height: 100 }} />
            ),
        },
        {
            title: "Mô tả",
            dataIndex: "desc",
            key: "desc",
        },
        {
            title: "",
            render: ({ key: id }: any) => {
                return (
                    <>
                        <div className="flex space-x-2">
                            {/* Sử dụng Button và Modal của Ant Design */}
                            <Button type="primary" danger onClick={() => showConfirmModal(id)}>
                                Xóa
                            </Button>

                            <Button type="primary" danger>
                                <Link to={`/admin/product/${id}/edit`}>Sửa</Link>
                            </Button>
                        </div>
                    </>
                );
            },
        },
    ];

    return (
        <div>
            <header className="mb-4 flex justify-between items-center">
                <h2 className="font-bold text-2xl">Quản lý sản phẩm</h2>
                <Button type="primary" className="bg-teal-500 ">
                    <Link to="/admin/product/add" className="flex items-center space-x-2">
                        Thêm sản phẩm
                    </Link>
                </Button>
            </header>
            {isRemoveSuccess && <Alert message="Xóa thành công " type="success" />}
            {isLoading ? <Skeleton /> : <Table dataSource={dataSource} columns={columns} />}

            {/* Modal xác nhận xóa */}
            <Modal
                title="Xác nhận xóa"
                visible={isConfirmModalVisible}
                onOk={handleDelete}
                onCancel={handleCancel}
                okText="Đồng ý"
                okButtonProps={{ style: { color: "black" } }}
                cancelText="Hủy"
            >
                <p>Bạn có chắc chắn muốn xóa sản phẩm này?</p>
            </Modal>
        </div>
    );
};

export default AdminProduct;
