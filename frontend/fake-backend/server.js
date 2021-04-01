const jsonServer = require("json-server")
const db = require("./db2.json")
const server = jsonServer.create()
const router = jsonServer.router("./db2.json")
const middlewares = jsonServer.defaults()
const port = 5000
const faker = require("faker")

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.post("/api/login", (req, res) => {
  const body = req.body
  console.log("body", body)

  const result = db.users.find((user) => {
    console.log(user)
    console.log(body.email, body.password)
    return user.email === body.email && user.password === body.password
  })
  console.log("result", result)
  if (result) {
    let { id, password, ...user } = result
    return res.status(200).jsonp(user)
  } else {
    return res.status(401).jsonp({
      error: "invalid email or password",
    })
  }
})

server.post("/api/campaign", (req, res) => {
  const body = req.body
  console.log(body)

  const db = router.db

  const table = db.get("campaigns")

  tables.push(body).write()

  return res.status(200)
})

function insert(db, collection, data) {
  const table = db.get(collection)

  /*const user = table.find((user) => {
    console.log(user)
    return user.email == data.email
  })

  console.log(user)

  if (user) {
    return false
  }*/
  let userType = "donor"
  const kent = data.email.indexOf("@kent.edu")
  if (kent > -1) userType = "student"
  table
    .push({
      id: table._length,
      first_name: data.firstname,
      last_name: data.lastname,
      email: data.email,
      password: data.password,
      user_id: faker.datatype.uuid(),
      user_type: userType,
    })
    .write()
  //return true
}

server.post("/api/user", (req, res) => {
  const body = req.body
  const head = req.header

  console.log("body", body)
  console.log("head", head)

  //const db = router.db

  const user = db.users.find((user) => {
    return user.email == body.email
  })

  if (user) {
    return res.status(401).jsonp({ message: "already exists" })
  } else {
    insert(router.db, "users", body)
    return res.status(200).jsonp({ message: "message" })
  }

  /*const inserted = insert(db, "users", body)

  if (inserted) {
    return res.status(200).jsonp({ message: "user create" })
  } else {
    return res.status(402).jsonp({ message: "user already exists" })
  }*/
})

server.use(router)
server.listen(port, () => {
  console.log(`port ${port}`)
})
