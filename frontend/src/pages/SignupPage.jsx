import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

const SignupPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function createUser(){
        try {
            
            // const res = await fetch("http://localhost:8000/user/signup", {
            const res = await fetch("https://collegebucket-backend.onrender.com/user/signup", {
                method:"POST",
                headers: {
                    "content-type": "application/json"
                },
                body: JSON.stringify({
                    username,
                    email,
                    password
                })
            });
            const data = await res.json();    
            alert(data.message);
            if(data.success === true){
                navigate("/login");
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        createUser();
    }

    return (
        <div className=' flex min-h-screen w-full'>
            <div className='hidden w-0 lg:w-1/2 lg:block'>
                <img src="/images/signupimage.jpg" alt="sign up" className='w-full h-full object-cover' />
            </div>
            <div className='lg:w-1/2 w-full flex items-center justify-center '>
                <div className='lg:w-[45%] lg:max-w-md w-full mx-4'>
                    <form
                        onSubmit={(e)=>handleSubmit(e)}
                        className='bg-primary-dark border border-white/10 px-8 py-14 rounded-3xl shadow-md'
                    >
                        <h1 className='font-semibold text-textcolor-primary text-center text-2xl mb-4 tracking-tighter font-poppins'>Sign up</h1>
                        <input
                            className='block w-full px-2 py-2 outline-none rounded-md mb-2 bg-primary-light text-textcolor-primary'
                            type="text"
                            placeholder='Your name'
                            name='username'
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <input
                            className='block w-full px-2 py-2 outline-none rounded-md mb-2 bg-primary-light text-textcolor-primary'
                            type="text"
                            placeholder='Your email'
                            name='email'
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <input
                            className='block w-full px-2 py-2 outline-none rounded-md mb-4 bg-primary-light text-textcolor-primary'
                            type="text"
                            placeholder='Your password'
                            name='password'
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <button
                            type='submit'
                            className='font-poppins  tracking-tighter w-full bg-black hover:text-accent-dark duration-200 text-white items-center mb-2 px-2 py-2 rounded-md font-semibold'
                        >
                            Create Account
                        </button>
                        <div className='text-xs flex gap-2 items-center'>
                            <h6 className='text-textcolor-secondary'>Already have an account?</h6>
                            <Link to={"/login"} className='text-accent font-semibold'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
