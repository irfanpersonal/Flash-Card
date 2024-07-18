import {z} from 'zod';
import {isValidCountry, isValidDate} from '../_utils/index';

export const UserSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(3).optional(),
    email: z.string().email().optional(),
    password: z.string().min(5).optional(),
    country: z.string().refine((value) => isValidCountry(value), {
        message: 'Invalid Country'
    }).optional(),
    // The "birthday" property is equal to a string that is then checked to 
    // see if its a valid date. The reason we have to do this is because in
    // the req.body we pass in a string. We can't pass in a new Date() ...
    birthday: z.string().refine((value) => isValidDate(value), {
        message: 'Invalid Birthday'
    }).optional()
});

export type UserType = z.infer<typeof UserSchema>;