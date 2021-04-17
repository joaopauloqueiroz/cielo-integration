const axios = require("axios");
module.exports = {
  async store(req, res) {
    try {
      return res.send("Gerar link de pagamento");
    } catch (error) {
      return res.status(500).send({ error: "Erro ao gerar link de pagamento" });
    }
  },

  async get(req, res) {
    const { token } = req.query;
    const buff = new Buffer(token, 'base64');
    try {
      return res.send("Gerar link de pagamento para" + buff.toString('ascii'));
    } catch (error) {
      return res.status(500).send({ error: "Erro ao gerar link de pagamento" });
    }
  },
};
