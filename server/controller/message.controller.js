const Conversation = require("../models/conversation.model");
const Message = require("../models/message.model");
const { getReceiverSocketId, io } = require("../socket.js/socket");
const uploadOnCloudinary = require("./cloudinary");

const sendMessage = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;
    const { message } = req.body;

      // Check if receiver is undefined
    if (!receiver) {
      return res.status(400).json({ message: "Receiver ID missing" });
    }

    let image;
    if (req.file) {
      const uploaded = await uploadOnCloudinary(req.file.path);
      image = uploaded.secure_url || uploaded.url || uploaded; // depends on your Cloudinary logic
    }

    let conversation = await Conversation.findOne({
      partcipants: { $all: [sender, receiver] }, // ❗️spelling same as your model
    });

    const newMessage = await Message.create({
      sender,
      receiver,
      message,
      image,
    });

    if (!conversation) {
      conversation = await Conversation.create({
        partcipants: [sender, receiver], // ❗️same spelling
        messages: [newMessage._id],
      });
    } else {
      conversation.messages.push(newMessage._id);
      await conversation.save();
    }

    const receiverSocketId = getReceiverSocketId(receiver)

    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage)
    }

    return res.status(200).json(newMessage);
  } catch (err) {
    console.error("Send Message Error:", err);
    return res.status(500).json({
      message: "Send Message Error",
      error: err.message,
    });
  }
};

const getMessages = async (req, res) => {
  try {
    const sender = req.userId;
    const { receiver } = req.params;

    const conversation = await Conversation.findOne({
      partcipants: { $all: [sender, receiver] }, // ❗️same spelling
    }).populate("messages"); // make sure field name in schema is `message`

    if (!conversation) {
      return res.status(400).json({
        message: "Messages not found",
      });
    }

    return res.status(200).json(conversation.messages);
  } catch (err) {
    console.error("Get Message Error:", err);
    return res.status(500).json({
      message: "Get Message Error",
      error: err.message,
    });
  }
};

module.exports = {
  sendMessage,
  getMessages,
};
