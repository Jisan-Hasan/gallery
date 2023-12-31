"use client";

import ImageCard from "@/components/ui/ImageCard";
import {
    useGetImagesQuery,
    useSwapImageMutation,
} from "@/redux/api/galleryApi";
import { DndContext, closestCenter } from "@dnd-kit/core";
import { SortableContext, rectSwappingStrategy } from "@dnd-kit/sortable";
import { useState } from "react";
import toast from "react-hot-toast";
import { BsCardImage } from "react-icons/bs";

type Image = {
    id: number;
    src: string;
    alt: string;
    serial: number;
};

const GalleryPage = () => {
    // fetch data from api
    const { data: images } = useGetImagesQuery({});
    // console.log(images);

    const [swapImage] = useSwapImageMutation();
    const [selectedImages, setSelectedImages] = useState<number[]>([]);

    // handle image selection
    const handleChecked = (e: any, id: number) => {
        if (e.target.checked) {
            setSelectedImages([...selectedImages, id]);
        } else {
            setSelectedImages(selectedImages.filter((item) => item !== id));
        }
    };

    // handle all image selection
    const handleCheckedAll = (e: any) => {
        if (e.target.checked) {
            // setSelectedImages(images.map((image) => image.id));
        } else {
            setSelectedImages([]);
        }
    };

    // handle delete image functionality
    const handleDelete = () => {
        // check if any image is selected
        if (selectedImages.length === 0) {
            return toast.error("No Files Selected");
        }
        // show success message
        toast.success("Deleted Successfully");

        // delete selected images
        // setImages(images.filter((image) => !selectedImages.includes(image.id)));
        // reset selected images
        setSelectedImages([]);
    };

    // handle drag and drop
    const onDragEnd = (event: any) => {
        const { active, over } = event;
        if (active.id === over.id) {
            return;
        }

        const activeImage = images.find(
            (image: Image) => image.id === active.id
        );
        const overImage = images.find((image: Image) => image.id === over.id);

        swapImage({
            imageId1: activeImage.id,
            imageId2: overImage.id,
        });
        console.log(activeImage.serial, overImage.serial);
    };

    return (
        <div className="w-full mt-3">
            <div className="max-w-screen-xl mx-auto border rounded-lg shadow p-5">
                <div className="flex justify-between items-center my-4 ">
                    {selectedImages.length > 0 ? (
                        <>
                            <div className="flex gap-2 items-center">
                                <input
                                    type="checkbox"
                                    className="w-6 h-6 rounded cursor-pointer "
                                    checked={selectedImages.length > 0}
                                    onChange={(e) => handleCheckedAll(e)}
                                />
                                <p className="text-xl">
                                    {selectedImages.length} Files Selected
                                </p>
                            </div>
                            <div>
                                <button
                                    className="text-red-500"
                                    onClick={handleDelete}
                                >
                                    Delete Files
                                </button>
                            </div>
                        </>
                    ) : (
                        <>
                            <h1 className=" text-xl">Gallery</h1>
                        </>
                    )}
                </div>

                {/* Image Container */}
                <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-5  border-t-2 py-4">
                    {images && (
                        <DndContext
                            collisionDetection={closestCenter}
                            onDragEnd={onDragEnd}
                        >
                            <SortableContext
                                items={images}
                                strategy={rectSwappingStrategy}
                            >
                                {images &&
                                    images?.map((item: any, idx: number) => (
                                        <div
                                            key={item.id}
                                            className={`rounded-lg border-2 ${
                                                idx === 0
                                                    ? "col-span-2 row-span-2"
                                                    : ""
                                            }`}
                                        >
                                            <ImageCard
                                                item={item}
                                                selectedImages={selectedImages}
                                                handleChecked={handleChecked}
                                            />
                                        </div>
                                    ))}
                            </SortableContext>
                        </DndContext>
                    )}

                    {/* Add Image Section */}
                    <div
                        className="rounded-lg border-2 border-dashed flex flex-col justify-center items-center gap-4 cursor-pointer py-16"
                        onClick={() =>
                            toast.error("Developer is Sleeping 😴😴", {
                                icon: "😴😴",
                            })
                        }
                    >
                        <BsCardImage />
                        <p>Add Images</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default GalleryPage;
