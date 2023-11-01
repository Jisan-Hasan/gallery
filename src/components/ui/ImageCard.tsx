import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import Image from "next/image";

const ImageCard = ({ item, selectedImages, handleChecked }: any) => {
    const { attributes, listeners, setNodeRef, transform, transition } =
        useSortable({ id: item.id });
    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    };

    return (
        <>
            <div
                ref={setNodeRef}
                style={style}
                {...attributes}
                className=" rounded overflow-hidden shadow-lg relative group "
            >
                {/* image */}
                <div {...listeners}>
                    <Image
                        className={`w-full transition duration-150 ease-in-out ${
                            selectedImages?.includes(item.id)
                                ? "opacity-40"
                                : ""
                        }`}
                        src={item.src}
                        alt={item.alt}
                    />
                    {/* image overlay */}
                    <div className="absolute bottom-0 left-0 right-0 top-0 h-full w-full overflow-hidden bg-gray-400 bg-fixed opacity-0 transition duration-300 ease-in-out hover:opacity-50"></div>
                </div>

                {/* checkbox for image */}
                <div className="absolute top-2 right-8">
                    <input
                        type="checkbox"
                        className="w-6 h-6 bg-white rounded cursor-pointer opacity-0 group-hover:opacity-100 absolute"
                        onChange={(e) => handleChecked(e, item.id)}
                        checked={
                            selectedImages?.includes(item.id) ? true : false
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default ImageCard;
