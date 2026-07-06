const prisma = require("../config/prisma");
const bcrypt = require("bcrypt");

const { generateToken } = require("../utils/jwt");
const AppError = require("../utils/AppError");

async function register(email, password) {
  const existing = await prisma.user.findUnique({
    where: { email },
  });

  if (existing) {
    throw new AppError("Email already exists", 409);
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await prisma.user.create({
    data: {
      email,
      passwordHash,
    },
  });

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
}

async function login(email, password) {
  const user = await prisma.user.findUnique({
    where: { email },
  });

  if (!user) {
    throw new AppError("Invalid email or password", 401);
  }

  const valid = await bcrypt.compare(password, user.passwordHash);

  if (!valid) {
    throw new AppError("Invalid email or password", 401);
  }

  const token = generateToken(user.id);

  return {
    user: {
      id: user.id,
      email: user.email,
      createdAt: user.createdAt,
    },
    token,
  };
}

module.exports = {
  register,
  login,
};