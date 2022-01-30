const { Server } = require("socket.io");
const io = new Server(server);

export default function handler(req, res) {
  res.status(200).json({ name: 'John Doe' })
}
