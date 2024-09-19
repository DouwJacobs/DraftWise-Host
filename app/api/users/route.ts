import { retrieveCustomerByEmail } from '@/utils/supabase/admin'
import type { NextRequest } from 'next/server'
import { NextResponse } from 'next/server'

export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const email = searchParams.get('email')

  if (email) {
    const supabaseCustomer = await retrieveCustomerByEmail({ email })

    if (supabaseCustomer.length > 1) {
      return NextResponse.json(
        { customer: supabaseCustomer[0] },
        { status: 200 }
      )
    } else {
      return NextResponse.json({ message: 'User not found' }, { status: 404 })
    }
  } else {
    return NextResponse.json(
      { message: 'Invalid email address' },
      { status: 400 }
    )
  }
}
