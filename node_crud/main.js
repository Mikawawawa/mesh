const Poster = require("./mqtt/poster");
const router = require("./handler");
const dataApi = require("./data/model");

Poster.client.on("message", (topic, message) => {
  router.handler(topic, message);
});

init();

async function init() {
  let tasks = await dataApi.get_unfinishes();
  tasks.forEach(element => {
    message = JSON.parse(element.next);
    message.token = element.id;
    Poster.client.publish(element.to, JSON.stringify(message));
  });
  //   console.log(tasks);
}
