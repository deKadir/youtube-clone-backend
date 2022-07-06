import bcrypt from 'bcrypt';

const hashPassword = async (password) => {
  const result = await bcrypt.hash(password, 10);
  return result;
};
const comparePassword = async (plain, hash) => {
  return await bcrypt.compare(plain, hash);
};

export { hashPassword, comparePassword };
