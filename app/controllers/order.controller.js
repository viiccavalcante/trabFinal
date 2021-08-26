const db = require("../models");
const Order = db.orders;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.user_id) {
    res.status(400).send({
      message: "Bad request!" 
    });
    return;
  }

  const orders = {
    user_id: req.body.user_id,
  };

  Order.create(orders)
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
  const user_id = req.query.user_id;
  var condition = user_id ? { user_id: { [Op.like]: `%${user_id}%` } } : null;

  Order.findAll({ where: condition })
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
  const pOrderId = req.params.id;

  Order.findByPk(pOrderId)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Opa, algum erro ocorreu durante a pesquisa do pedido =" + pOrderId
      });
    });
};

exports.update = (req, res) => {
  const pOrderId = req.params.id;

  Order.update(req.body, {
    where: { order_id: pOrderId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Atualização realizada com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o pedido =${pOrderId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: " Problemas na atualização do pedido =" + pOrderId
      });
    });
};

exports.delete = (req, res) => {
  const pOrderId = req.params.id;

  Order.destroy({
    where: { order_id: pOrderId }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Produto deletado"
        });
      } else {
        res.send({
          message: `Não foi possivel deletar o pedido =${pOrderId}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Problemas na deleção do pedido =" + pOrderId
      });
    });
};
