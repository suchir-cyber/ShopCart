import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  useCreateProductMutation,
  useUploadProductImageMutation,
} from "../../redux/api/productApiSlice";
import { useFetchCategoriesQuery } from "../../redux/api/categoryApiSlice";
import { toast } from "react-toastify";


export const ProductList = () => {

    const [image, setImage] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [brand, setBrand] = useState("");
    const [stock, setStock] = useState(0);
    const [imageUrl, setImageUrl] = useState(null);
    const navigate = useNavigate();
  
    const [uploadProductImage] = useUploadProductImageMutation();
    const [createProduct] = useCreateProductMutation();
    const { data: categories } = useFetchCategoriesQuery();

    return (
        <div className="container xl:mx-[9rem] sm:mx-[0]">
            <div className="flex flex-col md:flex-row">
                
                <div className="md:w-3/4 p-3">
                    <div className="h-12">Create Product</div>

                    {imageUrl && (
                    <div className="text-center">
                    <img
                        src={imageUrl}
                        alt="product"
                        className="block mx-auto max-h-[200px]"
                    />
                    </div>
                    )}

                    <div className="mb-3">
                        <label className="border text-black px-4 block w-full text-center rounded-lg cursor-pointer font-bold py-11">
                        {image ? image.name : "Upload Image"}

                        <input
                            type="file"
                            name="image"
                            accept="image/*"
                            
                            className={!image ? "hidden" : "text-white"}
                        />
                        </label>
                    </div>
                    
                    <div className="p-3">
                        <div className="flex flex-wrap">
                            <div className="one">
                            <label htmlFor="name">Name</label> <br />
                            <input
                                type="text"
                                className="p-4 mb-3 w-[30rem] border rounded-lg bg-[#101011] text-white"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>    
    )
}
