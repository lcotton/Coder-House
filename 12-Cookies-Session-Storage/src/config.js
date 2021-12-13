export default {
  mongodb: {
    cnxStr:
      "mongodb+srv://coderhouse:coderhouse@coderhouse.naatu.mongodb.net/blog?retryWrites=true&w=majority",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
    },
  },
  fileSystem: {
    path: "./src/db/chats.json",
  }
};

export const PERS = "mongodb";
