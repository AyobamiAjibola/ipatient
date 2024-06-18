import { appCommonTypes } from "../@types/app-common";
import HttpResponse = appCommonTypes.HttpResponse;
import { Request } from "express";
import { TryCatch } from "../decorators";
import Joi from "joi";
import CustomAPIError from "../exceptions/CustomAPIError";
import HttpStatus from "../helpers/HttpStatus";
import datasources from '../services/dao';
import { IUserModel } from "../models/User";
import formidable, { File } from 'formidable';
import { UPLOAD_BASE_PATH } from "../config/constants";
import Generic from "../utils/Generic";
import { IInsightModel } from "../models/Insight";

const form = formidable({ uploadDir: UPLOAD_BASE_PATH });
form.setMaxListeners(15);

export default class UserController {

    @TryCatch
    public async getAllUsers (req: Request) {
        const userId = req.user._id;

        const user = await datasources.userDAOService.findById(userId);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const users = await datasources.userDAOService.findAll({});
        const filteredUsers = users.filter(user => user.email !== "ipatient_admin@ipatient.com");

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: filteredUsers
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async deactivateUser (req: Request) {
        const loggedInUser = req.user._id;
        const userId = req.params.userId;

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));

        const userExist = await datasources.userDAOService.findById(userId);
        if(!userExist) return Promise.reject(CustomAPIError.response("User does not exist.", HttpStatus.NOT_FOUND.code));

        await datasources.userDAOService.updateByAny(
            { _id: userExist._id },
            { active: !userExist.active }
        )

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated user status.'
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async getSingleUser (req: Request) {
        const userId = req.params.userId;

        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));
        
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: user
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async updateUserOnboarding (req: Request) {
        const userId = req.user._id;

        const { error, value } = Joi.object<any>({
            age: Joi.string().label('Age'),
            gender: Joi.string().required().label('Gender'),
            address: Joi.string().label('Address'),
            state: Joi.string().label('State'),
            lga: Joi.string().label('LGA'),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        const payload: Partial<IUserModel> = {
            state: value.state,
            lga: value.lga,
            age: value.age ? value.age : user.age,
            gender: value.gender ? value.gender : user.gender,
            address: value.address ? value.address : user.address,
            level: 2
        };

        await datasources.userDAOService.updateByAny({_id: user._id}, payload as IUserModel)

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.'
        };

        return Promise.resolve(response);
        
    }

    @TryCatch
    public async updateUserProfile (req: Request) {
        const user = await this.doUpdateUserProfile(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.',
            result: user
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getUserInsights (req: Request) {
        const userId = req.params.userId;

        const insights = await datasources.insightDAOService.findAll({user: userId});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: insights
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getSingleInsight (req: Request) {
        const insightId = req.params.insightId;

        const insight = await datasources.insightDAOService.findById( insightId );
        if(!insight)
            return Promise.reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: insight
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteInsight (req: Request) {
        const insightId = req.params.insightId;

        const insight = await datasources.insightDAOService.findById( insightId );
        if(!insight)
            return Promise.reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));

        await datasources.insightDAOService.deleteById(insight._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted insight.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getAllInsights (req: Request) {
        const insights = await datasources.insightDAOService.findAll({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: insights
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async reviewOnInsight (req: Request) {
        const userId = req.user._id;
        const insightId = req.params.insightId;

        const { error, value } = Joi.object<any>({
            review: Joi.string().required().label('Review')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const insight = await datasources.insightDAOService.findById(insightId);
        if(!insight)
            return Promise.reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));

        insight.reviews.unshift({
            review: value.review,
            user: userId
        });
    
        await datasources.insightDAOService.updateByAny({ _id: insight._id }, { reviews: insight.reviews });
        
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully commented on the insight.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async createInsight (req: Request) {
        await this.doCreateInsight(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created insight.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updateInsight (req: Request) {
        await this.doUpdateInsight(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.'
        };
      
        return Promise.resolve(response);
    }
    
    @TryCatch
    public async getUserAdvocacies (req: Request) {
        const userId = req.params.userId;

        const advocacies = await datasources.advocacyDAOService.findAll({user: userId});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: advocacies
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getSingleAdvocate (req: Request) {
        const advocacyId = req.params.advocacyId;

        const advocacy = await datasources.advocacyDAOService.findById( advocacyId );
        if(!advocacy)
            return Promise.reject(CustomAPIError.response("Advocacy not found.", HttpStatus.NOT_FOUND.code));

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: advocacy
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteAdvocacy (req: Request) {
        const advocacyId = req.params.advocacyId;

        const advocacy = await datasources.advocacyDAOService.findById( advocacyId );
        if(!advocacy)
            return Promise.reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));

        await datasources.advocacyDAOService.deleteById(advocacy._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted advocacy.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getAllAdvocacies (req: Request) {
        const userId = req.user._id;

        const user = await datasources.userDAOService.findById(userId);
        if(user && !user.userType.includes('admin'))
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const advocacies = await datasources.advocacyDAOService.findAll({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: advocacies
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async createAdvocacy (req: Request) {

        const userId = req.user._id;

        const { error, value } = Joi.object<any>({
            hospitalName: Joi.string().label('hospital name'),
            hospitalAddress: Joi.string().required().label('hospital address'),
            complaints: Joi.string().label('Complain')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        if(user && !user.userType.includes("advocacy"))
            return Promise.reject(CustomAPIError.response("You are not authorized as an advocate.", HttpStatus.UNAUTHORIZED.code));

        const payload = {
            ...value,
            user: user._id,
            reference: `#${Generic.generateReference(6)}`
        };

        await datasources.advocacyDAOService.create(payload)

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created advocacy.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updateAdvocacy (req: Request) {

        const advocacyId = req.params.advocacyId;

        const { error, value } = Joi.object<any>({
            hospitalName: Joi.string().label('hospital name'),
            hospitalAddress: Joi.string().label('hospital address'),
            complaints: Joi.string().label('Comment')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const advocacy = await datasources.advocacyDAOService.findById(advocacyId);
        if(!advocacy)
            return Promise.reject(CustomAPIError.response("Advocacy not found.", HttpStatus.NOT_FOUND.code));

        await datasources.advocacyDAOService.updateByAny({ _id: advocacy._id }, { ...value })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated advocacy.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updateAdvocacyStatus (req: Request) {
        const loggedInUser = req.user._id;
        const advocacyId = req.params.advocacyId;

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.userType.includes("admin"))
            return Promise.reject(CustomAPIError.response("You not authorized.", HttpStatus.UNAUTHORIZED.code));

        const advocacy = await datasources.advocacyDAOService.findById(advocacyId);
        if(!advocacy)
            return Promise.reject(CustomAPIError.response("Advocacy not found.", HttpStatus.NOT_FOUND.code));

        if(advocacy.status === "pending") {
            await datasources.advocacyDAOService.updateByAny({ _id: advocacy._id }, { status: "in-progress" })
        } else if( advocacy.status === "in-progress" ) {
            await datasources.advocacyDAOService.updateByAny({ _id: advocacy._id }, { status: "closed" })
        }

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated status.'
        };
      
        return Promise.resolve(response);

    }

    private async doCreateInsight(req: Request): Promise<HttpResponse<IUserModel>> {
        return new Promise((resolve, reject) => {
            const userId = req.user._id;

            form.parse(req, async (err, fields, files) => {
                const { error, value } = Joi.object<any>({
                    hospitalName: Joi.string().label('Hospital name'),
                    // hospitalAddress: Joi.string().label('Hospital address'),
                    // state: Joi.string().label('State'),
                    image: Joi.any().label('Image'),
                    rating: Joi.string().label('Rating'),
                    comment: Joi.string().label('Comment'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user] = await Promise.all([
                    datasources.userDAOService.findById(userId)
                ]);
        
                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
    
                const [_image] = await Promise.all([
                    Generic.handleImage(files.titleImage as File, basePath)
                ]);

                const payload = {
                    ...value,
                    rating: +value.rating,
                    image: _image,
                    user: user._id
                }

                const insight: any = await datasources.insightDAOService.create(payload as IInsightModel);

                return resolve(insight)

            })
        })
    }

    private async doUpdateInsight(req: Request): Promise<HttpResponse<IUserModel>> {
        return new Promise((resolve, reject) => {
            const insightId = req.params.insightId

            form.parse(req, async (err, fields, files) => {
                const { error, value } = Joi.object<any>({
                    hospitalName: Joi.string().label('Hospital name'),
                    // hospitalAddress: Joi.string().label('Hospital address'),
                    // state: Joi.string().label('State'),
                    image: Joi.any().label('Image'),
                    rating: Joi.string().label('Rating'),
                    comment: Joi.string().label('Comment'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [insight] = await Promise.all([
                    datasources.insightDAOService.findById(insightId)
                ]);

                if(!insight)
                    return reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
    
                const [_image] = await Promise.all([
                    Generic.handleImage(files.titleImage as File, basePath)
                ]);

                const imagePath = 'photo/'
                if (_image && insight.image) {
                    await Generic.deleteExistingImage(insight.image, basePath, imagePath);
                };
    

                const payload = {
                    ...value,
                    image: _image ? _image : insight.image
                }


                const updatedInsight: any = await datasources.insightDAOService.updateByAny({ _id: insight._id }, payload as IInsightModel);

                return resolve(updatedInsight)

            })
        })
    }

    private async doUpdateUserProfile(req: Request): Promise<HttpResponse<IUserModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const userId = req.params.userId;

                const { error, value } = Joi.object<any>({
                    email: Joi.string().label('Email'),
                    firstName: Joi.string().label('First Name'),
                    lastName: Joi.string().label('Last Name'),
                    phone: Joi.string().label('Phone Number'),
                    age: Joi.string().label('Age'),
                    gender: Joi.string().label('Gender'),
                    address: Joi.string().label('Address'),
                    // healthInterests: Joi.string().label('Health Interests'),
                    image: Joi.any().label('image'),
                    userType: Joi.string().label('user type'),
                    state: Joi.string().label('State'),
                    lga: Joi.string().label('LGA'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user] = await Promise.all([
                    datasources.userDAOService.findById(userId)
                ]);
        
                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
        
                const [_image] = await Promise.all([
                    Generic.handleImage(files.titleImage as File, basePath)
                ]);

                const imagePath = 'photo/'
                if (_image && user.image) {
                    await Generic.deleteExistingImage(user.image, basePath, imagePath);
                };

                // let healthInterests;
                // if(value.healthInterests) {
                //     healthInterests = JSON.parse(value.healthInterests)
                // }

                let userType;
                if(value.userType) {
                    userType = JSON.parse(value.userType)
                }

                const payload: Partial<IUserModel> = {
                    email: value.email 
                            ? user.isAdmin
                                ? user.email : value.email
                            : user.email,
                    firstName: value.firstName ? value.firstName : user.firstName,
                    lastName: value.lastName ? value.lastName : user.lastName,
                    phone: value.phone ? value.phone : user.phone,
                    age: value.age ? value.age : user.age,
                    gender: value.gender ? value.gender : user.gender,
                    address: value.address ? value.address : user.address,
                    // healthInterests: healthInterests.length > 0 ? healthInterests : user.healthInterests,
                    userType: userType.length > 0 ? userType : user.userType,
                    state: value.state ? value.state : user.state,
                    lga: value.lga ? value.lga : user.lga
                }

                const updatedUser: any = await datasources.userDAOService.updateByAny({_id: user._id}, payload as IUserModel);

                return resolve(updatedUser)

            })
        })
    }
}