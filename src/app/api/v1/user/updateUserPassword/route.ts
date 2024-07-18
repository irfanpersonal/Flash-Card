import db from '@/app/_utils/db';
import {NextRequest, NextResponse} from 'next/server';
import errorHandler from '@/app/_middleware/error-handler';
import {getAuthenticatedUserData, getRequestBody} from '@/app/_utils';
import {StatusCodes} from 'http-status-codes';
import CustomError from '@/app/_errors';
import comparePassword from '@/app/_utils/comparePassword';
import beforeUserSave from '@/app/_middleware/beforeUserSave';

export const PATCH = async(request: NextRequest) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {oldPassword, newPassword} = await getRequestBody(request);
        if (!oldPassword || !newPassword) {
            throw new CustomError.BadRequestError('Please provide oldPassword and newPassword!');
        }
        const user = (await db.user.findUnique({
            where: {
                id: userID
            }
        }))!;
        const isCorrect = await comparePassword(oldPassword, user.password);
        if (!isCorrect) {
            throw new CustomError.BadRequestError('Incorrect Old Password!');
        }
        // I can't just do user.password = newPassword. Prisma is super limited. Hopefully they 
        // make it easier in the future!
        await db.user.update({
            where: {
                id: userID
            },
            data: {
                password: await beforeUserSave(newPassword)
            }
        });
        return NextResponse.json({msg: 'Updated User Password!'}, {status: StatusCodes.OK});
    }
    catch(error) {
        console.log(error);
        return errorHandler(error);
    }
}