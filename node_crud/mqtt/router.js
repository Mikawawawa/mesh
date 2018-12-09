class Router {
  constructor() {
    this.requestPath = {
      "*": function(message) {
        console.log(message);
      }
    };
    this.updatePath = {
      "*": function(message) {
        console.log(message);
      }
    };
    this.fetchPath = {
      "*": function(message) {
        console.log(message);
      }
    };
    this.linkPath = {
      "*": function(message) {
        console.log(message);
      }
    };
    this.willPath = {
      "*": function(message) {
        console.log(message);
      }
    };
  }
  request(path, callback) {
    this.requestPath[path] = callback;
  }
  update(path, callback) {
    this.updatePath[path] = callback;
  }
  fetch(path, callback) {
    this.fetchPath[path] = callback;
  }
  link(path, callback) {
    this.linkPath[path] = callback;
  }
  will(path, callback) {
    this.willPath[path] = callback;
  }
  handler(topic, message) {
    message = message.toString();
    let methods = topic.split("/")[0];
    let path = topic.split("/");
    path.shift();
    path = path.join("/");
    switch (methods) {
      case "request": {
        if (path in this.requestPath) {
          this.requestPath[path](message);
        } else {
          console.log("ERR", "Unknown request path", path);
        }
        break;
      }
      case "fetch": {
        if (path in this.fetchPath) {
          this.fetchPath[path](message);
        } else {
          console.log("ERR", "Unknown fetch path", path);
        }
        break;
      }

      case "update": {
        if (path in this.updatePath) {
          this.updatePath[path](message);
        } else {
          console.log("ERR", "Unknown update path", path);
        }
        break;
      }

      case "link": {
        if (path in this.linkPath) {
          this.putPath[path](message);
        } else {
          console.log("ERR", "Unknown link path", path);
        }
        break;
      }
      case "will": {
        if (path in this.willPath) {
          this.willPath[path](message);
        } else {
          console.log("ERR", "Unknown will path", path);
        }
        break;
      }

      default:
        console.log("ERR", "Unknow Method", methods);
    }
  }
}

module.exports = Router;
