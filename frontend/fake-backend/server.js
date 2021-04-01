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

  const result = db.users.find((user) => {
    return user.email === body.email && user.password === body.password
  })
  if (result) {
    let { id, password, ...user } = result
    return res.status(200).jsonp(user)
  }
  return res.status(401).jsonp({
    error: "invalid email or password",
  })
})

server.post("/api/campaign", (req, res) => {
  const body = req.body

  const router_db = router.db

  insert(router_db, "campaings", body)

  return res.status(200)
})

function insert(db, collection, data) {
  const table = db.get(collection)

  table.push(data).write()
}

server.post("/api/user", (req, res) => {
  const body = req.body

  //no sure how to push using 'db' instance created globally
  const router_db = router.db

  const user = db.users.find((user) => {
    return user.email == body.email
  })

  if (user) {
    return res.status(401).jsonp({ message: "already exists" })
  }

  let userType = "donor"
  const kent = body.email.indexOf("@kent.edu")
  if (kent > -1) userType = "student"
  const data = {
    id: db.users.length,
    first_name: body.firstname,
    last_name: body.lastname,
    email: body.email,
    password: body.password,
    user_id: faker.datatype.uuid(),
    user_type: userType,
  }
  insert(router_db, "users", data)
  return res.status(200).jsonp({ message: "message" })
})

server.use(router)
server.listen(port, () => {
  console.log(`port ${port}`)
})
