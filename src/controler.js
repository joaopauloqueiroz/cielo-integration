const axios = require("axios");
const model = require("./database/models");
const { generateLink } = require("./cielo");

function formatDate(date) {
  const year = date.substring(0, 4);
  const day = date.substring(4, 6);
  const month = date.substring(6, 8);
  return `${year}-${month}-${day}`;
}
module.exports = {
  async store(req, res) {
    const {
      orderId,
      sellerName,
      sellerEmail,
      dateEmission,
      dateValidate,
      price,
    } = req.body;
    try {
      await model.saveOrder({
        orderId,
        sellerName,
        sellerEmail,
        dateEmission: formatDate(dateEmission),
        dateValidate: formatDate(dateValidate),
        price,
      });
      return res.send({
        orderId,
        sellerName,
        sellerEmail,
        dateEmission: formatDate(dateEmission),
        dateValidate: formatDate(dateValidate),
        price,
      });
    } catch (error) {
      return res.status(500).send({ error: "Erro ao gerar link de pagamento" });
    }
  },

  async get(req, res) {
    const { token } = req.query;
    const buff = new Buffer.from(token, "base64");
    try {
      const orderData = await model.getOrder(buff.toString("ascii"));

      // const result = await generateLink();

      return res.send(orderData );
    } catch (error) {
      return res.status(500).send({ error: "Erro ao gerar link de pagamento" });
    }
  },
};
