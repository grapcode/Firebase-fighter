import { Link, useNavigate } from 'react-router';

import { FaEye, FaEyeSlash } from 'react-icons/fa';

import MyContainer from '../components/MyContainer';

import { toast } from 'react-toastify';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';

const SignUp = () => {
  const [show, setShow] = useState(false);

  // 💥 Auth Provider
  const {
    createUserWithEmailAndPasswordFunc,
    updateProfileFunc,
    sendEmailVerificationFunc,
    setLoading,
    signOutFunc,
    setUser,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  // ⚡form submit handle
  const handleSignup = (e) => {
    e.preventDefault();

    const displayName = e.target.name.value;
    const photoURL = e.target.photo.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    // console.log('signup function', { displayName, photoURL, email, password });

    if (password.length < 6) {
      toast.error('Password should be at least 6 digit');
      return;
    }
    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must be at least 8 characters long and include uppercase, lowercase, number, and special character.'
      );
      return;
    }

    //⚡ 1st step: create user
    // createUserWithEmailAndPassword(auth, email, password)
    createUserWithEmailAndPasswordFunc(email, password)
      // 1st step:  email password
      .then((result) => {
        // 2nd step:  update Profile
        updateProfileFunc(displayName, photoURL)
          .then(() => {
            console.log(result.user);
            // 3rd step: email verification
            sendEmailVerificationFunc()
              .then((result) => {
                console.log(result);
                setLoading(false);

                // Signout user
                signOutFunc().then(() => {
                  toast.success(
                    'Signup successful. Check your email to validate your account'
                  );
                  setUser(null);
                  navigate('/signin');
                });
              })
              .catch((error) => {
                toast.error(error.message);
              });
          })
          .catch((error) => {
            toast.error(error.message);
          });
      })
      .catch((error) => {
        // console.log(error.message);
        console.log(error.code);
        if (error.code == 'auth/email-already-in-use') {
          toast.error('User already exist in data');
        } else {
          toast.error(error.message);
        }
      });
  };

  return (
    <div className="min-h-[96vh] flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-600 to-pink-500 relative overflow-hidden">
      {/* Animated floating circles */}
      <div className="absolute inset-0">
        <div className="absolute w-72 h-72 bg-pink-400/30 rounded-full blur-2xl top-10 left-10 animate-pulse"></div>
        <div className="absolute w-72 h-72 bg-purple-400/30 rounded-full blur-2xl bottom-10 right-10 animate-pulse"></div>
      </div>

      <MyContainer>
        <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-10 p-6 lg:p-10 text-white">
          <div className="max-w-lg text-center lg:text-left">
            <h1 className="text-5xl font-extrabold drop-shadow-lg">
              Create Your Account
            </h1>
            <p className="mt-4 text-lg text-white/80 leading-relaxed">
              Join our community and unlock exclusive features. Your journey
              begins here!
            </p>
          </div>

          <div className="w-full max-w-md backdrop-blur-lg bg-white/10 border border-white/20 shadow-2xl rounded-2xl p-8">
            <h2 className="text-2xl font-semibold mb-6 text-center text-white">
              Sign Up
            </h2>

            <form onSubmit={handleSignup} className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium mb-1">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              {/* Photo URL */}
              <div>
                <label className="block text-sm font-medium mb-1">Photo</label>
                <input
                  type="text"
                  name="photo"
                  placeholder="Your photo URL"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>
              {/* email */}
              <div>
                <label className="block text-sm font-medium mb-1">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="example@email.com"
                  className="input input-bordered w-full bg-white/20 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-pink-400"
                />
              </div>

              {/* password */}
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

              <button type="submit" className="my-btn">
                Sign Up
              </button>

              <div className="text-center mt-3">
                <p className="text-sm text-white/80">
                  Already have an account?{' '}
                  <Link
                    to="/signin"
                    className="text-pink-300 hover:text-white font-medium underline"
                  >
                    Sign in
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </MyContainer>
    </div>
  );
};

export default SignUp;
