import { salesService } from "@/services/sales.service";
import { IFormProps } from "@/shared/types/form.types";
import { ICreateSales } from "@/shared/types/sales.types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubmitHandler, useForm } from "react-hook-form";

export default function CreateSalesForm({setIsOpen}: IFormProps) {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<ICreateSales>();

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async (data: ICreateSales) => {
      await salesService.createSales(data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["sales"] });
    },
  });

  const onSubmit: SubmitHandler<ICreateSales> = async (data) => {
    mutate(data);
  };

  return (
    <form className="" onSubmit={handleSubmit(onSubmit)}>
      <label htmlFor="productId" className="form-label">
        Product ID
      </label>
      <input
        type="number"
        className="form-input mb-5 mt-2"
        placeholder="5"
        {...register("productId", { required: true })}
      />
      <label htmlFor="saleDate" className="form-label">
        Sale's Start Date
      </label>
      <input
        type="date"
        id=""
        className="form-input mb-5 mt-2"
        {...register("salesStartDate")}
      />
      <label htmlFor="expiryDate" className="form-label">
        Sale's Expiry Date
      </label>
      <input
        type="date"
        id=""
        className="form-input mb-5 mt-2"
        {...register("expiryDate", { required: true })}
      />
      <label htmlFor="salesPercent">Sales Percent</label>
      <input
        type="number"
        id=""
        step="0.01"
        className="form-input mb-5 mt-2"
        placeholder="13.2"
        {...register("salesPercent", { required: true })}
      />
      <button type="submit" className="submit-form">
        Create
      </button>
    </form>
  );
}
