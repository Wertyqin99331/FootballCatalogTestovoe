'use client'

import { useQuery } from '@tanstack/react-query';
import { serverUrl } from '@/config/api';

type TeamSelectProps = {
  defaultValue?: string
}

const TeamSelect = ({ defaultValue }: TeamSelectProps) => {
  const { data, isLoading, isError } = useQuery<{ teamsList: string[] }>({
    queryKey: ['teams'],
    queryFn: async () => {
      const res = await fetch(`${ serverUrl }/teams`)
      return res.json()
    }
  })

  return (
    <div>
      <select className='px-2 py-1 border-black border-[1px] rounded-md flex-1 disabled:opacity-30 w-full' id='team'
              name='team' required defaultValue=''>
        <option disabled value=''>Команда не выбрана</option>
        { data && data.teamsList.map(team => {
          return <option value={ team } key={ team } selected={ team === defaultValue }>{ team }</option>
        }) }
      </select>
      { isLoading && <p>Идет загрузка команд</p> }
      { isError && <p>Команды не были загружены</p> }
    </div>

  );
};

export { TeamSelect };