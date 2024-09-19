import EmailSignIn from '@/components/ui/AuthForms/EmailSignIn'
import ForgotPassword from '@/components/ui/AuthForms/ForgotPassword'
import OauthSignIn from '@/components/ui/AuthForms/OauthSignIn'
import PasswordSignIn from '@/components/ui/AuthForms/PasswordSignIn'
import Separator from '@/components/ui/AuthForms/Separator'
import SignUp from '@/components/ui/AuthForms/Signup'
import UpdatePassword from '@/components/ui/AuthForms/UpdatePassword'
import Card from '@/components/ui/Card'
import {
  getAuthTypes,
  getDefaultSignInView,
  getRedirectMethod,
  getViewTypes,
} from '@/utils/auth-helpers/settings'
import { createClient } from '@/utils/supabase/server'
import { cookies } from 'next/headers'
import Image from 'next/image'
import { redirect } from 'next/navigation'
import topogrophy from 'public/topography-invert.svg'

export default async function SignIn({
  params,
  searchParams,
}: {
  params: { id: string }
  searchParams: { disable_button: boolean }
}) {
  const { allowOauth, allowEmail, allowPassword } = getAuthTypes()
  const viewTypes = getViewTypes()
  const redirectMethod = getRedirectMethod()

  // Declare 'viewProp' and initialize with the default value
  let viewProp: string

  // Assign url id to 'viewProp' if it's a valid string and ViewTypes includes it
  if (typeof params.id === 'string' && viewTypes.includes(params.id)) {
    viewProp = params.id
  } else {
    const preferredSignInView =
      cookies().get('preferredSignInView')?.value || null
    viewProp = getDefaultSignInView(preferredSignInView)
    return redirect(`/signin/${viewProp}`)
  }

  // Check if the user is already logged in and redirect to the account page if so
  const supabase = createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (user && viewProp !== 'update_password') {
    return redirect('/')
  } else if (!user && viewProp === 'update_password') {
    return redirect('/signin')
  }

  return (
    <div className="relative min-h-screen flex justify-center height-screen-helper">
      <div className="absolute inset-0 overflow-hidden z-0">
        <Image
          priority
          src={topogrophy}
          alt="background topography image"
          className="absolute inset-0 w-full h-full object-cover"
          layout="fill" // This makes the image cover the parent div
          objectFit="cover" // Ensures the image covers the area
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent pointer-events-none" />
        <div className="absolute inset-0 bg-gradient-to-b from-black to-transparent pointer-events-none" />
      </div>

      <div className="flex flex-col justify-between max-w-lg p-3 m-auto w-80 z-10">
        <Card
          title={
            viewProp === 'forgot_password'
              ? 'Reset Password'
              : viewProp === 'update_password'
                ? 'Update Password'
                : viewProp === 'signup'
                  ? 'Sign Up'
                  : 'Sign In'
          }
        >
          {viewProp === 'password_signin' && (
            <PasswordSignIn
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
            />
          )}
          {viewProp === 'email_signin' && (
            <EmailSignIn
              allowPassword={allowPassword}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === 'forgot_password' && (
            <ForgotPassword
              allowEmail={allowEmail}
              redirectMethod={redirectMethod}
              disableButton={searchParams.disable_button}
            />
          )}
          {viewProp === 'update_password' && (
            <UpdatePassword redirectMethod={redirectMethod} />
          )}
          {viewProp === 'signup' && (
            <SignUp allowEmail={allowEmail} redirectMethod={redirectMethod} />
          )}
          {viewProp !== 'update_password' &&
            viewProp !== 'signup' &&
            allowOauth && (
              <>
                <Separator text="Third-party sign-in" />
                <OauthSignIn />
              </>
            )}
        </Card>
      </div>
    </div>
  )
}
