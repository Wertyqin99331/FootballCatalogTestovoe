import { TeamSelect } from '@/components/TeamSelect';
import { countries } from '@/consts/countries';
import { SubmitButton } from '@/components/SubmitButton';
import React, { forwardRef, PropsWithChildren } from 'react';
import { IFootballer } from '@/types/IFootballer';

type UpdateFootballerFormProps = {
  selectedFootballer: IFootballer | null
  action: (formData: FormData) => Promise<void>
}

const UpdateFootballerForm = forwardRef<HTMLFormElement, UpdateFootballerFormProps>(function ({
                                                                                                selectedFootballer,
                                                                                                action
                                                                                              }, ref) {
  return (
    <form className='mt-10' action={ action } ref={ ref }>
      <div className='grid grid-cols-[1fr_3fr] mt-5 gap-y-5'>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='name'>Имя</label>
        <input className='px-2 py-1 border-black border-[1px] rounded-md flex-1' id='name' type='text' name='name'
               required defaultValue={ selectedFootballer?.name }/>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='surname'>Фамилия</label>
        <input className='px-2 py-1 border-black border-[1px] rounded-md flex-1' id='surname' type='text'
               name='surname' required defaultValue={ selectedFootballer?.surname }/>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='gender'>Пол</label>
        <select className='px-2 py-1 border-black border-[1px] rounded-md' id='gender' name='gender' required>
          <option value='Male' selected={ selectedFootballer?.gender === 'Male' }>Мужской</option>
          <option value='Female' selected={ selectedFootballer?.gender === 'Female' }>Женский</option>
        </select>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='birthdate'>Дата рождения</label>
        <input className='px-2 py-1 border-black border-[1px] rounded-md flex-1' id='birthdate' type='date'
               name='birthdate' required defaultValue={ selectedFootballer?.birthDate.toString() }/>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='team'>Команда</label>
        <TeamSelect defaultValue={ selectedFootballer?.teamName }/>

        <label className='text-lg cursor-pointer justify-self-start ml-2' htmlFor='country'>Страна</label>
        <select className='px-2 py-1 border-black border-[1px] rounded-md' id='country' name='country' required>
          { countries.map(country => {
            return <option value={ country } key={ country }
                           selected={ selectedFootballer?.country === country }>{ country }</option>
          }) }
        </select>

      </div>

      <SubmitButton className='mt-5' pendingText='Сохранение изменений...'>Сохранить изменения</SubmitButton>
    </form>
  );
})

export { UpdateFootballerForm };