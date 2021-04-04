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

  /*const result = db.users.find((user) => {
    return user.email === body.email && user.password === body.password
  })*/

  const r = router.db
    .get("users")
    .find({
      email: body.email,
      password: body.password,
    })
    .value()
  console.log("r", r)
  //if user info is found then send user info back
  //if not then return error
  //console.log("result", result)
  if (r !== undefined) {
    let { id, password, ...user } = r
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

  const data = {
    id: router_db.get("campaigns").size().value(),
    date_start: new Date(),
    date_end: body.date_End,
    author_id: faker.datatype.uuid(),
    approval_bool: true,
    funding_goal: body.funding_Goal,
    funding_raised: 0,
    title: body.name,
    description: body.fundraiser_description,
    photo: faker.image.image(),
  }

  //add to 'db'
  insert(router_db, "campaigns", data)

  return res.status(200).jsonp({ message: "message" })
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

  const r = router.db
    .get("users")
    .find({
      email: body.email,
      password: body.password,
    })
    .value()

  //dont register if already registered
  if (r !== undefined) {
    return res.status(401).jsonp({ message: "already exists" })
  }

  //if email is a @kent.edu then assign student userType
  let userType = "donor"
  const kent = body.email.indexOf("@kent.edu")
  if (kent > -1) userType = "student"
  if (body.email.indexOf("@admin.com")) userType = "admin"

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
  insert(router.db, "users", data)
  return res.status(200).jsonp({ message: "message" })
})

server.get("/api/top", (req, res) => {
  const data = router.db
    .get("campaigns")
    .filter({ approval_bool: true })
    .sortBy("funding_raised")
    .take(6)
    .value()
  console.log(data)
  if (data || data !== undefined) {
    return res.json(data)
  }
  return res.status(400).jsonp({ error: "couldn't fetch" })
  //console.log(data)
})
server.get("/api/campaigns", (req, res) => {
  const data = router.db
    .get("campaigns")
    .filter({ approval_bool: true })
    .value()

  if (data || data !== undefined) {
    return res.json(data)
  }

  return res.status(400).jsonp({ error: "couldn't fetch" })
})

server.get("/api/pending", (req, res) => {
  const data = router.db
    .get("campaigns")
    .filter({ approval_bool: false })
    .value()

  if (data || data !== undefined) {
    return res.json(data)
  }
  return res.status(400).jsonp({ message: "couldn't fetch" })
})

server.delete("/api/campaigns/:id", (req, res) => {
  const id = parseInt(req.params.id)
  const router_db = router.db
  console.log("id", id)
  router_db.get("campaigns").remove({ id: id }).write()

  return res.status(200).jsonp({ message: "deleted" })
})

server.use(router)
//create server
server.listen(port, () => {
  console.log(`listening on port ${port}`)
})
