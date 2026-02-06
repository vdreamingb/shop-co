import { gender } from "@/shared/lists/gender.list"
import { sizes } from "@/shared/lists/size.list"
import { typeList } from "@/shared/lists/type.list"

export default function CreateDetailsForm(){
 return <form>
    <label htmlFor="productId" className="form-label">Product ID</label>
    <input type="number" className="form-input mb-5 mt-2" placeholder="4" />
    <label htmlFor="size" className="form-label">Size</label>
    <select name="size" id="" className="block form-input pr-1.5 mb-5 mt-2">
        {sizes.map((size) => <option key={size} value={size}>{size}</option>)}
    </select>
    <label htmlFor="color" className="form-label">Color</label>
    <input type="text" name="color" className="form-input mb-5 mt-2" id="" placeholder="Red" />
    <label htmlFor="gender" className="form-label">Gender</label>
    <select name="" className="form-input mb-5 mt-2" id="">
        {gender.map((gender) => <option key={gender} value={gender}>{gender}</option>)}
    </select>
    <label htmlFor="type" className="form-label">Type</label>
    <select name="type" id="" className="form-input mb-5 mt-2">
        {typeList.map((type) => <option key={type} value={type}>{type}</option>)}
    </select>
    <label htmlFor="stock" className="form-label">
        Stock
    </label>
    <input type="number" className="form-input mb-5 mt-2" placeholder="6" />
    <label htmlFor="pricePercent" className="form-label">Price Percent</label>
    <input type="number" className="form-input mb-5 mt-2" placeholder="10,5"/>
    <button type="submit" className="submit-form ">Create</button>
 </form>   
}