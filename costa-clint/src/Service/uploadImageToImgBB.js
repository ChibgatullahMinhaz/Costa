import axios from "axios";

export const uploadImageToImgBB = async (imageFile) => {
  const apiKey = "YOUR_IMGBB_API_KEY";
  const formData = new FormData();
  formData.append("image", imageFile);

  try {
    const res = await axios.post(
      `https://api.imgbb.com/1/upload?key=${apiKey}`,
      formData
    );
    return res.data.data.url; // uploaded image URL
  } catch (error) {
    console.error("Image upload failed:", error);
    throw error;
  }
};
