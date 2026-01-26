class UserService{
    async getUsers():Promise<any[]>{
        try {
            const response = await fetch("http://localhost:1110/api/users", {
                method: "GET",
                credentials: "include"
            });
            if(!response.ok){
                throw new Error("Failed to fetch users");
            }
            const data = await response.json();
            return data.users;
        } catch (error) {
            if(error instanceof Error){
                alert(error.message);
            }
            alert("Unknown error occured");
            return [];
        }
    }
}