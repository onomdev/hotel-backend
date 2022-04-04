class UserTestJobs {
  async registerClientMongoService(req, res) {
    const {
      clientName,
      client_password: plainTextPassword,
      clientEmail,
    } = req.body;

    if (!clientName || typeof clientName !== "string") {
      return res.json({ status: "error", error: "Invalid client_name" });
    }

    if (!plainTextPassword || typeof plainTextPassword !== "string") {
      return res.json({ status: "error", error: "Invalid password" });
    }

    if (plainTextPassword.length < 5) {
      return res.json({
        status: "error",
        error: "Password too small. Should be atleast 6 characters",
      });
    }

    const password = await bcrypt.hash(plainTextPassword, 10);

    try {
      const response = await User.create({
        clientName,
        password,
        clientEmail,
      });

      console.log("User created successfully: ", response);
    } catch (error) {
      if (error.code === 11000) {
        // duplicate key
        return res.json({ status: "error", error: "Username already in use" });
      }
      throw error;
    }
    const token = jwt.sign(
      {
        clientName: clientName,
      },
      JWT_SECRET
    );
    res.json({ status: "ok", token: token });
  }
}
