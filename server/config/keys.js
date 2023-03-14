module.exports = {
    app: {
      name: "Agenda-X-Productivity",
      apiEndpoint: process.env.API_URL ? `/${process.env.API_URL}` : "/api",
    },
    database: {
      url: process.env.MONGODB_URI
    },
    jwt: {
      secret: process.env.JWT_SECRET,
      tokenLife: "7d",
    },
  }