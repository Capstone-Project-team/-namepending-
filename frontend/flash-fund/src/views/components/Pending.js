import React, { useEffect } from "react"
import { Container } from "react-bootstrap"
import ApprovalList from "./ApprovalList"

import cards from "../../fakeData"

//pending requests for admin to approve or deny
//does not work at this current time
const Pending = () => {
  useEffect(() => {}, [])
  return (
    <Container className="my-4">
      <ApprovalList cards={cards} pending={true} />
    </Container>
  )
}

export default Pending
