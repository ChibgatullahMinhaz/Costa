export const uploadImageToImgBB = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    // const imgbbApiKey = import.meta.end.VITE_IMBB_API_KEY;
    const imgbbApiKey = import.meta.env.VITE_IMBB_API_KEY;

    // https://api.imgbb.com/1/upload?expiration=600&key=YOUR_CLIENT_API_KEY

    const response = await fetch(`https://api.imgbb.com/1/upload?key=${imgbbApiKey}`, {
        method: "POST",
        body: formData,
    });

    const data = await response.json();
    console.log(data)
    if (data.success) {
        return data.data.url; 
    } else {
        throw new Error("Image upload failed");
    }
};
