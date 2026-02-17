import { useState } from 'react'
import { supabase } from '../pages/services/supabase'

const SearchArticles = ({ setArticles, setLoading }) => {
  const [query, setQuery] = useState("")

  const searchArticles = async (searchText) => {
    const { data, error } = await supabase
      .from("articles")
      .select("*")
      .ilike("title", `%${searchText}%`)
      .limit(5)

    if (error) {
      console.error(error.message)
      return []
    }

    return data
  }

  const searchQueryHandler = async (e) => {
    e.preventDefault()

    if (query.length > 1) {
      setLoading(true)

      const data = await searchArticles(query)

      setArticles(data)
      setLoading(false)
    }else{
        window.location.reload();
    }
  }

  return (
    <form onSubmit={searchQueryHandler} className="mb-6 -mt-4 flex  rounded-lg bg-white">
      <input
        type="text"
        placeholder="Search articles title here..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full outline-none p-2 shadow"
      />
      <button type='submit' className='px-3 cursor-pointer shadow'>Search</button>
    </form>
  )
}

export default SearchArticles
