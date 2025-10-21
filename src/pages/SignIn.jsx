import { Link, useLocation, useNavigate } from 'react-router';
import MyContainer from '../components/MyContainer';
import { useContext, useRef, useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { GithubAuthProvider, GoogleAuthProvider } from 'firebase/auth';

import { AuthContext } from '../context/AuthContext';

const SignIn = () => {
  const [show, setShow] = useState(false);

  //  💥 signin
  //  💥 google
  //  💥 gitHub
  //  💥 signOut
  //  💥  ForgetPassword
  const {
    signInWithEmailAndPasswordFunc,
    signInWithGoogleFunc,
    signInWithGithubFunc,
    sendPasswordResetEmailFunc,
    setUser,
    user,
    setLoading,
  } = useContext(AuthContext);

  // location
  const location = useLocation();
  const from = location.state || '/';
  const navigate = useNavigate();
  console.log(location);

  if (user) {
    navigate('/');
    return;
  }

  // ⚡Forget Password
  const emailRef = useRef(null);

  const handleSignin = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log('signin function', email, password);

    if (password.length < 6) {
      toast.error('Password should be at least 6 digit');
      return;
    }
    //  💥 signin
    // ⚡signIn Email
    // signInWithEmailAndPassword(auth, email, password)
    signInWithEmailAndPasswordFunc(email, password)
      .then((result) => {
        setLoading(false);
        if (!result.user?.emailVerified) {
          toast.error('Your email is not verified');
          return;
        }
        // console.log(result.user);
        setUser(result.user);
        toast.success('Signin successful');
        navigate(from);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // ⚡google signin handle btn
  const handleGoogleSignin = () => {
    signInWithGoogleFunc()
      .then((result) => {
        console.log(result.user);
        setLoading(false);
        setUser(result.user);
        navigate(from);
        toast.success('Signin successful');
      })
      .catch((error) => {
        toast.error(error.message);
      });
    // console.log('google signin');
  };
  // ⚡ handleGitHub
  const handleGitHub = () => {
    // console.log('click me github');
    signInWithGithubFunc()
      .then((result) => {
        const user = result.user;
        setLoading(false);
        setUser(user);
        navigate(from);
        toast.success('Signin GitHub successful');
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  // ⚡handleForgetPassword
  const handleForgetPassword = (e) => {
    // console.log(emailRef.current.value);
    const email = emailRef.current.value;
    // console.log('click forget password');
    sendPasswordResetEmailFunc(email)
      .then(() => {
        setLoading(false);
        toast.success('Check your email to reset password');
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="min-h-[calc(100vh-20px)] flex items-center justify-center bg-gradient-to-br from-blue-500 via-indigo-600 to-purple-600 relative overflow-hidden">
      {/* Animated glow orbs */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-blue-400/30 rounded-full blur-xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          {/* Left section */}
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Welcome Back
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Sign in to continue your journey. Manage your account, explore new
              features, and more.
            </p>
          </div>

          {/* Login card */}
          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <form onSubmit={handleSignin} className="space-y-5">
              <h2 className="text-2xl font-semibold mb-2 text-center text-white">
                Sign In
              </h2>

              <div>
                <label className="block text-sm mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  ref={emailRef}
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
              </div>

              <div className="relative">
                <label className="block text-sm font-medium mb-1">
                  Password
                </label>
                <input
                  type={show ? 'text' : 'password'}
                  name="password"
                  placeholder="Password"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
                <span
                  onClick={() => setShow(!show)}
                  className="absolute right-4 bottom-3 cursor-pointer z-50"
                >
                  {show ? <FaEye /> : <FaEyeSlash />}
                </span>
              </div>
              {/* forget password */}
              <button
                type="button"
                onClick={handleForgetPassword}
                className="hover:underline cursor-pointer"
              >
                Forget password?
              </button>
              {/* login btn */}
              <button type="submit" className="my-btn">
                Login
              </button>

              {/* Divider */}
              <div className="flex items-center justify-center gap-2 my-2">
                <div className="h-px w-16 bg-white/30"></div>
                <span className="text-sm text-white/70">or</span>
                <div className="h-px w-16 bg-white/30"></div>
              </div>

              {/* ⚡ Google Signin */}
              <button
                type="button"
                onClick={handleGoogleSignin}
                className="flex items-center justify-center gap-3 bg-white text-gray-800 px-5 py-2 rounded-lg w-full font-semibold hover:bg-gray-100 transition-colors cursor-pointer"
              >
                <img
                  src="https://www.svgrepo.com/show/475656/google-color.svg"
                  alt="google"
                  className="w-5 h-5"
                />
                Continue with Google
              </button>

              {/* GitHub */}
              <button
                type="button"
                onClick={handleGitHub}
                className="btn bg-black text-white border-black w-full"
              >
                <svg
                  aria-label="GitHub logo"
                  width="16"
                  height="16"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="white"
                    d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z"
                  ></path>
                </svg>
                Login with GitHub
              </button>

              <p className="text-center text-sm text-white/80 mt-3">
                Don’t have an account?{' '}
                <Link
                  to="/signup"
                  className="text-pink-300 hover:text-white underline"
                >
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignIn;
