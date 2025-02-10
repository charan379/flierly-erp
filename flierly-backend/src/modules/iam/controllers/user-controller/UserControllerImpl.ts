import { inject } from "inversify";
import UserController from "./UserController";
import UserService from "../../services/user-service/UserService";
import { NextFunction, Request, Response } from "express";
import { plainToInstance } from "class-transformer";
import UserCredentialsDTO from "../../dto/UserCredentials.dto";
import validateClassInstance from "@/lib/class-validator/utils/validate-entity.util";
import HttpCodes from "@/constants/http-codes.enum";
import apiResponseBuilder from "@/utils/builders/api-response.builder";
import RequestWithIdParamDTO from "@/modules/core/dto/RequestWithIdParam.dto";
import BeanTypes from "@/lib/di-ioc-container/bean.types";

export default class UserControllerImpl implements UserController {

    constructor(
        @inject(BeanTypes.UserService) private userService: UserService,
    ) {
    };

    async authenticate(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            // convert request body to DTO instance
            const userCredentialsDTO = plainToInstance(UserCredentialsDTO, req.body, { enableImplicitConversion: true });

            // validation of the request body
            await validateClassInstance(userCredentialsDTO);

            const result = await this.userService.authenticate(userCredentialsDTO.username, userCredentialsDTO.password);

            // responde with newly registered user details.
            return res.status(HttpCodes.OK).json(
                apiResponseBuilder({
                    success: true,
                    controller: 'UserController.authenticate',
                    httpCode: HttpCodes.OK,
                    message: 'Authenticated successfully.',
                    result,
                    req,
                    res,
                }),
            );
        } catch (error) {
            next(error);
        }
    }

    async refreshAccessToken(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {
            const result = await this.userService.refreshAccessToken(req.body.refreshToken);

            // responde with newly registered user details.
            return res.status(HttpCodes.OK).json(
                apiResponseBuilder({
                    success: true,
                    controller: 'UserController.refreshAccessToken',
                    httpCode: HttpCodes.OK,
                    message: 'Access token refreshed successfully.',
                    result,
                    req,
                    res,
                }),
            );
        } catch (error) {
            next(error);
        }
    }

    async updatePassword(req: Request, res: Response, next: NextFunction): Promise<Response | void> {
        try {

            const requestParamsDTO = plainToInstance(RequestWithIdParamDTO, req.params, { enableImplicitConversion: true });

            await validateClassInstance(requestParamsDTO);

            // convert request body to DTO instance
            const requestBodyDTO = plainToInstance(UserCredentialsDTO, req.body, { enableImplicitConversion: true });

            // validation of the request body
            await validateClassInstance(requestBodyDTO);

            const result = await this.userService.updatePassword(requestParamsDTO.id, requestBodyDTO);

            // responde with newly registered user details.
            return res.status(HttpCodes.OK).json(
                apiResponseBuilder({
                    success: true,
                    controller: 'UserController.updatePassword',
                    httpCode: HttpCodes.OK,
                    message: 'Password updated successfully.',
                    result,
                    req,
                    res,
                }),
            );
        } catch (error) {
            next(error);
        }
    }
}