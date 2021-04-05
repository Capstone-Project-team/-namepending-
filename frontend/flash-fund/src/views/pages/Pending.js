import React, { useEffect, useState } from "react"
import ApprovalList from "../components/ApprovalList"
import axios from "axios"
import cards from "../../fakeData"

const baseUrl = "/api/pending"
//pending requests for admin to approve or deny
const Pending = () => {
  const [pending, setPending] = useState([])
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    const getPending = async () => {
      try {
        //send request to register user
        setLoading(true)
        const response = await axios.get(baseUrl)
        setPending(response.data)
        setLoading(false)
        //setPosts(response.data)
      } catch (err) {
        console.log(err)
      }
    }
    getPending()
  }, [])

  const changePending = async (id, e) => {
    console.log(e.target.name)
    if (e.target.name === "delete") {
      const res = axios.delete(`/api/campaigns/${id}`)
      console.log(res.data)
    } else if (e.target.name === "put") {
      const res = axios.put(`/api/campaigns/${id}`)
      console.log(res.data)
    }
    setPending(pending.filter((card) => card.id !== id))
  }

  console.log(pending)
  return (
    <>
      <ApprovalList
        cards={pending}
        changePending={changePending}
        loading={loading}
      />
    </>
  )
}

export default Pending
