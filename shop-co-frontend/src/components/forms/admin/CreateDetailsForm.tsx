import { gender } from "@/shared/lists/gender.list";
import { sizes } from "@/shared/lists/size.list";
import { typeList } from "@/shared/lists/type.list";
import { ICreateDetails } from "@/shared/types/details.types";
import { SubmitHandler, useForm } from "react-hook-form";

export default function CreateDetailsForm() {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICreateDetails>();

  const onSubmit: SubmitHandler<ICreateDetails> = async (data) => {

  }

  return (
    <form>
      <label htmlFor="productId" className="form-label">
        Product ID
      </label>
      <input type="number" className="form-input mb-5 mt-2" placeholder="4" {...register("productId")} />
      <label htmlFor="size" className="form-label">
        Size
      </label>
      <select id="" className="block form-input pr-1.5 mb-5 mt-2" {...register("size")}>
        {sizes.map((size) => (
          <option key={size} value={size}>
            {size}
          </option>
        ))}
      </select>
      <label htmlFor="color" className="form-label">
        Color
      </label>
      <input
        type="text"
        className="form-input mb-5 mt-2"
        id=""
        placeholder="Red"
        {...register("color")}
      />
      <label htmlFor="gender" className="form-label">
        Gender
      </label>
      <select className="form-input mb-5 mt-2" id="" {...register("gender")}>
        {gender.map((gender) => (
          <option key={gender} value={gender}>
            {gender}
          </option>
        ))}
      </select>
      <label htmlFor="type" className="form-label">
        Type
      </label>
      <select id="" className="form-input mb-5 mt-2" {...register("type")}>
        {typeList.map((type) => (
          <option key={type} value={type}>
            {type}
          </option>
        ))}
      </select>
      <label htmlFor="style" className="form-label">Style</label>
      <select id="" className="form-input mb-5 mt-2">
        
      </select>
      <label htmlFor="stock" className="form-label">
        Stock
      </label>
      <input type="number" className="form-input mb-5 mt-2" placeholder="6" {...register("stock")} />
      <label htmlFor="pricePercent" className="form-label">
        Price Percent
      </label>
      <input
        type="number"
        className="form-input mb-5 mt-2"
        placeholder="10,5"
        {...register("pricePercent")}
      />
      <button type="submit" className="submit-form ">
        Create
      </button>
    </form>
  );
}
