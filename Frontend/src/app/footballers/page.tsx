import { serverUrl } from '@/config/api';
import { IFootballer } from '@/types/IFootballer';
import { FootballersList } from '@/components/FootballersList';

const FootballersPage = async () => {
  const response = await fetch(`${ serverUrl }/footballers`, { next: { tags: ['footballers'] } })
  if (!response.ok)
    return <h1 className='mt-3 mx-3 text-3xl font-medium'>Что-то пошло не так :(</h1>

  const result = await response.json() as { footballers: IFootballer[] }

  return (
    <FootballersList footballers={ result.footballers }/>
  );
};

export default FootballersPage;