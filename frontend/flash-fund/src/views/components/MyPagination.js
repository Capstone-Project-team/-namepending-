import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"
import _ from "lodash"

const MyPagination = ({
  postsPerPage,
  totalPosts,
  pageChange,
  currentPage,
}) => {
  const ceil = Math.ceil(totalPosts / postsPerPage)
  let pages = _.range(1, ceil + 1)

  return (
    <>
      <Pagination className="justify-content-center">
        {pages.map((number) => {
          return (
            <Pagination.Item
              key={number}
              active={number === currentPage}
              onClick={() => pageChange(number)}
            >
              {number}
            </Pagination.Item>
          )
        })}
      </Pagination>
    </>
  )
}

export default MyPagination
