import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'
import { Textarea } from '../ui/textarea'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '../ui/dialog'

interface CategoryFormProps {
  onClose: () => void
  category?: {
    id: number
    titre: string
    description: string | null
  }
  onCategorySaved: (categoryData: { titre: string; description: string | null }) => Promise<void>
}

export function CategoryForm({ onClose, category, onCategorySaved }: CategoryFormProps) {
  const [formData, setFormData] = useState({
    titre: '',
    description: ''
  })

  useEffect(() => {
    if (category) {
      setFormData({
        titre: category.titre,
        description: category.description || ''
      })
    }
  }, [category])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      await onCategorySaved({
        titre: formData.titre,
        description: formData.description || null
      })
      onClose()
    } catch (error) {
      console.error('Error saving category:', error)
    }
  }

  return (
    <Dialog open onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-xl font-semibold text-gray-900">
            {category ? 'Modifier' : 'Ajouter'} une catégorie
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="titre" className="text-sm font-medium text-gray-700">
              Titre <span className="text-red-500">*</span>
            </Label>
            <Input
              id="titre"
              value={formData.titre}
              onChange={(e) => setFormData({...formData, titre: e.target.value})}
              placeholder="Entrez le titre de la catégorie"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description" className="text-sm font-medium text-gray-700">
              Description
            </Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => setFormData({...formData, description: e.target.value})}
              placeholder="Décrivez cette catégorie (optionnel)"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none"
              rows={4}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <Button 
              variant="outline" 
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200"
            >
              Annuler
            </Button>
            <Button 
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200"
            >
              {category ? 'Modifier' : 'Ajouter'}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}