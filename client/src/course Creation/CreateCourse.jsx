import React, { useEffect } from 'react'

function CreateCourse() {
  useEffect(()=>{
    const fetchingData =async ()=>{
      const response = await axios.get("http://localhost:5000/")
    }
  })
  return (
    <div></div>
  )
}

export default CreateCourse