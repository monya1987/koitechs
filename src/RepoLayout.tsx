import React from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import { useQueries } from '@tanstack/react-query'
import { GitApiRepo } from './Profile'
type RepoLayoutProps = {
  data: GitApiRepo[]
  user: string
}
type FinalResults = { [key: string]: number }
function getRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}
const RepoLayout: React.FC<RepoLayoutProps> = ({ data, user }) => {
  if (!data || !data.length) return null
  // Api limits
  data.length = 2
  const fetchUserById = async (name: string) => {
    const response = await fetch(
      `${import.meta.env.VITE_API_URL}/repos/${user}/${name}/languages`
    )
    return await response.json()
  }
  const userQueries = useQueries({
    queries: data.map((item) => {
      return {
        queryKey: ['user', item.name],
        queryFn: () => fetchUserById(item.name),
      }
    }),
    combine: (results) => {
      return {
        data: results.map((result) => result.data),
        pending: results.some((result) => result.isPending),
      }
    },
  })
  if (userQueries.pending) return null
  const final: FinalResults = {}
  userQueries.data.forEach((languages) => {
    Object.keys(languages).forEach((lang) => {
      final[lang] = final[lang]
        ? final[lang] + languages[lang]
        : languages[lang]
    })
  })
  const chartData = Object.keys(final).map((item) => {
    return { title: item, value: final[item], color: getRandomColor() }
  })
  return (
    <div>
      <p>Total repos: {data.length} - reduced because of Api requests limits</p>
      <p>languages:</p>
      {Object.keys(final).map((lang) => (
        <p key={lang}>
          {lang}: {final[lang]}
        </p>
      ))}
      <PieChart data={chartData} />
    </div>
  )
}

export default RepoLayout
