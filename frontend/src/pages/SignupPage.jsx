import { useState } from 'react'
import { Link, useNavigate} from 'react-router-dom'

const SignupPage = () => {

    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    async function createUser(){
        try {
            
            const res = await fetch("http://localhost:8000/user/signup", {
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
            if(data.success == true){
                navigate("/login");
            }
            console.log(data);
        } catch (error) {
            console.log(error);
        }
    }

    function handleSubmit(e){
        e.preventDefault();
        createUser();
    }

    return (
        <div className=' flex h-screen overflow-hidden w-full'>
            <div className='bg-blue-400 w-1/2 '>
                <img src="/images/signupimage.jpg" alt="sign up image" className='w-full h-full object-cover' />
            </div>
            <div className='w-1/2 flex items-center justify-center '>
                <div className='w-[45%] max-w-md'>
                    <form
                        onSubmit={(e)=>handleSubmit(e)}
                        className='bg-[#ffd5c3] px-8 py-14 rounded-3xl shadow-md'
                    >
                        <h1 className='font-semibold text-center text-2xl mb-4 tracking-tighter font-poppins'>Sign up</h1>
                        <input
                            className='block w-full px-2 py-2 outline-none rounded-md mb-2 bg-[#FFF1EB]'
                            type="text"
                            placeholder='Your name'
                            name='username'
                            onChange={(e)=>setUsername(e.target.value)}
                        />
                        <input
                            className='block w-full px-2 py-2 outline-none rounded-md mb-2 bg-[#FFF1EB]'
                            type="text"
                            placeholder='Your email'
                            name='email'
                            onChange={(e)=>setEmail(e.target.value)}
                        />
                        <input
                            className='block w-full px-2 py-2 outline-none rounded-md mb-4 bg-[#FFF1EB]'
                            type="text"
                            placeholder='Your password'
                            name='password'
                            onChange={(e)=>setPassword(e.target.value)}
                        />
                        <button
                            type='submit'
                            className='font-poppins  tracking-tighter w-full bg-black text-white items-center mb-2 px-2 py-2 rounded-md font-semibold'
                        >
                            Create Account
                        </button>
                        <div className='text-xs flex gap-2 items-center'>
                            <h6>Already have an account?</h6>
                            <Link to={"/login"} className='text-pink-700 font-semibold'>Login</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default SignupPage
