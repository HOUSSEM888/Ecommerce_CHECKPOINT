const userModel = require('../models/userModel');
const bcrypt = require('bcryptjs');

exports.checkUserExists = async (email) => {
    try {
        const user = await userModel.findOne({ email });
        return !!user; // Return true if user exists
    } catch (error) {
        console.error("Database query failed: ", error);
        throw new Error('Database query failed');
    }
};

exports.register = async (name, email, password) => {
    try {
        const existingUser = await userModel.findOne({ email });
        if (existingUser) {
            throw new Error('Email already exists');
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const newUser = new userModel({ name, email, password: hashedPassword });
        const savedUser = await newUser.save();
        return { id: savedUser._id, name: savedUser.name, email: savedUser.email };
    } catch (error) {
        console.error("User registration failed: ", error);
        throw new Error('User registration failed');
    }
};

exports.updateUser = async (email, field, value) => {
    try {
        const updatedUser = await userModel.findOneAndUpdate(
            { email },
            { [field]: value },
            { new: true }
        );
        return updatedUser;
    } catch (error) {
        console.error("Update user failed: ", error);
        throw new Error('Update user failed');
    }
};

exports.getUserById = async (id) => {
    try {
        const user = await userModel.findById(id);
        if (!user) {
            throw new Error('User not found');
        }
        return user;
    } catch (error) {
        console.error("Error retrieving user by ID: ", error);
        throw new Error('Error retrieving user');
    }
};
exports.getUserbyProp=async(prop,value)=>
    {
        try
        {   const selections='firstName lastName email cart favorites'
            const user=await userModel.findById(id).select(selections);
            return user;
        }
        catch(error)
        {
            console.log(error);
        }
    }