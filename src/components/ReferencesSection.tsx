import { useState, useEffect } from 'react';
import { supabase } from '../lib/supabaseClient';
import { Mission, Category } from '../types/mission';
import { Skeleton } from './ui/skeleton';
import { Toggle } from './ui/toggle';

const ReferencesSection = () => {
  const [missions, setMissions] = useState<Mission[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        console.log('Début du chargement des données...');
        
        // Récupérer les catégories
        const { data: categoriesData } = await supabase
          .from('category')
          .select('*');
        
        setCategories(categoriesData || []);

        // Récupérer les missions
        let query = supabase
          .from('missions')
          .select('*')
          .order('mission_date', { ascending: false });

        if (selectedCategory) {
          query = query.eq('category_id', selectedCategory);
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
      } catch (err) {
        console.error('Erreur complète:', err);
        setError('Erreur lors du chargement des missions');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [selectedCategory]);

  if (loading) {
    return (
      <div className="p-4 space-y-4">
        <Skeleton className="h-8 w-1/3" />
        <div className="grid gap-4">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-6 w-2/3" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return <div className="p-4 text-red-500">{error}</div>;
  }

  console.log('Missions à afficher:', missions);

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Nos Références</h2>
      
      {categories.length > 0 && (
        <div className="flex gap-2 mb-4 flex-wrap">
          <Toggle
            pressed={!selectedCategory}
            onPressedChange={() => setSelectedCategory(null)}
          >
            Toutes
          </Toggle>
          {categories.map((category) => (
            <Toggle
              key={category.id}
              pressed={selectedCategory === category.id}
              onPressedChange={() => setSelectedCategory(category.id)}
              title={category.description}
            >
              {category.name || category.titre}
            </Toggle>
          ))}
        </div>
      )}
      
      {missions.length === 0 ? (
        <p>Aucune mission disponible (total: {missions.length})</p>
      ) : (
        <div className="grid gap-4">
          {missions.map((mission) => (
            <div key={mission.id} className="border p-4 rounded-lg">
              <h3 className="font-semibold">{mission.name}</h3>
              <p>Client: {mission.client}</p>
              <p>Lieu: {mission.lieu}</p>
              <p>Date: {new Date(mission.mission_date).toLocaleDateString('fr-FR')}</p>
              <p>Statut: {mission.etiquette}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default ReferencesSection;