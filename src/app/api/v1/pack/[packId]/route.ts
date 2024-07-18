import db from '@/app/_utils/db';
import {NextRequest, NextResponse} from 'next/server';
import errorHandler from '@/app/_middleware/error-handler';
import {getAuthenticatedUserData, getRequestBody} from '@/app/_utils';
import {StatusCodes} from 'http-status-codes';
import CustomError from '@/app/_errors';

// In Route Handlers that make use of Route Parameters we can access them in the
// second parameter of the Request Handlers called context. Think of context as
// additional information.  

type ContextType = {
    params: {
        packId: string
    }
};

export const GET = async(request: NextRequest, context: ContextType) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {packId} = context.params;
        const pack = await db.pack.findUnique({
            where: {
                id: packId,
                userId: userID
            }
        });
        if (!pack) {
            throw new CustomError.NotFoundError('No Pack Found with the ID Provided!');
        }
        return NextResponse.json({pack}, {status: StatusCodes.OK});
    }
    catch(error: any) {
        return errorHandler(error);
    }
}

export const PATCH = async(request: NextRequest, context: ContextType) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {packId} = context.params;
        const {name} = await getRequestBody(request);
        if (!name) {
            throw new CustomError.BadRequestError('Please provide name to update pack!');
        }
        const pack = await db.pack.findUnique({
            where: {
                id: packId,
                userId: userID
            }
        });
        if (!pack) {
            throw new CustomError.NotFoundError('No Pack Found with the ID Provided!');
        }
        const updatedPack = await db.pack.update({
            where: {
                id: packId,
                userId: userID
            },
            data: {
                name: name
            }
        });
        return NextResponse.json({pack: updatedPack}, {status: StatusCodes.OK});
    }
    catch(error) {
        return errorHandler(error);
    }
}

export const DELETE = async(request: NextRequest, context: ContextType) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {packId} = context.params;
        const pack = await db.pack.findUnique({
            where: {
                id: packId,
                userId: userID
            }
        });
        if (!pack) {
            throw new CustomError.NotFoundError('No Pack Found with the ID Provided!');
        }
        // Delete All Cards associated with the Pack First
        await db.card.deleteMany({
            where: {
                packId: packId,
                userId: userID
            }
        });
        // Now we can delete the Pack without Error
        await db.pack.delete({
            where: {
                id: packId,
                userId: userID
            }
        });
        return NextResponse.json({msg: 'Deleted Pack!'}, {status: StatusCodes.OK});
    }
    catch(error) {
        console.log(error);
        return errorHandler(error);
    }
}