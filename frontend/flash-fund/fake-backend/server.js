const jsonServer = require("json-server")
const db = require("./db2.json")
const server = jsonServer.create()
const router = jsonServer.router("./db2.json")
const middlewares = jsonServer.defaults()
const port = 5000
const faker = require("faker")

server.use(jsonServer.bodyParser)
server.use(middlewares)

//route for a user loggin in
server.post("/api/login", (req, res) => {
  const body = req.body

  const result = db.users.find((user) => {
    return user.email === body.email && user.password === body.password
  })
  //if user info is found then send user info back
  //if not then return error
  if (result) {
    let { id, password, ...user } = result
    return res.status(200).jsonp(user)
  }
  return res.status(401).jsonp({
    error: "invalid email or password",
  })
})

//route for posting a new campaign posting
server.post("/api/campaign", (req, res) => {
  const body = req.body

  const router_db = router.db

  //add to 'db'
  insert(router_db, "campaings", body)

  return res.status(200)
})

//function used to insert data into specified 'table' or json property
//uses lowdb functions to accompish this
function insert(db, collection, data) {
  const table = db.get(collection)

  table.push(data).write()
}

//route to register a user
server.post("/api/user", (req, res) => {
  const body = req.body

  //no sure how to push using 'db' instance created globally
  //so use lowdb instance
  const router_db = router.db

  const user = db.users.find((user) => {
    return user.email === body.email
  })

  //dont register if already registered
  if (user) {
    return res.status(401).jsonp({ message: "already exists" })
  }

  //if email is a @kent.edu then assign student userType
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

  //add to db
  insert(router_db, "users", data)
  return res.status(200).jsonp({ message: "message" })
})

server.use(router)
//create server
server.listen(port, () => {
  console.log(`listening on port ${port}`)
})
