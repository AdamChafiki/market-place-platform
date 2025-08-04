import config from '@/config/global.config';
import {
  v2 as cloudinary,
  UploadApiResponse,
  UploadApiErrorResponse,
} from 'cloudinary';
import { AppError } from '@/utils/AppError';
import { StatusCodes } from 'http-status-codes';

cloudinary.config({
  cloud_name: config.cloudinaryCloudName,
  api_key: config.cloudinaryApiKey,
  api_secret: config.cloudinaryApiSecret,
});

// Upload
export const uploadImageToCloudinary = async (
  file: string
): Promise<UploadApiResponse> => {
  try {
    const result = await cloudinary.uploader.upload(file, {
      resource_type: 'auto',
    });
    return result;
  } catch (error: any) {
    console.error('Image upload error:', error);
    throw new AppError(
      error.message || 'Failed to upload image to Cloudinary',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete one image
export const deleteImageToCloudinary = async (
  imagePublicId: string
): Promise<{ result: string }> => {
  try {
    if (!imagePublicId) {
      throw new AppError(
        'Missing required parameter - public_id',
        StatusCodes.BAD_REQUEST
      );
    }

    const result = await cloudinary.uploader.destroy(imagePublicId);
    return result;
  } catch (error: any) {
    console.error('Image deletion error:', error);
    throw new AppError(
      error.message || 'Failed to delete image from Cloudinary',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};

// Delete multiple images
export const deleteMultipleImageToCloudinary = async (
  publicIds: string[]
): Promise<any> => {
  try {
    const result = await cloudinary.api.delete_resources(publicIds);
    return result;
  } catch (error: any) {
    console.error('Multiple image deletion error:', error);
    throw new AppError(
      error.message || 'Failed to delete images from Cloudinary',
      StatusCodes.INTERNAL_SERVER_ERROR
    );
  }
};
