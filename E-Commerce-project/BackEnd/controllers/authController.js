const authService = require('../services/authService');
const userService=require("../services/userService")
const jwtService=require("jsonwebtoken");
const uuivd = require("uuid");
const mailer=require("../NodeMailer/transporter")


exports.login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const userId = await authService.login(email, password);
        if (!userId) {
            return res.status(401).json({ message: "Check your password" });
        }
        const token = jwtService.sign({ id: userId }, process.env.JWT_SECRET_KEY, { expiresIn: "8h" });
        return res.status(200).json({ token });
    } catch (error) {
        console.error("Login error: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

exports.Forgetpassword=async(req,res)=>{
    try{
        const{email}=req.body;
        if(!await userService.checkUserExists(email)){
            return res.status(404).json({message:"User Not found"});

        }

        const code=uuivd.v4();
        await userService.updateUser(email,"code",code)
        const tokenForgetPassword=jwtService.sign({code},process.env.JWT_RESET_KEY);
        await mailer.sendEmail(email,tokenForgetPassword)
        console.log("token is : " + tokenForgetPassword);
        return res.status(201).json({message:"Check your Email"})

    }

    catch(error){
        console.log("controller error: " + error);
    }


}

exports.resetPassword = async (req, res) => {
    const { newPassword } = req.body;
    const { code } = req.params; // Assuming you're passing the reset code as a URL param
    try {
        // Verify the reset code using JWT
        const decoded = jwtService.verify(code, process.env.JWT_RESET_KEY);
        if (!decoded) {
            return res.status(401).json({ message: "Invalid or expired reset code" });
        }

        const user = await userModel.findOne({ resetCode: decoded.code });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Hash the new password and update it
        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);
        user.resetCode = null; // Clear the reset code
        await user.save();

        return res.status(200).json({ message: 'Password changed successfully' });
    } catch (error) {
        console.error("Controller error: ", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};
