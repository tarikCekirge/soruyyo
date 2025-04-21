const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

// Generate JWT token
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "1h" });
};

// Register User
exports.registerUser = async (req, res) => {
  const { fullName, username, email, password, profileImg } = req.body;

  // Validation: Check for missing fields
  if (!fullName || !username || !email || !password || !profileImg) {
    return res.status(400).json({ message: "Tüm alanlar zorunlu." });
  }

  // Validation: Username minimum 4 characters
  if (username.length < 4) {
    return res
      .status(400)
      .json({ message: "Kullanıcı adı en az 4 karakter olmalıdır." });
  }

  // Validation: Username format (alphanumeric and underscores)
  const usernameRegex = /^[a-zA-Z0-9_]+$/;
  if (!usernameRegex.test(username)) {
    return res.status(400).json({
      message:
        "Geçersiz kullanıcı adı. Sadece harf, rakam ve alt çizgi (_) kullanabilirsiniz.",
    });
  }

  try {
    // Check if email already exists
    const existingEmail = await User.findOne({ email });
    if (existingEmail) {
      return res.status(400).json({ message: "Bu e-posta zaten kayıtlı." });
    }

    // Check if username already exists
    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res
        .status(400)
        .json({ message: "Bu kullanıcı adı zaten alınmış." });
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create new user
    const user = await User.create({
      fullName,
      username,
      email,
      password,
      profileImg,
    });

    // Respons with user info and token
    res.status(201).json({
      id: user._id,
      user,
      token: generateToken(user.id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası. Sonra tekrar deneyin." });
  }
};

// Login User
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  // Validation: Check for missing fields
  if (!email || !password) {
    return res.status(400).json({ message: "Tüm alanlar zorunlu." });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(400).json({ message: "Geçersiz kullaınıcı bilgisi" });
    }
    res.status(200).json({
      id: user._id,
      user: {
        ...user.toObject(),
        totalPollsCreacted: 0,
        totalPollsVotes: 0,
        totalPollsBookmarked: 0,
      },
      token: generateToken(user._id),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};

// Get User info
exports.getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) {
      return res.status(404).json({ message: "Kullanıcı bulunamadı" });
    }
    const userInfo = {
      ...user.toObject(),
      totalPollsCreacted: 0,
      totalPollsVotes: 0,
      totalPollsBookmarked: 0,
    };
    res.status(200).json(userInfo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Sunucu hatası." });
  }
};
