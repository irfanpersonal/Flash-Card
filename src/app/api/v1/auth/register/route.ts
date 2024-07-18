import db from '@/app/_utils/db';
import {NextRequest, NextResponse} from 'next/server';
import {createToken, createCookieWithToken, getRequestBody} from '@/app/_utils/index';
import {UserSchema} from '@/app/_zodSchemas/models';
import errorHandler from '@/app/_middleware/error-handler';
import {StatusCodes} from 'http-status-codes';
import beforeUserSave from '@/app/_middleware/beforeUserSave';

export const POST = async(request: NextRequest) => {
    try {
        const requestBody = await getRequestBody(request);
        // This will throw an error if the requestBody doesn't follow the Zod Schema
        UserSchema.parse(requestBody);
        requestBody.password = await beforeUserSave(requestBody.password);
        const user = await db.user.create({
            data: requestBody
        });
        const token = createToken(user as any);
        createCookieWithToken(token);
        return NextResponse.json({
            user: {
                userID: user.id,
                name: user.name,
                email: user.email
            }
        }, {
            status: StatusCodes.CREATED
        });
    }
    catch(error: any) {
        return errorHandler(error);
    }
}