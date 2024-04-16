import user from "../models/userSchema.js";
import bcrypt from "bcryptjs";



//FETCHING DATA

export const fetchUserData = async (req, res) => {
  try {
    const { userId } = req.user;
    console.log(req.user.userId);
    const userData = await user.findById(req.user.userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(userData);
  } catch (err) {
    res
      .status(500)
      .json({ success: false, message: "server error,please try again" });
  }
};


///EDIT PROFILE

export const editProfile = async (req, res) => {
  try {
    const { name, password } = req.body;

    const id = req.params.id;

    const userData = await user.findByIdAndUpdate(id, {
      $set: {
        name,
      },
    });

    if (!userData) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Profile updated successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

///RESET PASSWORD

export const resetPassword = async (req, res) => {
  try {
    const id = req.params.id;
    const { oldPassword, password } = req.body;
    const findUser = await user.findById(id);
    console.log(findUser,'uuuuuuuuuuuuuuuuuuuuuuu')

    const checkpassword = await bcrypt.compare(
      oldPassword,
      findUser.password
    );
    if (!checkpassword) {
      return res
        .status(403)
        .json({ success: false, message: "Invalid Credentials" });
    }

    const saltround = 10;
    const hashedpassword = await bcrypt.hash(password, saltround);
    const updatePassword = await findUser.updateOne({
      password: hashedpassword,
    });
    if (!updatePassword) {
      return res
        .status(500)
        .json({ success: false, message: "Error occured while updating" });
    }

    res
      .status(200)
      .json({ success: true, message: "Success fully changed password" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "internal server error" });
  }
};


//DELETE ACCOUNT
export const deleteAccount = async (req, res) => {

    try {
        const id = req.params.id



        const update = await user.findByIdAndDelete(id)
        if (update) {
            res.status(200).clearCookie("token").json({ succcess: true, message: 'Delete Suceess' })
        } else {
            res.status(404).json({ succcess: false, message: 'User not found' })
        }
    } catch (err) {
        res.status(500).json({ succcess: false, message: 'Server Error' })
    }
}