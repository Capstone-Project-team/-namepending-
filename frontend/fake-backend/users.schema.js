const { resolve, extend } = require("json-schema-faker")
const fs = require("fs")
extend("faker", () => require("faker"))

const schema = {
  type: "object",
  required: ["users"],
  properties: {
    users: {
      type: "array",
      minItems: 20,
      items: { $ref: "#/definitions/users" },
    },
  },
  definitions: {
    users: {
      type: "object",
      required: [
        "id",
        "user_id",
        "first_name",
        "last_name",
        "email",
        "password",
        "user_type",
      ],
      properties: {
        id: {
          $ref: "#/definitions/positiveInt",
        },
        user_id: {
          type: "string",
          format: "uuid",
        },
        first_name: {
          type: "string",
          faker: "name.firstName",
        },
        last_name: {
          type: "string",
          faker: "name.lastName",
        },
        email: {
          type: "string",
          faker: "internet.email",
          faker: {
            "internet.email": ["#{first_name}", "#{last_name}", "kent.edu"],
          },
        },
        password: {
          type: "string",
          minLength: 6,
          faker: "name.firstName",
        },
        user_type: {
          type: "string",
          enum: ["student"],
        },
      },
    },
    positiveInt: {
      type: "integer",
      minimum: 0,
      exclusiveMinimum: true,
    },
  },
}

resolve(schema).then((sample) => {
  console.log("writing to json file")
  fs.writeFileSync(`${__dirname}/db2.json`, JSON.stringify(sample), (err) => {
    if (err) {
      console.log(err)
    } else {
      console.log("done")
    }
  })
})
