const mqtt = require("mqtt");
const client = mqtt.connect("tcp://localhost:1883");

client.on("connect", function() {
  console.log("MQTT", "LINK", new Date().toLocaleString());
  client.subscribe("request/#");
  client.subscribe("update/#");
  client.subscribe("fetch/#");
  client.subscribe("link/#");
  client.subscribe("will/#");
});

const mobile = {
  addNode: function(message) {
    client.publish("push/mobile/add_node", JSON.stringify(message));
  },
  changePower: function(node, power_status) {
    client.publish(
      "push/mobile/change_power",
      JSON.stringify({
        node,
        power_status
      })
    );
  },
  gateway: function(data) {
    client.publish("push/mobile/gateway", JSON.stringify(data));
  },
  node: function(data) {
    client.publish("push/mobile/node", JSON.stringify(data));
  }
};

const mcu = {
  applyNode: function(node) {
    client.publish(
      "push/mcu/apply_node",
      JSON.stringify({
        node
      })
    );
  },
  changePower: function(message) {
    client.publish("push/mcu/change_power", JSON.stringify(message));
  }
};

module.exports = {
  client,
  api: {
    mcu,
    mobile
  }
};
