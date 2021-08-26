const db = require("../models");
const Product = db.products;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.name || !req.body.price) {
    res.status(400).send({
      message: "Bad request!" 
    });
    return;
  }

  const product = {
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    image: req.body.image,
  };

  Product.create(product)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Opa, algum erro ocorreu"
      });
    });
};

exports.findAll = (req, res) => {
  const name = req.query.name;
  var condition = name ? { name: { [Op.like]: `%${name}%` } } : null;

  Product.findAll({ where: condition })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Opa, algum erro ocorreu"
      });
    });
};

exports.findOne = (req, res) => {
  const pProductId = req.params.id;

  Product.findByPk(pProductId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Opa, algum erro ocorreu durante a pesquisa do produto =" + pProductId
      });
    });
};

exports.update = (req, res) => {
  const pProductId = req.params.id;

  Product.update(req.body, {
    where: { product_id: pProductId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Atualização realizada com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o produto =${pProductId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: " Problemas na atualização do produto =" + pProductId
      });
    });
};

exports.delete = (req, res) => {
  const pProductId = req.params.id;

  Product.destroy({
    where: { product_id: pProductId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produto deletado"
        });
      } else {
        res.send({
          message: `Não foi possivel deletar o produto =${pProductId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Problemas na deleção do produto =" + pProductId
      });
    });
};
