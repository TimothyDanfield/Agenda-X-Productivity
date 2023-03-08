module.exports = {
    app: {
      name: "Agenda-X-Productivity",
      apiEndpoint: process.env.API_URL ? `/${process.env.API_URL}` : "/api",
    },
    database: {
      url: process.env.MONGODB_URI || "mongodb+srv://nathanielgrandinette:somepassword1234@cluster0.u1htjf0.mongodb.net/Agenda-X-Productivity?retryWrites=true",
    },
    jwt: {
      secret: process.env.JWT_SECRET || "fjfkdjsoaijeo238u92jkrjeekjwl",
      tokenLife: "7d",
    },
  }