import * as Sharing from "expo-sharing";
const shareContent = async ({title,message,imageUri}) => {
    const shareOptions = {
      title,
      url: imageUri,
      message,
    };

    try {
      await Sharing.shareAsync(imageUri, shareOptions);
    } catch (error) {
      console.error("Error sharing:", error);
    }
  };

export default shareContent;