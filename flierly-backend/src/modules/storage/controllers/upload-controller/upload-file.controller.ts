import Joi from 'joi';
import JoiSchemaValidator from '@/lib/joi/joi-schema.validator';
import apiResponseBuilder from '@/utils/builders/api-response.builder';
import HttpCodes from '@/constants/http-codes.enum';
import { Request, Response } from 'express';
import storageService from '@/modules/storage/services/storage-service/storageService';

// Joi validation schema for file upload
const fileUploadSchema: Joi.ObjectSchema = Joi.object({
  file: Joi.object().required(), // Ensure file is included in the request
});

// Upload file controller
const uploadFileController = async (req: Request, res: Response): Promise<Response> => {
  try {
    // Validate the request using Joi
    await JoiSchemaValidator(fileUploadSchema, { file: req.file }, { abortEarly: false, allowUnknown: true }, 'file-upload');

    const file = req.file;
    if (!file) {
      return res.status(HttpCodes.BAD_REQUEST).json(
        apiResponseBuilder({
          success: false,
          message: 'File is required',
          result: null,
          error: 'File is required',
          controller: 'uploadFileController',
          httpCode: HttpCodes.BAD_REQUEST,
          req,
          res,
        }),
      );
    }

    // Destination path for the uploaded file
    const destinationPath = ``;
    const { fileUrl, fileUpload } = await storageService.uploadFile(file, destinationPath);

    return res.status(HttpCodes.CREATED).json(
      apiResponseBuilder({
        success: true,
        message: 'File uploaded successfully',
        result: {
          fileUrl,
          metadata: fileUpload,
        },
        error: null,
        controller: 'uploadFileController',
        httpCode: HttpCodes.CREATED,
        req,
        res,
      }),
    );
  } catch (error: any) {
    return res.status(HttpCodes.INTERNAL_SERVER_ERROR).json(
      apiResponseBuilder({
        success: false,
        message: 'Failed to upload file',
        result: null,
        error: error.message,
        controller: 'uploadFileController',
        httpCode: HttpCodes.INTERNAL_SERVER_ERROR,
        req,
        res,
      }),
    );
  }
};

export default uploadFileController;
