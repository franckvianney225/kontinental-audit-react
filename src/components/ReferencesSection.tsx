import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Mission, Category } from '../types/mission';
import { Skeleton } from './ui/skeleton';
import { Toggle } from './ui/toggle';
import { Calendar, MapPin, User, Tag, Building2, FileText, Award, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';

const ReferencesSection = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);
  const [showAll, setShowAll] = useState(false);

  const ITEMS_PER_PAGE = 6;

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Début du chargement des données...');
        
        // Récupérer les catégories
        const { data: categoriesData } = await supabase
          .from('category')
          .select('*');
        
        setCategories(categoriesData || []);

        // Sélectionner automatiquement la première catégorie si aucune n'est sélectionnée
        if (categoriesData && categoriesData.length > 0 && !selectedCategory) {
          setSelectedCategory(categoriesData[0].id);
        }

        // Récupérer les missions
        let query = supabase
          .from('missions')
          .select('*')
          .order('mission_date', { ascending: false });

        // Utiliser la première catégorie si aucune n'est sélectionnée
        const categoryToUse = selectedCategory || (categoriesData && categoriesData.length > 0 ? categoriesData[0].id : null);
        
        if (categoryToUse) {
          query = query.eq('category_id', categoryToUse);
        }

        const { data: missionsData, error: supabaseError } = await query;

        console.log('Résultat complet de la requête:', {
          missionsData,
          error: supabaseError,
          count: missionsData?.length,
          status: supabaseError?.code
        });

        if (supabaseError) throw supabaseError;

        console.log('Missions récupérées:', missionsData);
        setMissions(missionsData || []);
        setShowAll(false); // Reset showAll when category changes
      } catch (err) {
        console.error('Erreur complète:', err);
        setError('Erreur lors du chargement des missions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  // Initialiser avec la première catégorie
  useEffect(() => {
    if (categories.length > 0 && !selectedCategory) {
      setSelectedCategory(categories[0].id);
    }
  }, [categories, selectedCategory]);

  const getStatusBadge = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'en cours':
      case 'in progress':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-amber-50 text-amber-700 border border-amber-200">
            <div className="w-2 h-2 bg-amber-500 rounded-full mr-2"></div>
            En cours
          </span>
        );
      case 'terminé':
      case 'complete':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-green-50 text-green-700 border border-green-200">
            <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
            Terminé
          </span>
        );
      case 'planifié':
      case 'planned':
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-blue-50 text-blue-700 border border-blue-200">
            <div className="w-2 h-2 bg-blue-500 rounded-full mr-2"></div>
            Planifié
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-md text-xs font-medium bg-gray-50 text-gray-700 border border-gray-200">
            <div className="w-2 h-2 bg-gray-500 rounded-full mr-2"></div>
            {status}
          </span>
        );
    }
  };

  const getCategoryIcon = (index: number) => {
    const icons = [
      <FileText className="w-4 h-4" />,
      <Award className="w-4 h-4" />,
      <Building2 className="w-4 h-4" />,
      <User className="w-4 h-4" />,
      <Tag className="w-4 h-4" />,
      <MapPin className="w-4 h-4" />
    ];
    return icons[index % icons.length];
  };

  // Fonction pour obtenir les missions à afficher
  const getDisplayedMissions = () => {
    if (showAll) {
      return missions;
    }
    return missions.slice(0, ITEMS_PER_PAGE);
  };

  // Fonction pour gérer le changement de catégorie
  const handleCategoryChange = (categoryId: number) => {
    setSelectedCategory(categoryId);
    setShowAll(false);
  };

  if (loading) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-12">
            <Skeleton className="h-12 w-64 mx-auto mb-4" />
            <Skeleton className="h-6 w-96 mx-auto mb-8" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-10 w-32" />
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-lg p-6 shadow-sm border">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-8 w-8 rounded-md" />
                  <Skeleton className="h-6 w-16 rounded-md" />
                </div>
                <Skeleton className="h-6 w-3/4 mb-4" />
                <div className="space-y-3">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-4 w-2/3" />
                  <Skeleton className="h-4 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="text-red-700 font-medium">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  console.log('Missions à afficher:', missions);

  const displayedMissions = getDisplayedMissions();

  return (
    <section id="references" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Nos Références
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre expertise à travers nos collaborations avec des entreprises de renom
          </p>
        </div>

        {/* Category Filters */}
        {categories.length > 0 && (
          <div className="mb-8">
            {/* Version mobile - Slider horizontal */}
            <div className="md:hidden">
              <div className="flex gap-2 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((category, index) => (
                  <Toggle
                    key={category.id}
                    pressed={selectedCategory === category.id}
                    onPressedChange={() => handleCategoryChange(category.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 min-w-max ${
                      selectedCategory === category.id
                        ? 'bg-blue-600 text-white shadow-sm'
                        : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                    }`}
                  >
                    <div className={`p-1 rounded ${selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-100'}`}>
                      {getCategoryIcon(index)}
                    </div>
                    <span className="text-sm font-medium">{category.name || category.titre}</span>
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Version desktop - Flex centré */}
            <div className="hidden md:flex flex-wrap justify-center gap-3">
              {categories.map((category, index) => (
                <Toggle
                  key={category.id}
                  pressed={selectedCategory === category.id}
                  onPressedChange={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md font-medium transition-all duration-200 ${
                    selectedCategory === category.id
                      ? 'bg-blue-600 text-white shadow-sm'
                      : 'bg-white text-gray-700 hover:bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className={`p-1 rounded ${selectedCategory === category.id ? 'bg-blue-500' : 'bg-gray-100'}`}>
                    {getCategoryIcon(index)}
                  </div>
                  <span className="font-medium">{category.name || category.titre}</span>
                </Toggle>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {missions.length === 0 ? (
          <div className="text-center py-12">
            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Building2 className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Aucune mission disponible</h3>
            <p className="text-gray-600 max-w-md mx-auto">
              Essayez de sélectionner une autre catégorie pour voir plus de projets.
            </p>
          </div>
        ) : (
          <>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {displayedMissions.map((mission, index) => (
                <div
                  key={mission.id}
                  onMouseEnter={() => setHoveredCard(mission.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`bg-white dark:bg-gray-800 rounded-lg p-6 shadow-sm border border-gray-200 dark:border-gray-700 transition-all duration-200 hover:shadow-md ${
                    hoveredCard === mission.id ? 'ring-1 ring-blue-500' : ''
                  }`}
                >
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="w-8 h-8 bg-blue-100 rounded-md flex items-center justify-center">
                      {getCategoryIcon(index)}
                    </div>
                    {getStatusBadge(mission.etiquette)}
                  </div>

                  {/* Content */}
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-3">
                      {mission.name}
                    </h3>
                    
                    <div className="space-y-2">
                      <div className="flex items-start gap-2">
                        <User className="w-4 h-4 text-gray-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Client :</span>
                          <p className="text-sm text-gray-600 dark:text-gray-400">{mission.client}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Lieu :</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">{mission.lieu}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <Calendar className="w-4 h-4 text-gray-500 flex-shrink-0" />
                        <div>
                          <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Date :</span>
                          <span className="text-sm text-gray-600 dark:text-gray-400 ml-1">
                            {new Date(mission.mission_date).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons Voir plus / Voir moins */}
            {missions.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center mt-8">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-md font-medium transition-all duration-200 hover:bg-blue-700"
                >
                  {showAll ? (
                    <>
                      <span>Voir moins</span>
                      <ChevronUp className="w-4 h-4" />
                    </>
                  ) : (
                    <>
                      <span>Voir plus ({missions.length - ITEMS_PER_PAGE} autres)</span>
                      <ChevronDown className="w-4 h-4" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* Stats Section */}
        {missions.length > 0 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 mb-1">{missions.length}+</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Projets réalisés</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 mb-1">{categories.length}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Catégories de services</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="text-2xl font-bold text-blue-600 mb-1">100%</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">Satisfaction client</div>
            </div>
          </div>
        )}
      </div>

      {/* CSS pour masquer la scrollbar */}
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </section>
  );
};

export default ReferencesSection;