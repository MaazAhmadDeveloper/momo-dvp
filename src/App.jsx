import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/auth/Login'
import Register from './pages/auth/Register'
import { supabase } from './pages/services/supabase'
import ProtectedRoute from './components/ProtectedRoute'
import CreateArticle from './pages/CreateArticle'
import ArticleDetails from './pages/ArticleDetails'

function App() {
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
      setLoading(false)
    })

    const { data: listener } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        setSession(session)
      }
    )

    return () => {
      listener.subscription.unsubscribe()
    }
  }, [])

  if (loading) return null


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home session={session} />} />
        <Route path="/articles/:id" element={<ArticleDetails session={session} />} />

        {!session && (
          <>
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
          </>
        )}

        {session && (
          <>
            <Route path="/login" element={<Navigate to="/" />} />
            <Route path="/register" element={<Navigate to="/" />} />
          </>
        )}

        <Route
          path="/create-article"
          element={
            <ProtectedRoute>
              <CreateArticle session={session} />
            </ProtectedRoute>
          }
        />

      </Routes>
    </BrowserRouter>
  )
}

export default App
