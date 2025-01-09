import Joi from "joi";
import { UpdateAssociatedEntityRecordsRequestBody } from "../@types/request-data.types";
import { idArraySchema, idSchema } from "@/lib/joi/joi-schemas/common.joi.schema";

const updateAssociatedEntityRecordsRequestBodySchema: Joi.ObjectSchema<UpdateAssociatedEntityRecordsRequestBody> = Joi.object({
  entityRecordId: idSchema,
  entitySideField: Joi.string().required().messages({
    'any.required': 'The "entitySideField" is required.',
  }),
  newArray: idArraySchema.optional(),
  addOne: Joi.number().optional(),
  removeOne: Joi.number().optional(),
  addMultiple: idArraySchema.optional(),
  removeMultiple: idArraySchema.optional(),
});

export default updateAssociatedEntityRecordsRequestBodySchema;