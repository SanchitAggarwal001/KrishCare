import PatientForm from '@/components/ui/Forms/PatientForm';
import Image from 'next/image';
import Link from 'next/link';


export default function Home() {
  return (
    <div className="flex h-screen max-h-screen">
      <section className="remove-scrollbar container my-auto">
        <div className="sub-container max-w-[496px]">
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
        <PatientForm />

        <div className='text-14-regular mt-20 flex justify-between'>
          <p className='justify-items-end text-dark-600 xl:text-left'>
            ©2025 krishcare
          </p>
          <Link href='/?admin=true' className='text-green-500'>
            Admin
          </Link>
        </div>
        </div>
      </section>
       <Image
       src='/assets/images/onboarding-img.png'
       height={1000}
       width={1000}
       alt='patient'
       className='side-img max-w-[50%]'

       />
    </div>
  );
}
