const LoginBox: React.FunctionComponent = () => {
    return (
        <>
            <div>
                <label className="block mb-2" htmlFor='email'>Email</label>
                <input className='py-2 px-4 mb-4 w-full' id="email" type="email" name="email" required/>
            </div>
            <div>
                <label className="block mb-2" htmlFor='password'>Password</label>
                <input className='py-2 px-4 w-full' id="password" type="password" name="password" required/>
            </div>
        </>
    );
}

export default LoginBox;