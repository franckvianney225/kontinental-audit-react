import { useEffect, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '../ui/button'
import { Pencil, Trash2, Plus, Search, Tag, Calendar, ChevronLeft, ChevronRight } from 'lucide-react'
import { CategoryForm } from './CategoryForm'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '../ui/alert-dialog'

interface Category {
  id: number
  titre: string
  description: string | null
  created_at: string
}

const ITEMS_PER_PAGE = 15;

export function CategoriesManager() {
  const [categories, setCategories] = useState<Category[]>([])
  const [loading, setLoading] = useState(false)
  const [showCategoryForm, setShowCategoryForm] = useState(false)
  const [editingCategory, setEditingCategory] = useState<Category | null>(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)
  const [categoryToDelete, setCategoryToDelete] = useState<number | null>(null)

  const fetchCategories = async () => {
    setLoading(true)
    try {
      console.log('Tentative de récupération des catégories...')

      // Test simple de connexion à Supabase
      const testConnection = await supabase.rpc('version')
      console.log('Test de connexion Supabase:', testConnection)

      const { data, error, count } = await supabase
        .from('category')
        .select('*', { count: 'exact' })
        .order('titre', { ascending: true })

      if (error) {
        console.error('Erreur Supabase:', {
          message: error.message,
          details: error.details,
          code: error.code,
          hint: error.hint
        })
        
        // Vérifier si l'erreur vient des permissions
        if (error.code === '42501') {
          console.error('Erreur de permissions - Vérifiez les RLS dans Supabase')
        }
        return
      }
      
      console.log(`Résultats de la requête: ${count} catégories trouvées`)
      console.log('Données brutes:', data)
      
      if (!data || data.length === 0) {
        console.warn('La requête a réussi mais aucune catégorie trouvée')
        return
      }
      
      setCategories(data)
    } catch (error) {
      console.error('Erreur lors de la récupération des catégories:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCategories()
  }, [])

  const handleDelete = async (id: number) => {
    try {
      const { error } = await supabase
        .from('category')
        .delete()
        .eq('id', id)

      if (error) throw error
      setCategories(categories.filter(c => c.id !== id))
      setShowDeleteDialog(false)
    } catch (error) {
      console.error('Error deleting category:', error)
    }
  }

  // Filtrage et pagination
  const filteredCategories = categories.filter(category =>
    category.titre.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (category.description && category.description.toLowerCase().includes(searchTerm.toLowerCase()))
  )

  const totalPages = Math.ceil(filteredCategories.length / ITEMS_PER_PAGE)
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE
  const paginatedCategories = filteredCategories.slice(startIndex, startIndex + ITEMS_PER_PAGE)

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-indigo-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      <div className="w-full px-6 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
            <div className="space-y-2">
              <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 dark:from-white dark:to-gray-300 bg-clip-text text-transparent">
                Gestion des catégories
              </h1>
              <p className="text-lg text-gray-600 dark:text-gray-300 font-medium">
                Organisez et gérez vos catégories en toute simplicité
              </p>
              <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mr-2"></div>
                  {categories.length} catégories au total
                </span>
                <span className="flex items-center">
                  <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
                  {filteredCategories.length} résultats
                </span>
              </div>
            </div>
            <button 
              onClick={() => {
                setEditingCategory(null)
                setShowCategoryForm(true)
              }}
              className="group relative bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white px-6 py-3 rounded-xl flex items-center space-x-3 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105 dark:from-purple-700 dark:to-purple-800 dark:hover:from-purple-800 dark:hover:to-purple-900"
            >
              <div className="absolute inset-0 bg-white/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <Plus className="h-5 w-5 relative z-10" />
              <span className="font-semibold relative z-10">Nouvelle catégorie</span>
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="mb-8">
          <div className="relative max-w-md">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Rechercher une catégorie..."
              className="w-full pl-12 pr-4 py-4 text-lg border-2 border-gray-200 dark:border-gray-600 rounded-xl focus:ring-4 focus:ring-purple-500/20 focus:border-purple-500 transition-all duration-300 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm dark:text-white placeholder-gray-500 dark:placeholder-gray-400 shadow-sm hover:shadow-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        {/* Main Content Card */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-2xl shadow-xl border border-gray-200/50 dark:border-gray-700/50 overflow-hidden">
          {/* Table Header */}
          <div className="bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-700 dark:to-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                Liste des catégories
              </h2>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {filteredCategories.length} catégorie{filteredCategories.length !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Loading State */}
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 animate-pulse">
                <Tag className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                Chargement des catégories...
              </h3>
              <p className="text-gray-500 dark:text-gray-400">
                Veuillez patienter un instant
              </p>
            </div>
          ) : (
            <>
              {/* Table */}
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50/50 dark:bg-gray-700/50">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Catégorie
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Description
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Date de création
                      </th>
                      <th className="px-6 py-4 text-center text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {paginatedCategories.map((category) => (
                      <tr key={category.id} className="group hover:bg-purple-50/50 dark:hover:bg-gray-700/50 transition-all duration-200">
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-purple-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                              <Tag className="h-5 w-5 text-white" />
                            </div>
                            <div className="ml-4">
                              <div className="text-sm font-semibold text-gray-900 dark:text-gray-100">
                                {category.titre}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="text-sm text-gray-900 dark:text-gray-100 max-w-xs truncate">
                            {category.description || (
                              <span className="text-gray-400 dark:text-gray-500 italic">
                                Aucune description
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center">
                            <div className="flex-shrink-0 w-8 h-8 bg-gray-100 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                              <Calendar className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                            </div>
                            <span className="ml-3 text-sm text-gray-900 dark:text-gray-100">
                              {new Date(category.created_at).toLocaleDateString('fr-FR', {
                                year: 'numeric',
                                month: 'short',
                                day: 'numeric'
                              })}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center space-x-2">
                            <button 
                              onClick={() => {
                                setEditingCategory(category)
                                setShowCategoryForm(true)
                              }}
                              className="group/btn relative p-2 text-purple-600 hover:text-purple-700 dark:text-purple-400 dark:hover:text-purple-300 transition-all duration-200 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/50"
                              title="Modifier"
                            >
                              <Pencil className="h-4 w-4 transform group-hover/btn:scale-110 transition-transform duration-200" />
                            </button>
                            <button
                              onClick={() => {
                                setCategoryToDelete(category.id)
                                setShowDeleteDialog(true)
                              }}
                              className="group/btn relative p-2 text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300 transition-all duration-200 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/50"
                              title="Supprimer"
                            >
                              <Trash2 className="h-4 w-4 transform group-hover/btn:scale-110 transition-transform duration-200" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Empty State */}
              {filteredCategories.length === 0 && !loading && (
                <div className="text-center py-12">
                  <div className="w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="h-8 w-8 text-gray-400" />
                  </div>
                  <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                    {searchTerm ? 'Aucune catégorie trouvée' : 'Aucune catégorie'}
                  </h3>
                  <p className="text-gray-500 dark:text-gray-400 mb-4">
                    {searchTerm 
                      ? 'Essayez de modifier vos critères de recherche' 
                      : 'Commencez par créer votre première catégorie'}
                  </p>
                  {!searchTerm && (
                    <Button 
                      onClick={() => {
                        setEditingCategory(null)
                        setShowCategoryForm(true)
                      }}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                    >
                      <Plus className="h-4 w-4 mr-2" />
                      Créer une catégorie
                    </Button>
                  )}
                </div>
              )}
            </>
          )}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between mt-8">
            <div className="text-sm text-gray-600 dark:text-gray-400">
              Affichage de {startIndex + 1} à{' '}
              {Math.min(startIndex + ITEMS_PER_PAGE, filteredCategories.length)} sur{' '}
              {filteredCategories.length} résultats
            </div>
            <div className="flex items-center space-x-2">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <ChevronLeft className="h-4 w-4" />
                <span>Précédent</span>
              </button>
              
              <div className="flex items-center space-x-1">
                {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium rounded-lg transition-all duration-200 ${
                      currentPage === page
                        ? 'bg-purple-600 text-white shadow-lg'
                        : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
              
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="flex items-center space-x-2 px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
              >
                <span>Suivant</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Category Form Modal */}
      {showCategoryForm && (
        <CategoryForm
          onClose={() => {
            setShowCategoryForm(false)
            setEditingCategory(null)
          }}
          category={editingCategory}
          onCategorySaved={async (categoryData) => {
            try {
              const operation = editingCategory
                ? supabase
                    .from('category')
                    .update(categoryData)
                    .eq('id', editingCategory.id)
                    .select()
                    .single()
                : supabase
                    .from('category')
                    .insert(categoryData)
                    .select()
                    .single()

              const { data, error } = await operation

              if (error) throw error

              setCategories(editingCategory
                ? categories.map(c => c.id === data.id ? data : c)
                : [data, ...categories]
              )
              
              setShowCategoryForm(false)
              setEditingCategory(null)
              return data
            } catch (error) {
              console.error('Error saving category:', error)
              throw error
            }
          }}
        />
      )}

      {/* Delete Confirmation Dialog */}
      <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <AlertDialogContent className="bg-white dark:bg-gray-800 border-0 shadow-2xl rounded-2xl max-w-md">
          <AlertDialogHeader className="space-y-4">
            <div className="w-12 h-12 bg-red-100 dark:bg-red-900/50 rounded-full flex items-center justify-center mx-auto">
              <Trash2 className="h-6 w-6 text-red-600 dark:text-red-400" />
            </div>
            <AlertDialogTitle className="text-xl font-semibold text-gray-900 dark:text-white text-center">
              Confirmer la suppression
            </AlertDialogTitle>
            <AlertDialogDescription className="text-gray-600 dark:text-gray-300 text-center">
              Êtes-vous sûr de vouloir supprimer cette catégorie ? Cette action est irréversible et toutes les données associées seront perdues.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="flex-col sm:flex-row gap-3 mt-6">
            <AlertDialogCancel className="w-full sm:w-auto px-6 py-3 border-2 border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 rounded-xl font-medium transition-all duration-200">
              Annuler
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (categoryToDelete) {
                  handleDelete(categoryToDelete)
                }
              }}
              className="w-full sm:w-auto px-6 py-3 bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Supprimer définitivement
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}