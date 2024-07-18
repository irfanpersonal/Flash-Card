// The Middleware Function runs on the Edge Runtime

import {NextRequest, NextResponse} from "next/server";
import {verifyTokenCompatibleInEdgeRuntime} from "./app/_utils"; 
import {StatusCodes} from "http-status-codes";

const middleware = async(request: NextRequest) => {
    const protectedRoutes = [
        '/add-pack',
        '/pack',
        '/profile',
        '/pack/:packId/',
        '/card/:cardId/'
    ];
    try {
        const token = request.cookies.get('token')?.value;
        if (!token) {
            // If the client is trying to access a Protected Route
            if (protectedRoutes.includes(request.nextUrl.pathname)) {
                const absoluteURL = new URL("/", request.nextUrl.origin);
                return NextResponse.redirect(absoluteURL.toString());
            }
            else {
                throw new Error; // Missing Token Error
            }
        }
        // The reason I can't use jwt.verify here is that it's not compatible with Edge Runtime. 
        // This Middleware function runs on the edge (closer to the user's location). Think of 
        // Edge Runtime as a way for NextJS to quickly provide resources to the client. However, 
        // a drawback is that it doesn't have access to built in NodeJS modules like 'crypto'.
        // Which jwt uses in its dependencies. In such cases, we will need to use something else 
        // that is compatible with Edge Runtime. And that would be the 3rd party module called 'jose'.
        const decoded = await verifyTokenCompatibleInEdgeRuntime(token);
        // To append something to the request you first need to understand that in NextJS middleware
        // that is not allowed. I can't do "request.user = decoded". So we will have to do some acrobatics
        // instead to get the job done. And that will be done by making use of the headers. To get started.
        // First we need to clone the request headers
        const clonedRequestHeaders = new Headers(request.headers);
        // Add a new request header, in this case that would be the user set to the decoded value. 
        // And because this is a custom header we will follow the convetion so x-custom-header-name.
        clonedRequestHeaders.set('x-user', JSON.stringify(decoded));
        // Keep in mind that this middleware function does require you to return a NextResponse. 
        // So to make the request go onto the next middleware function we use the next method on
        // the NextResponse object. So like this.
        return NextResponse.next({
            request: {
                headers: clonedRequestHeaders // Here we are overwriting the current requests
                // headers with the clonedRequestHeaders so we add that custom header we made.
            }
        });
    }   
    catch(error) {
        return NextResponse.json({msg: 'Failed to Authenticate User!'}, {status: StatusCodes.UNAUTHORIZED});
    }
}

export const config = {
    matcher: [
        '/api/v1/user/showCurrentUser',
        '/api/v1/user/updateUser',
        '/api/v1/user/updateUserPassword',
        '/api/v1/pack',
        // To add a Route Paramter simply add the colon followed by the Route Parameter name, BUT make sure to 
        // add the last '/' in the end. Otherwise it will not work. So it isn't enough to say something like
        // '/api/v1/pack/:id'. This won't work. You have to do it like this '/api/v1/pack/:id/'.
        '/api/v1/pack/:packId/',
        '/api/v1/pack/:packId/card',
        '/api/v1/pack/:packId/card/:cardId/',
        // Protected Routes
        '/add-pack',
        '/pack',
        '/profile',
        '/pack/:packId/',
        '/card/:cardId/'
    ]
};

export default middleware;