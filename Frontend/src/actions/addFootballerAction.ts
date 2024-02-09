'use server'

import { serverUrl } from '@/config/api';
import { IErrorResponse } from '@/types/IErrorResponse';
import { revalidateTag } from 'next/cache';

export const addFootballerAction = async ({
                                            name,
                                            surname,
                                            gender,
                                            birthdate,
                                            team,
                                            country
                                          }: IFootballerDto): Promise<IErrorResponse> => {
  const response = await fetch(`${ serverUrl }/footballers`, {
    method: 'POST',
    body: JSON.stringify(
      {
        name,
        surname,
        gender,
        birthDate: birthdate,
        teamName: team,
        country
      }
    ),
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
  }

  revalidateTag('footballers')
  return {
    error: undefined
  }
}

interface IFootballerDto {
  name: string
  surname: string
  gender: 'Male' | 'Female'
  birthdate: string
  team: string
  country: string
}