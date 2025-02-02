import Userer from '../model/User.js'

let User;

async function generateUserInstance(){
    if(!User){
        User = await Userer();
    }
}

export const createUser = async (username,password) => {
    await generateUserInstance();
    await User.create({username,password});
}

export const getUsers = async () => {
    await generateUserInstance();
    try {
        const users = await User.findAll();
        return users;
      } catch (error) {
        return null;
      }
}

export const getUser = async (username) => {
    await generateUserInstance();
    try {
        const user = await User.findOne({
            where: { username }
        });
        return user;
      } catch (error) {
        return null;
      }
}

export const updateUserPassword = async (username,password) => {
    await generateUserInstance();
    try {
        const user = await User.findOne({
            where: { username }
        });
        await user.update({ password });
        user.save();
        return user;
      } catch (error) {
        return null;
      }
}