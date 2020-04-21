const { MessageService, ChatService } = require('../services');
const controller = require('./controller');

exports.viewAllChatMessages = controller(async (req, res) => {
  const chatId = req.chat._id;
  const messages = await MessageService.getAll(chatId);
  return res.send(messages);
});

exports.postNewMessage = controller(async (req, res) => {
  const chat = req.chat;
  const authorId = req.user._id;
  const content = req.body.content;
  const message = await ChatService.postMessage(chat, {
    authorId,
    content,
  });
  return res.send(message.toObject());
});
