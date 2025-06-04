/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_3755202537")

  // update collection data
  unmarshal({
    "name": "Auth"
  }, collection)

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_3755202537")

  // update collection data
  unmarshal({
    "name": "auth"
  }, collection)

  return app.save(collection)
})
