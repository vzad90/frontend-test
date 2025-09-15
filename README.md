# Movie Search App

Web application for searching and managing movies with the ability to add to favorites.

## Getting Started

```bash
# Install dependencies
npm i

# Run in development mode
npm run dev
```

## Features

- **Movie Search**: Uses API to search movies by title
- **Favorites Management**: Ability to add/remove movies from favorites
- **User Profile**: Save favorite movies for specific users
- **Movie Editing**: Ability to edit movie information
- **Modern UI**: Responsive design

## Important Note

On first app launch, movie search is performed using a predefined array of movie titles, as the API doesn't allow fetching all movies at once. After entering a search query, an API request is made to get relevant results.

## Technologies

- React 19
- TypeScript
- Redux Toolkit
- Styled Components
- React Router
- React Hook Form
- Axios
- PostgreSQL
- Vitest (testing)

## Available Commands

```bash
npm run dev      # Run in development mode
npm run test     # Run tests
npm run lint     # Code linting
```