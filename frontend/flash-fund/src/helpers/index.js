//puts a comma in the amound of money entered, for example 2,000 | 20,000 | etc
//makes sure state is only updated on number input. No alphabetic input
const handleAmountChange = (e) => {
  console.log("handle")
  //regular expression for only number inputs
  const re = /^[0-9\b]+$/
  //if input value has a comma, remove the comma
  //this is so regular expression testing can be done
  let value = e.target.value.replace(/,/g, "")

  //if number value
  console.log("value", value)
  if (value === "" || re.test(value)) {
    //set new state value to number with comma if applicable
    return value.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
    //setFieldValue(name, value.replace(/\B(?=(\d{3})+(?!\d))/g, ","))
  }
  return undefined
}

export default handleAmountChange
