import db from '@/app/_utils/db';
import {NextRequest, NextResponse} from 'next/server';
import errorHandler from '@/app/_middleware/error-handler';
import {getAuthenticatedUserData, getUserDataWithNoPassword} from '@/app/_utils';
import {StatusCodes} from 'http-status-codes';
import {UserSchema} from '@/app/_zodSchemas/models';

export const PATCH = async(request: NextRequest) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const requestBody = await request.json();
        UserSchema.parse(requestBody);
        await db.user.update({
            where: {
                id: userID
            },
            data: requestBody
        });
        const updatedUser = await db.user.findUnique({
            where: {
                id: userID
            },
            select: getUserDataWithNoPassword()
        });
        return NextResponse.json({user: updatedUser}, {status: StatusCodes.OK});
    }
    catch(error) {
        return errorHandler(error);
    }
}