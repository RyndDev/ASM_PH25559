import React from 'react';
import { useGetProductByIdQuery } from "@/api/product";
import { useParams } from "react-router-dom";

type Props = {};

const DetailCard = (props: Props) => {
    const { id } = useParams<{ id: string }>();
    const { data: productData } = useGetProductByIdQuery(id || "");

    return (
        <div>
            <section className="text-gray-700 body-font overflow-hidden bg-white">
                <div className="container px-5 py-24 mx-auto">
                    <div className="lg:w-4/5 mx-auto flex flex-wrap">
                        <img
                            alt="ecommerce"
                            className="lg:w-1/2 w-full object-cover object-center rounded border border-gray-200"
                            src={productData?.image}
                        />
                        <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
                            <h2 className="text-sm title-font text-gray-500 tracking-widest">Chi tiết sản phẩm</h2>
                            <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">
                                {productData?.name}
                            </h1>
                            <p className="text-rose-600 text-xl title-font font-medium mb-1">
                               Giá sản phẩm: {productData?.price} VND
                            </p>
                            <div className="flex mb-4">
                                {/* Các icon và thông tin liên quan khác không được thay đổi */}
                            </div>
                            <p className="leading-relaxed">{productData?.desc}</p>
                            {/* Các phần còn lại không được thay đổi */}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default DetailCard;
