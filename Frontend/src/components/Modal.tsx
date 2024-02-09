import React, { PropsWithChildren, SetStateAction } from 'react';
import { X } from 'react-feather';

type ModalProps = {
  open: boolean,
  onClose: () => void
}

export default function Modal({ open, onClose, children }: PropsWithChildren<ModalProps>) {
  return (
    <div
      onClick={ onClose }
      className={ `
        fixed inset-0 flex justify-center items-center transition-colors p-5
        ${ open ? 'visible bg-black/20' : 'invisible' }
      ` }
    >
      <div
        onClick={ (e) => e.stopPropagation() }
        className={ `
          bg-white rounded-xl shadow p-7 transition-all flex-1 max-w-[600px]
          ${ open ? 'scale-100 opacity-100' : 'scale-125 opacity-0' }
        ` }
      >
        <button
          onClick={ onClose }
          className='absolute top-2 right-2 p-1 rounded-lg text-gray-400 bg-white hover:bg-gray-50 hover:text-gray-600'
        >
          <X/>
        </button>
        { children }
      </div>
    </div>
  )
}