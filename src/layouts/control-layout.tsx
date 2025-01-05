import { cn, oncloseApp } from '@/lib/utils';
import { UserButton } from '@clerk/clerk-react';
import { X } from 'lucide-react';
import * as React from 'react';
import {useState} from 'react';
type Props={
    children: React.ReactNode;
    className?: string;
}

const ControlLayout=({children,className}:Props)=>{
  const [isVisible,setIsVisible]=useState<boolean>(false);

  window.ipcRenderer.on('hide-plugin', (event, payload) => {
    console.log(event);
    setIsVisible(payload.state)
  })

  return (
    <div className={cn(className,isVisible && 'invisible',
      'bg-[#171717] flex px-1 flex-col rounded-3xl overflow-hidden h-screen'
    )}>
     <div className='flex justify-between items-center  p-5 draggable'>
      <span className='non-draggable'>
      <UserButton/>
      <X
      size={20}
      className='text-gray-400 non-draggable
       hover:text-white
        cursor-pointer'
        onClick={oncloseApp}/>
      </span>
     </div>
     <div className='flex-1 h-8 overflow-auto'>
      <div className='p-5 flex w-full '>
        <div>
          <img src='./opal-logo.svg' alt='logo'/>
          <p className='text-white text-2xl'>
            Opal
          </p>
          {children}
        </div>
      </div>
     </div>
    </div>
  );
}
export default ControlLayout;