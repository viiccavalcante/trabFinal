SECRET = "testmysupersecret";
SECRET_ADMIN = "testmysupersecretADMIN";
//sei que isso deveria estar protegido mas nao tava rolando 

const jwt = require('jsonwebtoken');
const db = require("../models");

const User = db.users;
const Op = db.Sequelize.Op;


exports.create = (req, res) => {
  if (!req.body.name || !req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Bad request!" 
    });
    return;
  }

  const users = {
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    is_admin: req.body.is_admin
  };

  User.create(users)
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

  User.findAll({ where: condition })
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
  const pIdUser = req.params.id;

  User.findByPk(pIdUser)
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message: "Opa, algum erro ocorreu durante a pesquisa do produto =" + pIdUser
      });
    });
};

exports.update = (req, res) => {
  const pIdUser = req.params.id;

  User.update(req.body, {
    where: { user_id: pIdUser }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Atualização realizada com sucesso."
        });
      } else {
        res.send({
          message: `Não foi possível atualizar o produto =${pIdUser}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: " Problemas na atualização do produto =" + pIdUser
      });
    });
};

exports.delete = (req, res) => {
  const pIdUser = req.params.id;

  User.destroy({
    where: { user_id: pIdUser }
  })
    .then(num => {
      if (num == 1) {
        res.send({
          message: "Usuário deletado"
        });
      } else {
        res.send({
          message: `Não foi possivel deletar o usuário =${pIdUser}.`
        });
      }
    })
    .catch(err => {
      res.status(500).send({
        message: "Problemas na deleção do usuário =" + pIdUser
      });
    });
};

exports.login = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Bad request!" 
    });
    return;
  }

  try {
    const pEmail = req.body.email;
    const pPassword= req.body.password;
    const user = await User.findOne({ 
      where: { email: pEmail } 
    });

      if (!user) {
        res.status(400).send({
          message: "Bad request!" 
        });
        return;
      }

      if(user.password != pPassword){
        res.status(400).send({
          message: "Bad request!"
        });
        return;
      }

      const payload = {
        user: { user_id: user.user_id, name: user.name },
      };
      const token = jwt.sign(payload, SECRET, {
        expiresIn: 5400 // expires in 1h30min
      });
      return res.json({ auth: true, token: token });
      
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Opa, algum erro ocorreu"
    });
  }
};

exports.admin = async (req, res) => {
  if (!req.body.email || !req.body.password) {
    res.status(400).send({
      message: "Bad request!" 
    });
    return;
  }

  try {
    const pEmail = req.body.email;
    const pPassword= req.body.password;
    const user = await User.findOne({ 
      where: { email: pEmail } 
    });

      if (!user) {
        res.status(400).send({
          message: "Bad request!" 
        });
        return;
      }

      if(user.password != pPassword){
        res.status(400).send({
          message: "Bad request!"
        });
        return;
      }

      if(user.is_admin == "false" || user.is_admin == null){
        res.status(400).send({
          message: "Usuário sem permissão de acesso"
        });
        return;
      }

      const payload = {
        user: { user_id: user.user_id, name: user.name },
      };
      const token = jwt.sign(payload, SECRET_ADMIN, {
        expiresIn: 5400 // expires in 1h30min
      });
      return res.json({ auth: true, token: token });
      
  } catch (error) {
    res.status(500).send({
      message:
      error.message || "Opa, algum erro ocorreu"
    });
  }
};

exports.verifyAdmin = (req, res, next) => {
  const token = req.headers['x-access-token'];
  if (!token) return res.status(401).json({ auth: false, message: 'No token provided.' });
  
  jwt.verify(token, SECRET_ADMIN, function(err, decoded) {
    if (err) return res.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
    
    // se tudo estiver ok, salva no request para uso posterior
    req.userId = decoded.id;
    next();
    //return "ok";
  });
};