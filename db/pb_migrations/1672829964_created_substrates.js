migrate((db) => {
  const collection = new Collection({
    "id": "i89i86i1mik1c9e",
    "created": "2023-01-04 10:59:24.706Z",
    "updated": "2023-01-04 10:59:24.706Z",
    "name": "substrates",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "yqxqjo1u",
        "name": "name",
        "type": "text",
        "required": false,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      }
    ],
    "listRule": null,
    "viewRule": null,
    "createRule": null,
    "updateRule": null,
    "deleteRule": null,
    "options": {}
  });

  return Dao(db).saveCollection(collection);
}, (db) => {
  const dao = new Dao(db);
  const collection = dao.findCollectionByNameOrId("i89i86i1mik1c9e");

  return dao.deleteCollection(collection);
})
