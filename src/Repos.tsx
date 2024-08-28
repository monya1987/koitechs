import React from 'react'
import './App.css'
import { GitApiRepo } from './Profile'
type ProfileProps = {
  data: GitApiRepo[]
}

const Repos: React.FC<ProfileProps> = ({ data }) => {
  if (!data || !data.length) return null
  // @ts-ignore
  const sortedArr = data.toSorted((a, b) => a.updated_at - b.updated_at)
  return (
    <div>
      Recently edited:
      {sortedArr.map((item: GitApiRepo) => (
        <div key={item.name}>
          <a
            target={'_blank'}
            href={item.html_url}
            rel='noreferrer'
          >
            {item.name}
          </a>
        </div>
      ))}
      <br />
    </div>
  )
}

export default Repos
