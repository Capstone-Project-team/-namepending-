const jsonServer = require("json-server")
const db = require("./db.json")
const server = jsonServer.create()
const router = jsonServer.router("./db.json")
const middlewares = jsonServer.defaults()
const port = 5000

server.use(jsonServer.bodyParser)
server.use(middlewares)

server.post("/api/login", (req, res) => {
  const body = req.body
  console.log("body", body)

  const result = db.users.find((user) => {
    return user.email === body.email && user.password === body.password
  })
  if (result) {
    let { id, password, ...user } = result
    return res.status(200).jsonp(user)
  } else {
    return res.status(400).jsonp({
      error: "invalid email or password",
    })
  }
})

server.use(router)
server.listen(port, () => {
  console.log(`port ${port}`)
})
