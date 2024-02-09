import { FormHTMLAttributes, forwardRef, PropsWithChildren } from 'react';

type BaseFormProps = {
  className?: string
} | FormHTMLAttributes<HTMLFormElement>

const BaseForm = forwardRef<HTMLFormElement, PropsWithChildren<BaseFormProps>>(function ({
                                                                                           className,
                                                                                           children,
                                                                                           ...props
                                                                                         }, ref) {
  return (
    <form className={ `p-5 border-[1px] border-black rounded-xl w-full max-w-[750px] self-center ${ className || '' }` }
          { ...props } ref={ ref }>
      { children }
    </form>
  );
})

export { BaseForm };