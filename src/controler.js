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
    const { token } = req.params;
    try {
      return res.send("Gerar link de pagamento para" + atob(token));
    } catch (error) {
      return res.status(500).send({ error: "Erro ao gerar link de pagamento" });
    }
  },
};
