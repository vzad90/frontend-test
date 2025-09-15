import type { Movie } from '../utils/global.types'

export interface ModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
}

export interface DeleteConfirmModalProps {
  isOpen: boolean
  onClose: () => void
  onConfirm: () => void
}

export interface UsernameModalProps {
  isOpen: boolean
  onClose: () => void
  onSubmit: (username: string) => void
  initialUsername?: string
}

export interface EditCreateMovieModalProps {
  isOpen: boolean
  onClose: () => void
  movie: Movie | null
  existingMovies: Movie[]
  onSave: (movie: Movie) => void
}

export interface HomeHeaderProps {
  query: string
  setQuery: (q: string) => void
  showFavorites: boolean
  onToggleFavorites: () => void
  onCreate: () => void
  username: string
  onChangeUser: () => void
}

export interface SearchBarProps {
  query: string
  setQuery: (q: string) => void
}

export interface ActionsSectionProps {
  showFavorites: boolean
  onToggleFavorites: () => void
  onCreate: () => void
  username: string
  onChangeUser: () => void
}

export interface MovieDetailsHeaderProps {
  title: string
  rated?: string
  year?: string
  runtime?: string
  genre?: string
}

export interface MoviesGridProps {
  movies: Movie[] | undefined
  onToggleFavorite: (movie: Movie, forcedUsername?: string) => void
  onEdit: (movie: Movie) => void
  onDelete: (movie: Movie) => void
}

export interface InfoItemData {
  label: string
  value?: string | number | null
}

export interface MovieCardProps {
  movie: Movie
  onToggleFavorite: () => void
  onEdit?: () => void
  onDelete?: () => void
}

export interface HomePageLayoutProps {
  query: string
  setQuery: (newQuery: string) => void
  showFavorites: boolean
  toggleFavorites: () => void
  onCreate: () => void
  username: string
  onChangeUser: () => void
  movies: Movie[]
  onToggleFavorite: (movie: Movie, forcedUsername?: string) => void
  onEdit: (movie: Movie) => void
  onDelete: (movie: Movie) => void
  loading?: boolean
  error?: string | null
}

export interface ModalsContainerProps {
  movies: Movie[]
  onSave: (movie: Movie) => Promise<void>
  onDeleteConfirm: (movie: Movie) => Promise<void>
  onUsernameSubmit: (name: string) => void
  username?: string
  editingMovie: Movie | null
  deletingMovie: Movie | null
  modalOpen: boolean
  usernameModalOpen: boolean
  closeModal: () => void
  closeDeleteModal: () => void
  closeUsernameModal: () => void
}
