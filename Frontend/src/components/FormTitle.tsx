import { PropsWithChildren } from 'react';

type FormTitleProps = {
  className?: string
  isMain?: boolean
}

const FormTitle = ({ children, className, isMain }: PropsWithChildren<FormTitleProps>) => {
  return (
    <>
      { isMain && <h1 className={ `text-3xl font-medium ${ className || '' }` }>{ children }</h1> }
      { !isMain && <h2 className={ `text-3xl font-medium ${ className || '' }` }>{ children }</h2> }
    </>
  );
};

export { FormTitle };