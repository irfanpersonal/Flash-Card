import db from '@/app/_utils/db';
import {NextRequest, NextResponse} from 'next/server';
import {createToken, createCookieWithToken, getRequestBody} from '@/app/_utils/index';
import errorHandler from '@/app/_middleware/error-handler';
import {StatusCodes} from 'http-status-codes';
import CustomError from '@/app/_errors';
import comparePassword from '@/app/_utils/comparePassword';

export const POST = async(request: NextRequest) => {
    try {
        const {email, password} = await getRequestBody(request);
        if (!email || !password) {
            throw new CustomError.BadRequestError('Please provide email and password!');
        }
        const user = await db.user.findUnique({
            where: {
                email: email
            }
        });
        if (!user) {
            throw new CustomError.NotFoundError('No User Found with the Email Provided!');
        }
        const isCorrect = await comparePassword(password, user.password);
        if (!isCorrect) {
            throw new CustomError.BadRequestError('Incorrect Password!');
        }
        const token = createToken(user as any);
        createCookieWithToken(token);
        return NextResponse.json({
            user: {
                userID: user.id,
                name: user.name,
                email: user.email
            }
        }, {
            status: StatusCodes.OK
        });
    }
    catch(error: any) {
        return errorHandler(error);
    }
}