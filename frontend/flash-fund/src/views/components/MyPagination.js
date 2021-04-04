import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"
import _ from "lodash"

const MyPagination = ({ cards, pageChange }) => {
  //cards = _.range(1, 10)

  const updatePage = (page) => {
    const currentPage = page
    const totalCards = cards.length
    const pageSize = 12
    const totalPages = Math.ceil(cards.length / pageSize)

    const indexOfLast = currentPage * pageSize
    const indexOfFirst = indexOfLast - pageSize
    const current = cards.slice(indexOfFirst, indexOfLast)

    const pageNumbers = _.range(1, totalPages + 1)

    const newState = {
      totalCards: totalCards,
      currentPage: currentPage,
      pageSize: pageSize,
      totalPages: totalPages,
      indexOfLast: indexOfLast,
      indexOfFirst: indexOfFirst,
      pageNumbers: pageNumbers,
    }

    console.log("newstate", newState)
    setPages(newState)
    pageChange(current)
  }
  const [pages, setPages] = useState({})
  useEffect(() => {
    console.log("effect")
    updatePage(1)
  }, [])

  return (
    <>
      <Pagination className="justify-content-center">
        {pages.pageNumbers &&
          pages.pageNumbers.map((number) => {
            return (
              <Pagination.Item
                key={number}
                active={number === pages.currentPage}
                onClick={() => updatePage(number)}
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
