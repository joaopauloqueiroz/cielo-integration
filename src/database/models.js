const client = require("./connect.js");

module.exports = {
  async getOrder(order_id) {
    return new Promise((resolve, reject) => {
      client.query(
        `select * from public.orders inner join public.ordersStatus
      on public.orders.orderId = public.ordersStatus.orderId
      WHERE public.orders.orderId = ${order_id};`,
        (err, res) => {
          if (err) throw reject(err);
          resolve(res.rows[0]);
        }
      );
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
    console.log(query);
    return new Promise((resolve, reject) => {
      client.query(query, (err, res) => {
        if (err) throw reject(err);
        resolve(res.rows[0]);
      });
    });
  },
};
