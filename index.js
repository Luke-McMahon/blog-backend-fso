const app = require("./app");
const http = require("http");
const { info } = require("./utils/logger");

const server = http.createServer(app);
server.listen(process.env.PORT, () => {
  info(`Server running on port ${process.env.PORT}`);
});
