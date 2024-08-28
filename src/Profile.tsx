import React from 'react'
import RepoLayout from './RepoLayout'
import Repos from './Repos'
import './App.css'
import Spinner from './Spinner'

type GitApiUser = {
  status?: string
  login: string
  name: string | null
  id: number
  public_repos: number
  created_at: string
  updated_at: string
}
export type GitApiRepo = {
  name: string
  updated_at: string
  html_url: string
}

import { useQuery } from '@tanstack/react-query'

type ProfileProps = {
  queryName: string
}

const Profile: React.FC<ProfileProps> = ({ queryName }) => {
  // Queries run in parallel
  const { isPending, error, data } = useQuery({
    queryKey: ['userData'],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${queryName}`
      )
      const data: GitApiUser = await response.json()
      return data
    },
  })
  const reposQuery = useQuery({
    queryKey: ['repoData'],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${queryName}/repos`
      )
      const data: GitApiRepo[] = await response.json()
      return data
    },
  })

  if (isPending) return <Spinner />

  if (error) return 'An error has occurred: ' + error.message

  const createdDate = new Date(data.created_at).toISOString().split('T')[0]

  return (
    <div className={'row ProfileWrapper'}>
      <div className={'col-lg-6 col-md-8 mx-auto'}>
        {data.status && data.status === '404' ? (
          <div>User not founded</div>
        ) : (
          <>
            <h1>Profile {data.name || data.login}</h1>
            <p>id: {data.id}</p>
            <p>cnt repos: {data.public_repos}</p>
            <p>member since: {createdDate}</p>

            {!reposQuery.isPending && reposQuery.data && (
              <Repos data={reposQuery.data} />
            )}

            {!isPending && reposQuery.data && (
              <RepoLayout
                user={queryName}
                data={reposQuery.data}
              />
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Profile
