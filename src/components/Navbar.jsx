import { Link, NavLink } from 'react-router';
import logo from '../assets/img/firebase-logo.png';
import MyContainer from './MyContainer';
import MyLink from './MyLink';
import { use } from 'react';
import { AuthContext } from '../context/AuthContext';
import { toast } from 'react-toastify';
import { CircleLoader } from 'react-spinners';

const Navbar = () => {
  // const result = use(AuthContext);
  // console.log(result);
  const { user, signOutFunc, setUser, loading } = use(AuthContext);
  console.log(loading);

  // ⚡ handleSignout
  const handleSignout = () => {
    signOutFunc()
      .then(() => {
        toast.success('Sign-out successful!');
        setUser(null);
      })
      .catch((e) => {
        toast.error(e.message);
      });
  };

  return (
    <div className="bg-slate-100f py-2 border-b border-b-slate-300 ">
      <MyContainer className="flex items-center justify-between">
        <figure>
          <img src={logo} className="w-[55px]" />
        </figure>
        <ul className="flex items-center gap-4">
          <li>
            <MyLink to={'/'}>Home</MyLink>
          </li>
          <li>
            <MyLink to={'/aboutUs'}>AboutUS</MyLink>
          </li>
          {user && (
            <li>
              <MyLink to={'/profile'}>Profile</MyLink>
            </li>
          )}
        </ul>
        {loading ? (
          <CircleLoader />
        ) : user ? (
          <div className="text-center space-y-3 relative">
            {/* dropdown */}

            <button
              className=" border rounded-full cursor-pointer"
              popoverTarget="popover-1"
              style={{ anchorName: '--anchor-1' } /* as React.CSSProperties */}
            >
              <img
                src={user?.photoURL || 'https://via.placeholder.com/88'}
                className="h-14 w-14 rounded-full mx-auto"
                alt=""
              />
            </button>

            <ul
              className="dropdown menu w-52 rounded-box bg-base-100 shadow-sm absolute -left-16 top-5 px-3 "
              popover="auto"
              id="popover-1"
              style={
                { positionAnchor: '--anchor-1' } /* as React.CSSProperties */
              }
            >
              <div>
                <h2 className="text-xl font-semibold">{user?.displayName}</h2>
                <p className="text-black/80 mb-2">{user?.email}</p>
              </div>
              <button onClick={handleSignout} className="my-btn">
                Sign Out
              </button>
            </ul>
          </div>
        ) : (
          <button className="bg-purple-500 text-white px-4 py-2 rounded-md font-semibold cursor-pointer">
            <Link to={'/signin'}>Sign in</Link>
          </button>
        )}
      </MyContainer>
    </div>
  );
};

export default Navbar;
