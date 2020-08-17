// Author = Nagarjuna Yadav K.
var express = require('express');
var router = express.Router();
const path = require("path");
const fs = require("fs");
const filename = path.join(__dirname, '../data', 'data.json');


let getIndexAndData = function (id) {
  let data = fs.readFileSync(filename, 'utf-8');
  data = JSON.parse(data);
  const index = data.findIndex(c => c.id === id);
  return { data, index };
}

let getProductDetails = function (id) {
  var { data, index } = getIndexAndData(id);
  // console.log('index --- ', index);
  if (index === -1) {
    return false;
  }
  else {
    return data[index];
  }
}


router.get("/naga", (req, res) => {
  res.status(200).send("Welcome to our restful API");
});

// get all products
router.get('', (req, res, next) => {
  let data = fs.readFileSync(filename, 'utf-8');
  data = JSON.parse(data);
  res.json(data);
});

//=== Create a Product
router.post('/create', (req, resp) => {
  // console.log(req.body);
  fs.readFile(filename, 'utf-8', (err, data) => {
    if (err) {
      data = '[]';
    }
    data = JSON.parse(data);
    let maxId = data.reduce((acc, cust) => acc > cust.id ? acc : cust.id, 0);
    req.body['id'] = maxId + 1;
    data.push({ ...req.body })// === push same ojbect to json file with out modify
    fs.writeFile(filename, JSON.stringify(data), 'utf-8', (err, doc) => {
      if (err) throw err;
      let { id, name } = req.body;
      resp.json({ id, name });
    });
  });
});

//===== get product id Details
router.get('/:id', (req, res, next) => {
  let product = getProductDetails(parseInt(req.params.id))
  if (product) {
    res.json(product);
  } else {
    res.json("Product not at created.")
  }
});

//=== update a Product id Details
router.put('/:id', (req, res, next) => {
  // let product = getProductDetails(parseInt(req.params.id))
  var { data, index } = getIndexAndData(parseInt(req.params.id));
  data.splice(index, 1)
  req.body['id'] = parseInt(req.params.id);
  data.push({ ...req.body })
  // data = req.body
  fs.writeFile(filename, JSON.stringify(data), 'utf-8', (err, doc) => {
    if (err) throw err;
    let { id, name } = req.body;
    res.json({ id, name });
  });
});

//=== Delete a Product id
router.delete('/:id', (req, res, next) => {
  var { data, index } = getIndexAndData(parseInt(req.params.id));
  data.splice(index, 1)
  fs.writeFile(filename, JSON.stringify(data), 'utf-8', (err, doc) => {
    if (err) throw err;
    res.json("Scucess fully Deleted .");
  });

});

module.exports = router;


