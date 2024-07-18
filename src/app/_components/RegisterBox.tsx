import {countries} from "../_utils/client";

const RegisterBox: React.FunctionComponent = () => {
    return (
        <>
            <div>
                <label className="block mb-2" htmlFor='name'>Name</label>
                <input className='py-2 px-4 mb-4 w-full' id="name" type="text" name="name" required/>
            </div>           
            <div>
                <label className="block mb-2" htmlFor='email'>Email</label>
                <input className='py-2 px-4 mb-4 w-full' id="email" type="email" name="email" required/>
            </div>
            <div>
                <label className="block mb-2" htmlFor='password'>Password</label>
                <input className='py-2 px-4 mb-4 w-full' id="password" type="password" name="password" required/>
            </div>
            <div>
                <label className="block mb-2" htmlFor='country'>Country</label>
                <select className='py-2 px-4 w-full mb-4' id="country" name="country" required>
                    {countries.map(country => {
                        return (
                            <option key={country} value={country}>{country.toUpperCase()}</option>
                        );
                    })}
                </select>
            </div>
            <div>
                <label className="block mb-2" htmlFor='birthday'>Birthday</label>
                <input className='py-2 px-4 w-full' id="birthday" type="date" name="birthday" required/>
            </div>
        </>
    );
}

export default RegisterBox;