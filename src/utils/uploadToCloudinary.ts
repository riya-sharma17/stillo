import cloudinary from "./cloudinary";

export const uploadToCloudinary = (
  buffer: Buffer,
  folder: string,
  resourceType: "image" | "video"
) => {
  return new Promise<any>((resolve, reject) => {
    cloudinary.uploader.upload_stream(
      {
        folder,
        resource_type: resourceType,
      },
      (error, result) => {
        if (error) reject(error);
        else resolve(result);
      }
    ).end(buffer);
  });
};
