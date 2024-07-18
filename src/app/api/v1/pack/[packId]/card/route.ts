import db from '@/app/_utils/db';
import errorHandler from "@/app/_middleware/error-handler"
import CustomError from "@/app/_errors";
import {type NextRequest, NextResponse} from "next/server"
import {getAuthenticatedUserData, getRequestBody} from "@/app/_utils";
import {StatusCodes} from 'http-status-codes';

type ContextType = {
    params: {
        packId: string
    }
}

export const GET = async(request: NextRequest, context: ContextType) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {packId} = context.params;
        const queryParameters = new URL(request.url).searchParams;
        const whereObject: {[index: string]: any} = {
            userId: userID,
            packId: packId
        };
        const name = queryParameters.get('name');
        if (name) {
            whereObject.name = {
                contains: name
            }
        }
        const checkIfCardsExistForThisIdInTheFirstPlace = await db.card.findMany({
            where: {
                userId: userID,
                packId: packId
            }
        });
        if (!checkIfCardsExistForThisIdInTheFirstPlace.length) {
            throw new CustomError.NotFoundError('No Cards Found with the ID Provided!');
        }
        const page = Number(queryParameters.get('page')) || 1;
        const limit = Number(queryParameters.get('limit')) || 10;
        const skip = (page - 1) * limit;
        let result = db.card.findMany({
            where: whereObject,
            take: limit,
            skip: skip
        });
        const cards = await result;
        const totalCards = (await db.card.findMany({where: whereObject})).length;
        const numberOfPages = Math.ceil(totalCards / limit);
        return NextResponse.json({cards, totalCards, numberOfPages}, {status: StatusCodes.OK});
    }
    catch(error) {
        return errorHandler(error);
    }
}

export const POST = async(request: NextRequest, context: ContextType) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {packId} = context.params;
        const {name, content} = await getRequestBody(request);
        if (!name || !content) {
            throw new CustomError.BadRequestError('Please provide name/content for card creation');
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
        const card = await db.card.create({
            data: {
                name: name,
                content: content,
                packId: packId,
                userId: userID
            }
        });
        return NextResponse.json({card}, {status: StatusCodes.CREATED});
    }
    catch(error) {
        return errorHandler(error);
    }
}