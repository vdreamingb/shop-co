export default function CreateSalesForm(){
    return <form className="">
        <label htmlFor="productId" className="form-label">Product ID</label>
        <input type="number" className="form-input mb-5 mt-2" placeholder="5"/>
        <label htmlFor="saleDate" className="form-label">Sale's Start Date</label>
        <input type="date" name="saleDate" id="" className="form-input mb-5 mt-2"/>
        <label htmlFor="expiryDate" className="form-label">Sale's Expiry Date</label>
        <input type="date" name="expiryDate" id="" className="form-input mb-5 mt-2" />
        <button type="submit" className="submit-form">Create</button>
    </form>
}