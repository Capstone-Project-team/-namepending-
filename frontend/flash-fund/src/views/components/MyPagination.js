import React, { useEffect, useState } from "react"
import { Pagination } from "react-bootstrap"
import _ from "lodash"

const MyPagination = ({ cards, pageChange }) => {
  const updatePage = (page) => {
    //current page highlighed by pagination
    const currentPage = page
    //how many elements need to be displayed
    const totalCards = cards.length
    //cards per page
    const pageSize = 3
    //how many pages are needed to display all cards
    const totalPages = Math.ceil(cards.length / pageSize)

    //start index in array of data to display
    const indexOfLast = currentPage * pageSize
    //end index in array of data to display
    const indexOfFirst = indexOfLast - pageSize
    //get data to display on page based on indicies above
    const current = cards.slice(indexOfFirst, indexOfLast)

    //use lodash to get array of number 1 to pages needed
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

    //set state of pagination component
    setPages(newState)

    //function that was passed in from parent
    //updates state in CampaignList component
    //pass it data range of cards to render
    pageChange(current)
  }
  const [pages, setPages] = useState({})

  //!use effect isn't working as 'Component Will Mount' for some reason
  useEffect(() => {
    console.log("effect")
    updatePage(1)
  }, [])

  //render pagination
  //!need to conditionally render pagination items because I can get useEffect to work as I want
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
