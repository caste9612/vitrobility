migrate((db) => {
  const collection = new Collection({
    "id": "d88y65558ahg336",
    "created": "2023-01-04 11:02:59.474Z",
    "updated": "2023-01-04 11:02:59.474Z",
    "name": "cookedjars",
    "type": "base",
    "system": false,
    "schema": [
      {
        "system": false,
        "id": "qvjqboiy",
        "name": "barcode",
        "type": "text",
        "required": false,
        "unique": true,
        "options": {
          "min": null,
          "max": null,
          "pattern": ""
        }
      },
      {
        "system": false,
        "id": "ibu4bqv9",
        "name": "substrate",
        "type": "relation",
        "required": false,
        "unique": false,
        "options": {
          "maxSelect": 1,
          "collectionId": "i89i86i1mik1c9e",
          "cascadeDelete": false
        }
      },
      {
        "system": false,
        "id": "b3yjoh0i",
        "name": "preparationDate",
        "type": "date",
        "required": false,
        "unique": false,
        "options": {
          "min": "",
          "max": ""
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
  const collection = dao.findCollectionByNameOrId("d88y65558ahg336");

  return dao.deleteCollection(collection);
})
