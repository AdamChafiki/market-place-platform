import config from '@/config/global.config';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

export const uploadImageToCloudinary = async (
  file: string
): Promise<UploadApiResponse> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
    });
    return result;
  } catch (error) {
    console.error('Image upload error:', error);
    throw new Error('Failed to upload image to Cloudinary');
  }
};

export const deleteImageToCloudinary = async (
  imagePublic: string
): Promise<{ result: string }> => {
  try {
    if (!imagePublic) {
      throw new Error('Missing required parameter - public_id');
    }

    const result = await cloudinary.uploader.destroy(imagePublic);
    return result;
  } catch (error: any) {
    console.error('Image deletion error:', error);
    throw new Error(error.message || 'Failed to delete image from Cloudinary');
  }
};

export const deleteMultipleImageToCloudinary = async (
  publicIds: string[]
): Promise<any> => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error) {
    console.error('Image deletion error:', error);
    throw new Error('Failed to delete images from Cloudinary');
  }
};
