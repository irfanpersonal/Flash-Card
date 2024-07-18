import db from '@/app/_utils/db';
import errorHandler from "@/app/_middleware/error-handler";
import CustomError from '@/app/_errors';
import {getAuthenticatedUserData, getRequestBody} from "@/app/_utils";
import {type NextRequest, NextResponse} from "next/server";
import {StatusCodes} from 'http-status-codes';

type ContextType = {
    params: {
        packId: string,
        cardId: string
    }
}

export const GET = async(request: NextRequest, context: ContextType) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {packId, cardId} = context.params;
        const card = await db.card.findUnique({
            where: {
                id: cardId,
                packId: packId,
                userId: userID
            }
        });
        if (!card) {
            throw new CustomError.NotFoundError('No Card Found with the ID Provided!');
        }
        return NextResponse.json({card});
    }
    catch(error) {
        return errorHandler(error);
    }
}

export const PATCH = async(request: NextRequest, context: ContextType) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {packId, cardId} = context.params;
        const {name, content} = await getRequestBody(request);
        if (!name || !content) {
            throw new CustomError.BadRequestError('Please provide name/content to update card');
        }
        const card = await db.card.findUnique({
            where: {
                id: cardId,
                packId: packId,
                userId: userID
            }
        });
        if (!card) {
            throw new CustomError.NotFoundError('No Card Found with the ID Provided!');
        }
        const updatedCard = await db.card.update({
            where: {
                id: cardId,
                packId: packId,
                userId: userID
            },
            data: {
                name: name,
                content: content
            }
        });
        return NextResponse.json({card: updatedCard}, {status: StatusCodes.OK});
    }
    catch(error) {
        return errorHandler(error);
    }
}

export const DELETE = async(request: NextRequest, context: ContextType) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {packId, cardId} = context.params;
        const card = await db.card.findUnique({
            where: {
                id: cardId,
                packId: packId,
                userId: userID
            }
        });
        if (!card) {
            throw new CustomError.NotFoundError('No Card Found with the ID Provided!');
        }
        await db.card.delete({
            where: {
                id: cardId,
                packId: packId,
                userId: userID
            }
        });
        return NextResponse.json({msg: 'Deleted Card!'}, {status: StatusCodes.OK});
    }
    catch(error) {
        return errorHandler(error);
    }
}