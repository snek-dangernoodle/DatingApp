const userController = {};

//User middleware

userController.registerUser = async (req, res, next) => {
  const { username, password, personalInterests } = req.body;

  try {
    // Insert the user into the 'users' table
    const newUser = await pool.query(
      "INSERT INTO users (username, password) VALUES ($1, $2) RETURNING id",
      [username, password]
    );

    // Extract the newly generated user ID
    const userId = newUser.rows[0].id;

    // Insert user's personal interests into the 'personal_interests' table
    if (Array.isArray(personalInterests)) {
      for (const personalInterest of personalInterests) {
        await pool.query(
          "INSERT INTO personal_interests (user_id, interest) VALUES ($1, $2)",
          [userId, personalInterest]
        );
      }
      return next();
    } else {
      res.status(400).json({ error: "personalInterests should be an array" });
      return next({
        log: `personalInterests should be an array: ${err}`,
        status: 500,
        message: { err: "Invalid personalInterests" },
      });
    }
  } catch (err) {
    return next({
      log: `Error during registration: ${err}`,
      status: 500,
      message: { err: "Registration failed" },
    });
  }
};
