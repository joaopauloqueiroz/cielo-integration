const client = require("./connect.js");
const moment = require("moment-timezone");

module.exports = {
  async getOrder(order_id) {
    const orderValidate = moment.tz("America/Sao_Paulo").format('YYYY-MM-DD');

    return new Promise((resolve, reject) => {
      const query = `select * from public.orders inner join public.ordersStatus
      on public.orders.orderId = public.ordersStatus.orderId
      WHERE public.orders.orderId = ${order_id} AND public.orders.dateEmission <= '${orderValidate}' AND public.orders.dateValidate >= '${orderValidate}';`;
      console.log(query);
      client.query(query, (err, res) => {
        if (err) throw reject(err);
        resolve(res.rows[0]);
      });
    });
  },
  saveOrder({
    orderId,
    sellerName,
    sellerEmail,
    dateEmission,
    dateValidate,
    price,
  }) {
    const query = `INSERT INTO public.orders(orderId, sellerName, sellerEmail, dateEmission, dateValidate, price)
    VALUES (${orderId}, '${sellerName}', '${sellerEmail}', '${dateEmission}', '${dateValidate}', ${price});`;
    return new Promise((resolve, reject) => {
      client.query(query, (err, res) => {
        if (err) throw reject(err);
        resolve(res.rows[0]);
      });
    });
  },
  getOneOrder(orderId) {
    const query = `SELECT * FROM public.orders WHERE orderId = ${orderId}`;
    return new Promise((resolve, reject) => {
      client.query(query, (err, res) => {
        if (err) throw reject(err);
        resolve(res.rows[0]);
      });
    });
  },
  updateOrder({
    orderId,
    sellerName,
    sellerEmail,
    dateEmission,
    dateValidate,
    price,
  }) {
    const query = `UPDATE public.orders SET  sellerName =' ${sellerName}', sellerEmail = '${sellerEmail}', dateEmission = '${dateEmission}', dateValidate = '${dateValidate}', price = ${price} where orderId = ${orderId};`;
    console.log(query);
    return new Promise((resolve, reject) => {
      client.query(query, (err, res) => {
        if (err) throw reject(err);
        resolve(true);
      });
    });
  },

  updateOrderStatus({ orderId, status }) {
    const query = `UPDATE public.ordersStatus SET status = '${status}' where orderId = ${orderId};`;
    return new Promise((resolve, reject) => {
      client.query(query, (err, res) => {
        if (err) throw reject(err);
        resolve(res.rows[0]);
      });
    });
  },
  saveOrderStatus({ orderId, status }) {
    const query = `ISERT INTO public.ordersStatus (orderId, status) VALUES (${orderId}, '${status}');`;
    return new Promise((resolve, reject) => {
      client.query(query, (err, res) => {
        if (err) throw reject(err);
        resolve(res.rows[0]);
      });
    });
  },
};
