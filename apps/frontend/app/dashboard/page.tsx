"use client"

import { useRouter } from 'next/navigation'
import Dashboard from '../components/Dashboard'

const Page = () => {
  const router=useRouter()
  const token = localStorage.getItem("token")
  if(!token){
    return router.push('/signin')
  }

  return (
    <div>
      {token ? <Dashboard/> : <div>Please log in</div>}
    </div>
  );
};

export default Page;
