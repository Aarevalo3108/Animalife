import React from 'react';
import AdminPanel from '../components/AdminPanel';
import Navbar from '../components/Navbar';

function Admin() {
  return (
      <div className='w-full relative bg-linen-200 overflow-hidden flex flex-col items-start justify-start gap-[91px] leading-[normal] tracking-[normal] mq450:gap-[23px] mq750:gap-[45px]'>
        <Navbar />
      <h1>Admin Panel</h1>
      <AdminPanel />
    </div>
  );
}

export default Admin;