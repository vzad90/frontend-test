import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import type { EditCreateMovieModalProps } from '../types/component.types'
import { handleSaveSuccess, validateMovieForm } from '../utils/formHelpers'
import type { Movie } from '../utils/global.types'
import { createMovieFromFormData, getDefaultMovieFormValues } from '../utils/movieHelpers'
import { validationRules } from '../utils/validationHelpers'
import Modal from './Modal'

export default function EditCreateMovieModal({
  isOpen,
  onClose,
  movie,
  existingMovies,
  onSave,
}: EditCreateMovieModalProps) {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setError
  } = useForm<Movie>({
    defaultValues: getDefaultMovieFormValues(movie),
  })

  useEffect(() => {
    reset(getDefaultMovieFormValues(movie))
  }, [movie, reset])

  const onSubmit = (data: Movie) => {
    const validation = validateMovieForm(data, existingMovies, movie?.id, setError)

    if (!validation.isValid) {
      return
    }

    const movieToSave = createMovieFromFormData(data, movie)

    handleSaveSuccess(onSave, onClose, movieToSave, reset)
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className='modal-container'>
        <h2 className='modal-title'>{movie ? 'Edit Movie' : 'Create Movie'}</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className='modal-field'>
            <label>Title</label>
            <input {...register('title', validationRules.title)} />
            {errors.title && <span className='error'>{errors.title.message}</span>}
          </div>

          <div className='modal-field'>
            <label>Year</label>
            <input {...register('year', validationRules.year)} />
            {errors.year && <span className='error'>{errors.year.message}</span>}
          </div>

          <div className='modal-field'>
            <label>Runtime</label>
            <input {...register('runtime', validationRules.runtime)} />
            {errors.runtime && <span className='error'>{errors.runtime.message}</span>}
          </div>

          <div className='modal-field'>
            <label>Genre</label>
            <input {...register('genre', validationRules.genre)} />
            {errors.genre && <span className='error'>{errors.genre.message}</span>}
          </div>

          <div className='modal-field'>
            <label>Director</label>
            <input {...register('director', validationRules.director)} />
            {errors.director && <span className='error'>{errors.director.message}</span>}
          </div>

          <div className='modal-actions'>
            <button type='submit' className='primary'>Save</button>
            <button type='button' className='secondary' onClick={onClose}>Cancel</button>
          </div>
        </form>
      </div>
    </Modal>
  )
}
