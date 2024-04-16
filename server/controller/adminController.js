import user from "../models/userSchema";

export const getAlluser = async (req, res) => {
  try {
    const findUser = await user.find({ role: "user" });
    return res.status(200).json({ success: true, message: "data fetched" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ success: false, message: "internal server error" });
  }
}; 



export const adminEditprofile = async (req, res) => {
  try {
    const id = req.params.id;
    const { name } = req.body;
    const update = await user.findByIdAndUpdate(id, { name });

    if (update) {
      res.status(200).json({ success: true, message: "user updation success" });
    } else {
      res
        .status(400)
        .json({
          success: false,
          message: "something went wrong while updating profile",
        });
    }
  } catch (err) {
    res.status(500).json({ success: false, message: "internal server error" });
  }
};
