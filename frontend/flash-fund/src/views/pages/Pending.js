import React, { useEffect } from "react"
import ApprovalList from "../components/ApprovalList"

import cards from "../../fakeData"

//pending requests for admin to approve or deny
const Pending = () => {
  useEffect(() => {}, [])
  return (
    <>
      <ApprovalList cards={cards} pending={true} />
    </>
  )
}

export default Pending
