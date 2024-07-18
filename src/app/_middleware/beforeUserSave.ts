import bcrypt from 'bcryptjs';

const beforeUserSave = async(password: string) => {
    const randomBytes = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, randomBytes);
    return hashedPassword;
}

export default beforeUserSave;