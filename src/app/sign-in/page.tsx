import Link from 'next/link';
import GitHubSignButton from '../components/github-sign-button';
import AuthenticationButton from '../components/auth-btn';

function SignIn() {
  return (
    <>
      <div className='grid w-full gap-4 max-w-xs'>
        <form
          action='/auth/login'
          method='post'
          className='flex flex-col space-y-2 place'
        >
          <label htmlFor='email'>Email</label>
          <input
            className='p-2 rounded-md w-full text-black'
            required
            name='email'
          />
          <label htmlFor='password'>Password</label>
          <input
            className='p-2 rounded-md w-full text-black'
            required
            type='password'
            name='password'
          />
          <div className='grid gap-2 mt-2'>
            <AuthenticationButton />
          </div>
        </form>
        <GitHubSignButton />
        <Link className='hover:underline text-sm text-center' href='/sign-up'>
          Dont have an account?
        </Link>
      </div>
    </>
  );
}
export default SignIn;
