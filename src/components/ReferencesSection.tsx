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
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-amber-100 text-amber-800 border border-amber-200">
            <div className="w-2 h-2 bg-amber-400 rounded-full mr-1.5 animate-pulse"></div>
            En cours
          </span>
        );
      case 'terminé':
      case 'complete':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 border border-green-200">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-1.5"></div>
            Terminé
          </span>
        );
      case 'planifié':
      case 'planned':
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
            <div className="w-2 h-2 bg-blue-400 rounded-full mr-1.5"></div>
            Planifié
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800 border border-gray-200">
            <div className="w-2 h-2 bg-gray-400 rounded-full mr-1.5"></div>
            {status}
          </span>
        );
    }
  };

  const getCategoryColor = (index: number) => {
    const colors = [
      'from-blue-500 to-blue-600',
      'from-emerald-500 to-emerald-600',
      'from-purple-500 to-purple-600',
      'from-orange-500 to-orange-600',
      'from-pink-500 to-pink-600',
      'from-indigo-500 to-indigo-600'
    ];
    return colors[index % colors.length];
  };

  const getCategoryIcon = (index: number) => {
    const icons = [
      <FileText className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      <Award className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      <Building2 className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      <User className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      <Tag className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />,
      <MapPin className="w-4 h-4 sm:w-5 sm:h-5 md:w-6 md:h-6" />
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
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="text-center mb-16">
            <Skeleton className="h-16 w-96 mx-auto mb-4" />
            <Skeleton className="h-6 w-[600px] mx-auto mb-6" />
            <Skeleton className="h-1 w-24 mx-auto" />
          </div>
          
          <div className="flex flex-wrap justify-center gap-4 mb-12">
            {[...Array(3)].map((_, i) => (
              <Skeleton key={i} className="h-20 w-64" />
            ))}
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="bg-white rounded-3xl p-6 shadow-lg">
                <div className="flex justify-between items-start mb-4">
                  <Skeleton className="h-10 w-10 rounded-2xl" />
                  <Skeleton className="h-6 w-16 rounded-full" />
                </div>
                <Skeleton className="h-8 w-3/4 mb-3" />
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
      <section className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50">
        <div className="container mx-auto px-4 max-w-7xl">
          <div className="bg-red-50 border border-red-200 rounded-3xl p-8 text-center">
            <div className="text-red-600 text-lg font-medium">{error}</div>
          </div>
        </div>
      </section>
    );
  }

  console.log('Missions à afficher:', missions);

  const displayedMissions = getDisplayedMissions();

  return (
    <section id="references" className="py-20 bg-gradient-to-br from-slate-50 via-white to-blue-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-900">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
            Nos <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Références</span>
          </h2>
          <p className="text-xl text-slate-600 dark:text-gray-300 max-w-2xl mx-auto">
            Découvrez notre expertise à travers nos collaborations avec des entreprises de renom
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Category Filters - Design mobile amélioré */}
        {categories.length > 0 && (
          <div className="mb-12">
            {/* Version mobile - Slider horizontal */}
            <div className="md:hidden">
              <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide">
                {categories.map((category, index) => (
                  <Toggle
                    key={category.id}
                    pressed={selectedCategory === category.id}
                    onPressedChange={() => handleCategoryChange(category.id)}
                    className={`flex-shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl font-medium transition-all duration-300 min-w-max ${
                      selectedCategory === category.id
                        ? `bg-gradient-to-r ${getCategoryColor(index)} text-white shadow-lg`
                        : 'bg-white text-slate-700 hover:bg-slate-50 border border-slate-200'
                    }`}
                  >
                    <div className={`p-1 rounded-lg ${selectedCategory === category.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                      {getCategoryIcon(index)}
                    </div>
                    <div className="text-sm">
                      <div className="font-semibold">{category.name || category.titre}</div>
                    </div>
                  </Toggle>
                ))}
              </div>
            </div>

            {/* Version desktop - Grid centré */}
            <div className="hidden md:flex flex-wrap justify-center gap-4">
              {categories.map((category, index) => (
                <Toggle
                  key={category.id}
                  pressed={selectedCategory === category.id}
                  onPressedChange={() => handleCategoryChange(category.id)}
                  className={`flex items-center gap-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 ${
                    selectedCategory === category.id
                      ? `bg-gradient-to-r ${getCategoryColor(index)} text-white shadow-lg shadow-blue-500/25`
                      : 'bg-white text-slate-700 hover:bg-slate-50 border-2 border-slate-200'
                  }`}
                >
                  <div className={`p-1 rounded-lg ${selectedCategory === category.id ? 'bg-white/20' : 'bg-slate-100'}`}>
                    {getCategoryIcon(index)}
                  </div>
                  <div className="text-left">
                    <div className="font-bold">{category.name || category.titre}</div>
                    <div className={`text-sm ${selectedCategory === category.id ? 'text-white/80' : 'text-slate-500'}`}>
                      {category.description || 'Catégorie'}
                    </div>
                  </div>
                </Toggle>
              ))}
            </div>
          </div>
        )}

        {/* Content */}
        {missions.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full flex items-center justify-center mx-auto mb-6">
              <Building2 className="w-16 h-16 text-slate-400" />
            </div>
            <h3 className="text-2xl font-bold text-slate-900 mb-4">Aucune mission disponible</h3>
            <p className="text-slate-600 max-w-md mx-auto">
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
                  className={`group relative bg-white dark:bg-gray-800 rounded-3xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 border border-slate-100 dark:border-gray-700 overflow-hidden ${
                    hoveredCard === mission.id ? 'ring-2 ring-blue-500/20' : ''
                  }`}
                >
                  {/* Background Pattern */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-50 to-purple-50 rounded-full transform translate-x-16 -translate-y-16 opacity-50 group-hover:scale-110 transition-transform duration-300"></div>
                  
                  {/* Status Badge */}
                  <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center gap-2">
                      <div className={`w-10 h-10 rounded-2xl bg-gradient-to-r ${getCategoryColor(index)} flex items-center justify-center text-white shadow-md`}>
                        {getCategoryIcon(index)}
                      </div>
                    </div>
                    {getStatusBadge(mission.etiquette)}
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 transition-colors">
                      {mission.name}
                    </h3>
                    
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <User className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-700">Client :</span>
                          <p className="text-slate-600 text-sm mt-1">{mission.client}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <MapPin className="w-4 h-4 text-emerald-500 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-700 dark:text-gray-300">Lieu :</span>
                          <span className="text-slate-600 dark:text-gray-400 ml-2">{mission.lieu}</span>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="w-4 h-4 text-purple-500 flex-shrink-0" />
                        <div>
                          <span className="font-semibold text-slate-700 dark:text-gray-300">Date :</span>
                          <span className="text-slate-600 dark:text-gray-400 ml-2">
                            {new Date(mission.mission_date).toLocaleDateString('fr-FR', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Hover Effect */}
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 rounded-full"></div>
                  </div>
                </div>
              ))}
            </div>

            {/* Boutons Voir plus / Voir moins */}
            {missions.length > ITEMS_PER_PAGE && (
              <div className="flex justify-center mt-12">
                <button
                  onClick={() => setShowAll(!showAll)}
                  className="group flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25"
                >
                  {showAll ? (
                    <>
                      <span>Voir moins</span>
                      <ChevronUp className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-1" />
                    </>
                  ) : (
                    <>
                      <span>Voir plus ({missions.length - ITEMS_PER_PAGE} autres)</span>
                      <ChevronDown className="w-5 h-5 transition-transform duration-300 group-hover:translate-y-1" />
                    </>
                  )}
                </button>
              </div>
            )}
          </>
        )}

        {/* Stats Section */}
        {missions.length > 0 && (
          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-blue-600 mb-2">{missions.length}+</div>
              <div className="text-slate-600 dark:text-gray-300">Projets réalisés</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-emerald-600 mb-2">{categories.length}</div>
              <div className="text-slate-600 dark:text-gray-300">Catégories de services</div>
            </div>
            <div className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg">
              <div className="text-3xl font-bold text-purple-600 mb-2">100%</div>
              <div className="text-slate-600 dark:text-gray-300">Satisfaction client</div>
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