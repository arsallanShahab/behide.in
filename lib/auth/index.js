import bcrypt from 'bcrypt';

export async function hashPassword(password) {
  const saltRounds = 10;
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}

export async function verifyPassword(password, hashPassword) {
  try {
    const isValid = await bcrypt.compare(password, hashPassword);
    return isValid;
  } catch (error) {
    throw new Error('Password is not valid');
  }
}
