import jwt from 'jsonwebtoken';
// To set/get/delete cookies simply invoke the cookies method which is from 'next/headers' 
import {cookies} from 'next/headers';
import {UserType} from '../_zodSchemas/models';
import {jwtVerify} from 'jose';
import { NextRequest } from 'next/server';
import CustomError from '../_errors';

export interface ITokenPayload {
    userID: string,
    name: string,
    email: string
}

const createToken = (user: UserType) => {
    const payload: ITokenPayload = {
        userID: user.id!,
        name: user.name!,
        email: user.email!
    };
    return jwt.sign(
        payload,
        process.env.JWT_SECRET as string,
        {expiresIn: process.env.JWT_LIFETIME as string}
    );
}

const createCookieWithToken = (token: string) => {
    const oneDay = 1000 * 60 * 60 * 24;
    // In order to set a cookie in NextJS Route Handlers you must invoke the cookies 
    // method from the 'next/headers' module. Then use the ".set" method on it and use
    // it how you usually would.
    cookies().set('token', token, {
        // httpOnly when set to true means that we don't want any client side scripts 
        // to be able to access this cookie.
        httpOnly: true,
        // expires when set to one day means this cookie will be removed from any subsequent 
        // response in 24 hours.
        expires: new Date(Date.now() + oneDay),
        // secure when set to true means that this cookie will only work in "https",
        // but during development we are using "http" so I'm setting it as a conditional.
        // Where if the node enviroment is production only then is it true.
        secure: process.env.NODE_ENV === 'production',
    });
}

// Because the middleware.ts file runs on the Edge Runtime. We cannot use the 'jsonwebtoken' 
// module because it makes use of built in NodeJS modules which are not allowed in the 
// Edge Runtime. 
const verifyToken = (token: string) => {
    return (jwt.verify(token, process.env.JWT_SECRET as string) as ITokenPayload);
}

const verifyTokenCompatibleInEdgeRuntime = async(token: string) => {
    // If I were to just pass in the process.env.JWT_SECRET to the second parameter of the 
    // jwtVerify method from the 'jose' module I would get the following error
    // [TypeError: Key for the HS256 algorithm must be one of type CryptoKey or Uint8Array.]
    // So make sure to do it like this: new TextEncoder().encode(process.env.JWT_SECRET)
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const {payload} = await jwtVerify(token, secret);
    return payload;
}

const countries = [
    "Afghanistan",
    "Albania",
    "Algeria",
    "Andorra",
    "Angola",
    "Antigua & Deps",
    "Argentina",
    "Armenia",
    "Australia",
    "Austria",
    "Azerbaijan",
    "Bahamas",
    "Bahrain",
    "Bangladesh",
    "Barbados",
    "Belarus",
    "Belgium",
    "Belize",
    "Benin",
    "Bhutan",
    "Bolivia",
    "Bosnia Herzegovina",
    "Botswana",
    "Brazil",
    "Brunei",
    "Bulgaria",
    "Burkina",
    "Burundi",
    "Cambodia",
    "Cameroon",
    "Canada",
    "Cape Verde",
    "Central African Rep",
    "Chad",
    "Chile",
    "China",
    "Colombia",
    "Comoros",
    "Congo",
    "Congo {Democratic Rep}",
    "Costa Rica",
    "Croatia",
    "Cuba",
    "Cyprus",
    "Czech Republic",
    "Denmark",
    "Djibouti",
    "Dominica",
    "Dominican Republic",
    "East Timor",
    "Ecuador",
    "Egypt",
    "El Salvador",
    "Equatorial Guinea",
    "Eritrea",
    "Estonia",
    "Ethiopia",
    "Fiji",
    "Finland",
    "France",
    "Gabon",
    "Gambia",
    "Georgia",
    "Germany",
    "Ghana",
    "Greece",
    "Grenada",
    "Guatemala",
    "Guinea",
    "Guinea-Bissau",
    "Guyana",
    "Haiti",
    "Honduras",
    "Hungary",
    "Iceland",
    "India",
    "Indonesia",
    "Iran",
    "Iraq",
    "Ireland {Republic}",
    "Israel",
    "Italy",
    "Ivory Coast",
    "Jamaica",
    "Japan",
    "Jordan",
    "Kazakhstan",
    "Kenya",
    "Kiribati",
    "Korea North",
    "Korea South",
    "Kosovo",
    "Kuwait",
    "Kyrgyzstan",
    "Laos",
    "Latvia",
    "Lebanon",
    "Lesotho",
    "Liberia",
    "Libya",
    "Liechtenstein",
    "Lithuania",
    "Luxembourg",
    "Macedonia",
    "Madagascar",
    "Malawi",
    "Malaysia",
    "Maldives",
    "Mali",
    "Malta",
    "Marshall Islands",
    "Mauritania",
    "Mauritius",
    "Mexico",
    "Micronesia",
    "Moldova",
    "Monaco",
    "Mongolia",
    "Montenegro",
    "Morocco",
    "Mozambique",
    "Myanmar, {Burma}",
    "Namibia",
    "Nauru",
    "Nepal",
    "Netherlands",
    "New Zealand",
    "Nicaragua",
    "Niger",
    "Nigeria",
    "Norway",
    "Oman",
    "Pakistan",
    "Palau",
    "Panama",
    "Papua New Guinea",
    "Paraguay",
    "Peru",
    "Philippines",
    "Poland",
    "Portugal",
    "Qatar",
    "Romania",
    "Russian Federation",
    "Rwanda",
    "St Kitts & Nevis",
    "St Lucia",
    "Saint Vincent & the Grenadines",
    "Samoa",
    "San Marino",
    "Sao Tome & Principe",
    "Saudi Arabia",
    "Senegal",
    "Serbia",
    "Seychelles",
    "Sierra Leone",
    "Singapore",
    "Slovakia",
    "Slovenia",
    "Solomon Islands",
    "Somalia",
    "South Africa",
    "South Sudan",
    "Spain",
    "Sri Lanka",
    "Sudan",
    "Suriname",
    "Swaziland",
    "Sweden",
    "Switzerland",
    "Syria",
    "Taiwan",
    "Tajikistan",
    "Tanzania",
    "Thailand",
    "Togo",
    "Tonga",
    "Trinidad & Tobago",
    "Tunisia",
    "Turkey",
    "Turkmenistan",
    "Tuvalu",
    "Uganda",
    "Ukraine",
    "United Arab Emirates",
    "United Kingdom",
    "United States",
    "Uruguay",
    "Uzbekistan",
    "Vanuatu",
    "Vatican City",
    "Venezuela",
    "Vietnam",
    "Yemen",
    "Zambia",
    "Zimbabwe"
];

const isValidCountry = (countryName: string) => {
    return countries.includes(countryName);
}

const languages = [
    "Afrikaans",
    "Arabic",
    "Bengali",
    "Bulgarian",
    "Catalan",
    "Cantonese",
    "Croatian",
    "Czech",
    "Danish",
    "Dutch",
    "Lithuanian",
    "Malay",
    "Malayalam",
    "Panjabi",
    "Tamil",
    "English",
    "Finnish",
    "French",
    "German",
    "Greek",
    "Hebrew",
    "Hindi",
    "Hungarian",
    "Indonesian",
    "Italian",
    "Japanese",
    "Javanese",
    "Korean",
    "Norwegian",
    "Polish",
    "Portuguese",
    "Romanian",
    "Russian",
    "Serbian",
    "Slovak",
    "Slovene",
    "Spanish",
    "Swedish",
    "Telugu",
    "Thai",
    "Turkish",
    "Ukrainian",
    "Vietnamese",
    "Welsh",
    "Sign language",
    "Algerian",
    "Aramaic",
    "Armenian",
    "Berber",
    "Burmese",
    "Bosnian",
    "Brazilian",
    "Bulgarian",
    "Cypriot",
    "Corsica",
    "Creole",
    "Scottish",
    "Egyptian",
    "Esperanto",
    "Estonian",
    "Finn",
    "Flemish",
    "Georgian",
    "Hawaiian",
    "Indonesian",
    "Inuit",
    "Irish",
    "Icelandic",
    "Latin",
    "Mandarin",
    "Nepalese",
    "Sanskrit",
    "Tagalog",
    "Tahitian",
    "Tibetan",
    "Gypsy",
    "Wu"
];

const isValidLanguage = (languageName: string) => {
    return languages.includes(languageName);
}

const isValidDate = (value: string): boolean => {
    const date = new Date(value);
    return !isNaN(date.getTime());
}

const getRequestBody = async (request: NextRequest) => {
    try {
        const contentType = request.headers.get('content-type');
        if (contentType?.includes('application/json')) {
            const requestBody = await request.json();
            return requestBody;
        } 
        else if (contentType?.includes('multipart/form-data')) {
            const formData = await request.formData();
            const data: Record<string, FormDataEntryValue> = {};
            formData.forEach((value, key) => {
                data[key] = value;
            });
            return data;
        } 
        else {
            throw new Error('Unsupported content type');
        }
    } catch (error) {
        throw new CustomError.BadRequestError('Please check all inputs!');
    }
}

const getAuthenticatedUserData = (request: NextRequest): ITokenPayload => {
    const userData = JSON.parse((request.headers.get('x-user'))!) as ITokenPayload;
    return userData;
}

const getUserDataWithNoPassword = () => {
    return {
        id: true,
        name: true,
        email: true,
        country: true,
        birthday: true,
        createdAt: true,
        updatedAt: true
    };
}

export {
    createToken, 
    createCookieWithToken,
    verifyToken,
    verifyTokenCompatibleInEdgeRuntime,
    countries,
    isValidCountry,
    languages,
    isValidLanguage,
    isValidDate,
    getRequestBody,
    getAuthenticatedUserData,
    getUserDataWithNoPassword
};