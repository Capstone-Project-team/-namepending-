const { resolve, extend } = require("json-schema-faker")
const fs = require("fs")
extend("faker", () => require("faker"))

//create a json schema that fakes a db table for the 'campaigns'
const schema = {
  type: "object",
  required: ["campaigns"],
  properties: {
    users: {
      type: "array",
      minItems: 20,
      items: { $ref: "#/definitions/campaigns" },
    },
  },
  definitions: {
    campaigns: {
      type: "object",
      required: [
        "id",
        "date_start",
        "date_end",
        "author_id",
        "approval_bool",
        "funding_goal",
        "funding_raised",
        "title",
        "description",
        "photo",
      ],
      properties: {
        id: {
          $ref: "#/definitions/positiveInt",
        },
        date_start: {
          type: "string",
          faker: "date.recent",
        },
        date_end: {
          type: "string",
          faker: "date.soon",
        },
        author_id: {
          type: "string",
          format: "uuid",
        },
        approval_bool: {
          type: "boolean",
        },
        funding_goal: {
          type: "integer",
          minimum: 0,
          maximum: 5000,
        },
        funding_raised: {
          type: "integer",
          minimum: 0,
          maximum: 2500,
        },
        title: {
          type: "string",
          faker: "lorem.words",
        },
        description: {
          type: "string",
          faker: "lorem.sentences",
        },
        photo: {
          type: "string",
          faker: "image.image",
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

//create the schema and write it to the json file specified
resolve(schema).then((sample) => {
  console.log("writing to json file")
  fs.writeFileSync(
    `${__dirname}/db_campaign.json`,
    JSON.stringify(sample),
    (err) => {
      if (err) {
        console.log(err)
      } else {
        console.log("done")
      }
    }
  )
})
