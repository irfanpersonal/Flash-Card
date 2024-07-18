import {NextResponse} from "next/server";
import {StatusCodes} from 'http-status-codes';
import CustomError from "../_errors/custom-error";

const errorHandler = (error: any) => {
    if (error.code === 'P2002' || error.name === 'ZodError') {
        // P2002 is a Constriant Error from Prisma
        // ZodError is an error from failed Zod Schema Validation
        return NextResponse.json({msg: 'Please check all inputs!'}, {
            status: StatusCodes.BAD_REQUEST
        });
    }
    else if (error instanceof CustomError) {
        // If an instanceof the CustomError class that means we
        // will make use of the message and statusCode property
        // on it for a more accurate error message
        return NextResponse.json({msg: error.message}, {
            status: (error as any).statusCode
        });
    }
    else {
        return NextResponse.json({msg: 'Something went wrong, try again later!'}, {
            status: StatusCodes.INTERNAL_SERVER_ERROR
        });
    }
}

export default errorHandler;