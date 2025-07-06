# Plan d'amélioration pour About.tsx

## Problèmes identifiés
1. **Éléments redondants/inutiles**
   - Div vide ligne 79 (`<div className="absolute inset-0 bg-gray-100"></div>`)
   - Span inutile lignes 85-87 (couleur déjà définie sur le parent)

2. **Dark mode incomplet**
   - Textes de contact (lignes 145, 149) sans classe dark
   - Bouton CTA (ligne 198) sans style dark mode

3. **Optimisations possibles**
   - Uniformisation des animations
   - Simplification des gradients
   - Amélioration de l'accessibilité

## Solutions proposées

### 1. Nettoyage du code
```diff
- <div className="absolute inset-0 bg-gray-100"></div>
- <span className="text-gray-900">KONTINENTAL</span>
+ KONTINENTAL
```

### 2. Compléter le dark mode
```diff
- <div className="flex items-center text-slate-600">
+ <div className="flex items-center text-slate-600 dark:text-gray-300">
```

```diff
- <button className="bg-gray-900 text-white...">
+ <button className="bg-gray-900 dark:bg-gray-700 text-white dark:text-gray-100...">
```

### 3. Optimisations supplémentaires
- Uniformiser les délais d'animation
- Vérifier les contrastes couleur
- Simplifier les gradients superflus

## Plan d'implémentation
1. Créer une branche git pour les modifications
2. Appliquer les corrections une par une
3. Tester visuellement chaque changement
4. Vérifier l'accessibilité
5. Fusionner après validation