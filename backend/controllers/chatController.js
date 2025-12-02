const Chat = require('../models/chat');

exports.sendMessage = async (req, res) => {
  const chat = new Chat(req.body);
  await chat.save();
  res.json(chat);
};

exports.getMessages = async (req, res) => {
  const { groupId } = req.params;
  const messages = await Chat.find({ groupId });
  res.json(messages);
};
