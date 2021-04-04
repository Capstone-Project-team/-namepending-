import React, { useEffect } from "react"
import ApprovalList from "../components/ApprovalList"

import cards from "../../fakeData"

//pending requests for admin to approve or deny
//does not work at this current time
const Pending = () => {
  useEffect(() => {}, [])
  return (
    <>
      <ApprovalList cards={cards} pending={true} />
    </>
  )
}

export default Pending
