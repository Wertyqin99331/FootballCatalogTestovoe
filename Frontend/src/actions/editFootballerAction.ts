'use server'

import { IFootballer } from '@/types/IFootballer';
import { serverUrl } from '@/config/api';
import { IErrorResponse } from '@/types/IErrorResponse';
import { revalidatePath, revalidateTag } from 'next/cache';

export type IEditFootballerDto = Omit<IFootballer, 'birthDate'> & {
  birthDate: string
}

export const editFootballerAction = async (footballer: IEditFootballerDto): Promise<IErrorResponse> => {
  const response = await fetch(`${ serverUrl }/footballers/${ footballer.footballerId }`, {
    method: 'PUT',
    body: JSON.stringify(footballer),
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    }
  })

  if (!response.ok) {
    const result = await response.json() as IErrorResponse
    return {
      error: result.error || 'Что-то пошло не так'
    }
  } else {
    revalidateTag('footballers')
    return {
      error: undefined
    }
  }
}