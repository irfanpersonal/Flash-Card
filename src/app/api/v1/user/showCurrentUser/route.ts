import db from '@/app/_utils/db';
import {NextRequest, NextResponse} from 'next/server';
import errorHandler from '@/app/_middleware/error-handler';
import {getAuthenticatedUserData, getUserDataWithNoPassword} from '@/app/_utils';
import {StatusCodes} from 'http-status-codes';

export const GET = async(request: NextRequest) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const user = await db.user.findUnique({
            where: {
                id: userID
            },
            select: getUserDataWithNoPassword()
        });
        return NextResponse.json({user}, {status: StatusCodes.OK});
    }
    catch(error) {
        return errorHandler(error);
    }
}