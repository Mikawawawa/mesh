var mqtt = require("mqtt");
var client = mqtt.connect("tcp://127.0.0.1:1883");

client.on("connect", function() {
  // setInterval(() => {
  // client.publish("request/add_node", "Hello mqtt");
  // client.publish("update/add_node", "Hello mqtt");
  // client.publish("request/change_power", "Hello mqtt");
  // client.publish("update/change_power", "Hello mqtt");
  // client.publish("fetch/gateway", "001");
  // client.publish("fetch/node", "001");
  // client.publish(
  //   "request/add_node",
  //   JSON.stringify({
  //     node: "002",
  //     mcu: "001"
  //   })
  // );
  // client.publish(
  //   "update/add_node",
  //   JSON.stringify({
  //     node: "003",
  //     mcu: "001",
  //     token: 6
  //   })
  // );
  // client.publish(
  //   "update/change_power",
  //   JSON.stringify({
  //     node: "002",
  //     power_status: 1,
  //     token: 5
  //   })
  // );
  // }, 1000);
  // client.
});
