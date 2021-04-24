const { Client } = require('pg');

const client = new Client({
    user: 'pppubxdxnfjwgr',
    host: 'ec2-18-215-111-67.compute-1.amazonaws.com',
    database: 'dk2mcvqaedhno',
    password: '43565f447cf297237def311cd972b5c14b00f7b68cfd7978848f4ef2db7c5fde',
    port: 5432,
    ssl: { rejectUnauthorized: false }
})
client.connect();

module.exports = client