'use client'

import { PropsWithChildren } from 'react';
import { useFormStatus } from 'react-dom'

type SubmitButtonProps = {
  className?: string
  pendingText?: string
}

const SubmitButton = ({ children, className, pendingText }: PropsWithChildren<SubmitButtonProps>) => {
  const { pending } = useFormStatus()

  return (
    <button
      className={ `${ className || '' } text-white px-5 py-3 bg-blue-400 rounded-xl hover:bg-blue-700 transition-colors ${ pending && 'disabled opacity-35' }` }
      type='submit'>
      { !pending && children }
      { pending && (pendingText || 'Идет загрузка...') }
    </button>
  );
};

export { SubmitButton };