const db = require("./connect");

async function fetch_gateway(user_id) {
  let data = db.batch(
    `SELECT * FROM gateway where gateway_id in (SELECT gateway_id from gateway_user WHERE user_id=?)`,
    [user_id]
  );
  if (data.status == 0) console.log("ERR", data.info);
  return data;
}

async function fetch_node(gateway_id) {
  let data = db.batch(
    `SELECT * FROM node where node_id in (SELECT node_id from gateway_node WHERE gateway_id=?)`,
    [gateway_id]
  );
  if (data.status == 0) console.log("ERR", data.info);
  return data;
}

async function add_task(to, next) {
  let data = await db.batch(
    "INSERT INTO task(`to`, `next`, `status`) VALUES(?, ?, '0')",
    [to, next]
  );
  if (data.status == 0) {
    console.log("ERR", data.info);
    return data;
  }
  data.info.token = (await db.execute(
    "select max(id) as token from task"
  )).info.token;
  return data;
}

async function finish_task(token) {
  db.execute("UPDATE task SET status = '1' WHERE `id` = ?", token);
}

async function add_node(mcu, node) {
  db.execute(
    "INSERT INTO `node`(`node_id`, `net_status`, `power_status`) VALUES (?, '1', '0')",
    [node]
  );
  db.execute(
    "INSERT INTO`gateway_node`(`gateway_id`, `node_id`) VALUES(?, ?)",
    [mcu, node]
  );
}

async function change_power(node, power_status) {
  db.execute("UPDATE node SET `power_status` = ? WHERE `node_id` = ?", [
    String(power_status),
    String(node)
  ]);
}

async function get_unfinishes() {
  let data = await db.batch("SELECT * FROM `task` WHERE STATUS='0'");
  return data.info;
}
// async;

module.exports = {
  fetch_gateway,
  fetch_node,
  add_task,
  finish_task,
  add_node,
  change_power,
  get_unfinishes
};
