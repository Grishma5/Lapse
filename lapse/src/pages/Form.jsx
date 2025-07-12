import { useState } from "react";
import toast from "react-hot-toast";
const FormData = () => {
const [formData, setFormData] = useState({
email: '',
name: '',
});
const handleChange=(e)=>{
const {name, value}=e.target;
setFormData(prev=>({
...prev,
[name]:value
}))
}

const submit=()=>{
if (formData.name === ""|| formData.email=== "" || formData.password === "") {
    return toast.error("please enter all fields")
}
    toast.success(`thank you for registration ${formData.name}`)
}

return (
<div className="min-h-screen flex flex-col flex-wrap items-center justify-center bg-gray-100 p-6">
<div className="bg-white p-6 rounded-2xl shadow-md w-full max-w-md space-y-4" >
<h2 className="text-xl font-semibold text-gray-700">User Info</h2>
<input
name="name"
value={formData.name}
onChange={handleChange}
placeholder="Name"
className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
/>
<input
name="email"
value={formData.email}
onChange={handleChange}
placeholder="Email"
className="w-full p-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
/>
<button type= "submit" name="submit" onClick={submit} id =""s>Submit</button>
</div>

<div className="mt-6 bg-white p-6 rounded-2xl shadow-md w-full max-w-md">
<h3 className="text-lg font-medium text-gray-800 mb-2">Live Preview:</h3>
<p><span className="font-semibold text-gray-600">Name:</span> {formData.name}</p>
<p><span className="font-semibold text-gray-600">Email:</span> {formData.email}</p>
</div>
</div>
);
};

export default FormData;