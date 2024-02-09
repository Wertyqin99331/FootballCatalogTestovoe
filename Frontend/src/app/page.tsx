import { TeamSelect } from '@/components/TeamSelect';
import { AddFootballerForm } from '@/components/AddFootballerForm';
import { AddTeamForm } from '@/components/AddTeamForm';

const HomePage = () => {
  return (
    <div className='flex flex-col items-center gap-y-5 px-3 py-10'>
      <AddFootballerForm/>
      <AddTeamForm/>
    </div>
  );
};

export default HomePage;