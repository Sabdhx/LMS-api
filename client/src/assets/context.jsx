import React, { useEffect, useState } from 'react'
import axios from "axios"
function Context() {

  const [data, setData] = useState({
        userName: "",
        password: ""
      });


  useEffect(()=>{
    const fetchingData = async()=>{
        const response = await axios.get("http://localhost:5000/user", { withCredentials: true })
        console.log(response)
    }
    fetchingData()
  },[])
  

   
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("first");
      const fetchingData = await axios.post("http://localhost:5000/login", data);
      
      // Store the fetched data in local storage
      localStorage.setItem('userData', JSON.stringify(fetchingData.data));
  
      console.log(fetchingData.data);
    } catch (error) {
      console.log(error);
    }
  };
  const logout=async()=>{
    const response = await axios.get("http://localhost:3000/logout")
    localStorage.removeItem('userData')
    console.log(response)
  }
      

  return (
    <>
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-700">Sign In</h2>
        <form className="space-y-4" onSubmit={handleSubmit}>
         
          <div className="mb-4">
            <input
                          onChange={(e) => setData({ ...data, userName: e.target.value })}
            value={data.userName}
              type="text"
              name="email"
              placeholder="Email"
              className="mt-1 p-3 w-full border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={(e) => setData({ ...data, password: e.target.value })}
              placeholder="Password"
              className="mt-1 p-3 w-full border rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-3 rounded shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 transition duration-150 ease-in-out"
          >
            Submit
          </button>
        </form>
      </div>
      <div>{data.email}</div>
      <div>{data.password}</div>



    </div>

    <button onClick={logout}>logout</button>
    </>
  )
}

export default Context


// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// function Login() {
//   const navigate = useNavigate();
// 

//   const fetchData= async()=>{
//     const fetched =await axios.get("http://localhost:3000/register")
//     console.log(fetched.data.User)
//    }

//   useEffect(()=>{
//      fetchData();
//   },[])




//   
  
//   };
//   return (
//     <>
       
//     </>
//   );
// }

// export default Login;
