'use client'

import Link from 'next/link';
import { usePathname } from 'next/navigation';

const navLinks: { name: string, href: string }[] = [
  { name: 'Добавить футболиста', href: '/' },
  { name: 'Список всех футболистов', href: '/footballers' }
]

const Header = () => {
  const pathName = usePathname()

  return (
    <header className='flex px-5 py-5 gap-5 bg-blue-500'>
      { navLinks.map(link => {
        const isActive = pathName === link.href
        return (
          <Link className={ `text-lg font-medium ${ isActive ? 'text-green-400' : 'text-white' }` }
                href={ link.href } key={ link.href }> { link.name }</Link>
        )
      }) }
    </header>
  );
};

export { Header };