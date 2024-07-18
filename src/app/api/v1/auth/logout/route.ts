import {NextRequest, NextResponse} from 'next/server';
import {cookies} from 'next/headers';
import errorHandler from '@/app/_middleware/error-handler';

export const GET = async(request: NextRequest) => {
    try {
        cookies().delete('token');
        return NextResponse.json({msg: 'Successfully Logged Out!'});
    }
    catch(error) {
        return errorHandler(error);
    }
}