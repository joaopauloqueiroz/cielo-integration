const axios = require("axios");
const model = require("./database/models");
const { generateAuth, createLink } = require("./cielo");
const moment = require("moment-timezone");

function formatDate(date) {
  const year = date.substring(0, 4);
  const month = date.substring(4, 6);
  const day = date.substring(6, 8);
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
      const orderData = await model.getOneOrder(orderId);
      if (orderData) {
        console.log('atualizar')
        await model.updateOrder({
          orderId,
          sellerName,
          sellerEmail,
          dateEmission: formatDate(dateEmission),
          dateValidate: moment(formatDate(dateEmission)).add(10, 'days').format('YYYY-MM-DD'),
          price,
        });
        console.log('segunda parte')
        await model.updateOrderStatus({ orderId, status: 'open' });
      } else {
        await model.saveOrder({
          orderId,
          sellerName,
          sellerEmail,
          dateEmission: formatDate(dateEmission),
          dateValidate: moment(formatDate(dateEmission)).add(10, 'days').format('YYYY-MM-DD'),
          price,
        });
        await model.saveOrderStatus({ orderId, status: 'open' });
      }

      return res.send({
        orderId,
        sellerName,
        sellerEmail,
        dateEmission: formatDate(dateEmission),
        dateValidate: moment(formatDate(dateEmission)).add(10, 'days').format('YYYY-MM-DD'),
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

     if(orderData) {
      const result = await generateAuth();

      console.log(orderData)

      const objectOrder = { 
        type: "Digital",
        name: ` Orçaento numero: ${orderData.orderId}`,
        description: "Orçamento dos pedidos da loja pronto socorro do vidro",
        showDescription: true,
        price: orderData.price,
        expirationDate: orderData.dateValidate
      }
      const response = await createLink(objectOrder, result.access_token)
      return res.send(response);
     }
     return res.send("Orçamendo não e mais valido");

    } catch (error) {
      console.log(error)
      return res.status(500).send({ error: "Erro ao gerar link de pagamento" });
    }
  },
  async update(req, res) {
    return res.status.send({ status: true});
  },

  async notification(req, res) {
    return res.status.send({ status: true});

  }

};
