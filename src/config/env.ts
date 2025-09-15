export const config = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'https://backend-ix5u.onrender.com',
  
  get API_URL() {
    return this.API_BASE_URL
  },
  
  get USER_MOVIES_URL() {
    return `${this.API_URL}/api/user-movies`
  },
  
  get SEARCH_URL() {
    return `${this.API_URL}/api/search`
  },
  
  get MOVIE_URL() {
    return `${this.API_URL}/api/movie`
  }
}

const requiredEnvVars = [
  'VITE_API_BASE_URL'
]

const missingEnvVars = requiredEnvVars.filter(
  envVar => !import.meta.env[envVar]
)

if (missingEnvVars.length > 0) {
  console.warn(
    `Missing environment variables: ${missingEnvVars.join(', ')}. Using default values.`
  )
}
