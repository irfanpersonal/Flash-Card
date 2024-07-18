import db from '@/app/_utils/db';
import {NextRequest, NextResponse} from 'next/server';
import errorHandler from '@/app/_middleware/error-handler';
import {getAuthenticatedUserData, getRequestBody} from '@/app/_utils';
import {StatusCodes} from 'http-status-codes';
import CustomError from '@/app/_errors';

export const GET = async(request: NextRequest) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        // To get access to Query Parameters we can't just do request.query, that does not
        // work. Instead we have to pass in the request.url into an instance of class URL.
        // And then use the searchParams property on it to get and set certain query parameters.
        // So like this.
        const queryParameters = new URL(request.url).searchParams;
        const whereObject: {[index: string]: any} = {
            userId: userID
        };
        const name = queryParameters.get('name');
        if (name) {
            whereObject.name = {
                contains: name // To create that "like" effect. Where regardless of casing it 
                // will work.
            }
        }
        const page = Number(queryParameters.get('page')) || 1;
        const limit = Number(queryParameters.get('limit')) || 10;
        const skip = (page - 1) * limit;
        let result = db.pack.findMany({
            where: whereObject,
            // include: {
            //     cards: true
            // },
            take: limit, // So the limit, how many do I want returned
            skip: skip // How do I want to skip so ignore from the beginning
        });
        const packs = await result;
        const totalPacks = (await db.pack.findMany({where: whereObject})).length;
        const numberOfPages = Math.ceil(totalPacks / limit);
        return NextResponse.json({packs, totalPacks, numberOfPages}, {status: StatusCodes.OK});
    }
    catch(error) {
        return errorHandler(error);
    }
}

export const POST = async(request: NextRequest) => {
    try {
        const {userID} = getAuthenticatedUserData(request);
        const {name} = await getRequestBody(request);
        if (!name) {
            throw new CustomError.BadRequestError('Please provide name for pack creation!');
        }
        const pack = await db.pack.create({
            data: {
                name: name,
                userId: userID
            }
        });
        return NextResponse.json({pack}, {status: StatusCodes.CREATED});
    }
    catch(error) {
        console.log(error);
        return errorHandler(error);
    }
}