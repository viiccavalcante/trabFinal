const db = require("../models");
const OrderItem = db.order_items;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.order_id || !req.body.product_id) {
    res.status(400).send({
      message: "Bad request!" 
    });
    return;
  }

  const orderItem = {
    order_id: req.body.order_id,
    product_id: req.body.product_id
  };

  OrderItem.create(orderItem)
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
  const order_id = req.query.order_id;
  var condition = order_id ? { order_id: { [Op.like]: `%${order_id}%` } } : null;

  OrderItem.findAll({ where: condition })
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
  const pOrderItemId = req.params.id;

  OrderItem.findByPk(pOrderItemId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Opa, algum erro ocorreu durante a pesquisa " 
      });
    });
};

exports.update = (req, res) => {
  const pOrderItemId = req.params.id;

  OrderItem.update(req.body, {
    where: { order_item_id: pOrderItemId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Atualização realizada com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar `
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: " Problemas na atualização"
      });
    });
};

exports.delete = (req, res) => {
  const pOrderItemId = req.params.id;

  OrderItem.destroy({
    where: { order_item_id: pOrderItemId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produto deletado"
        });
      } else {
        res.send({
          message: `Não foi possivel deletar.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Problemas na deleção"
      });
    });
};
