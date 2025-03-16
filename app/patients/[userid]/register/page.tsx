import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import RegisterForm from '@/components/ui/Forms/RegisterForm'
import { getUser } from '@/lib/actions/patient.actions'

const Register = async({params: {userId}}:SearchParamProps) => {
    const user = await getUser(userId);
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container">
        <div className="sub-container max-w-[860px] flex-1 flex-col py-10">
        <div className="flex items-center gap-2 mb-12">
          <Image
            src="/assets/icons/logo-icon.svg"
            height={1000}
            width={1000}
            alt='patient-img'
            className='h-10 w-fit'
          />
          <span className="text-2xl font-bold text-white header">KrishCare</span>
        </div>
        
        <RegisterForm user={user} />

       
          <p className='copyright py-12'>
            ©2025 krishcare
          </p>
         
        </div>
      </section>
       <Image
       src='/assets/images/register-img.png'
       height={1000}
       width={1000}
       alt='patient'
       className='side-img max-w-[390px]'

       />
    </div>
  )
}

export default Register
