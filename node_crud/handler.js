const Mrouter = require("./mqtt/router");
const Poster = require("./mqtt/poster");
const dataApi = require("./data/model");
const router = new Mrouter();

// 添加节点
router.request("add_node", async message => {
  message = JSON.parse(message);
  message.token = (await dataApi.add_task(
    "push/mobile/add_node",
    JSON.stringify({
      node: message.node,
      mcu: message.mcu
    })
  )).info.token;
  Poster.api.mobile.addNode(message);
  console.log("request", "AddNode", message);
});
router.update("add_node", message => {
  message = JSON.parse(message);
  dataApi.finish_task(message.token);
  dataApi.add_node(message.mcu, message.node);
  Poster.api.mcu.applyNode({
    node: message.node
  });
  console.log("Update", "AddNode", message);
});

// 修改开关
router.request("change_power", async message => {
  message = JSON.parse(message);
  message.token = await dataApi.add_task(
    "push/mcu/change_power",
    JSON.stringify({
      node: message.node,
      power_status: message.power_status
    })
  );
  Poster.api.mcu.changePower(message);
  console.log("REQUEST", "CHNAGE_POWER", message);
});
router.update("change_power", async message => {
  message = JSON.parse(message);
  dataApi.finish_task(message.token);
  dataApi.change_power(message.node, message.power_status);
  Poster.api.mobile.changePower({
    node: message.node,
    power_status: message.power_status
  });
  console.log("UPDATE", "CHNAGE_POWER", message);
});

// 获取信息请求
router.fetch("gateway", async message => {
  let data = await dataApi.fetch_gateway(message);
  Poster.api.mobile.gateway(data);
  console.log(data);
});
router.fetch("node", async message => {
  let data = await dataApi.fetch_node(message);
  Poster.api.mobile.node(data);
  console.log(data);
});

// 设备上线
router.link("gateway", message => {
  console.log(message);
});
router.link("node", message => {
  console.log(message);
});
router.link("mobile", message => {
  console.log(message);
});

//设备离线
router.will("gateway");
module.exports = router;

router.will("node", message => {
  console.log(message);
});

router.will("mobile", message => {
  console.log(message);
});

module.exports = router;
