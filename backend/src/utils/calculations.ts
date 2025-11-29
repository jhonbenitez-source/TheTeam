// Categorías por edad (Sub-8, Sub-10, etc.)
export const CATEGORIES = [
  { name: 'Sub-8', minAge: 0, maxAge: 7 },
  { name: 'Sub-10', minAge: 8, maxAge: 9 },
  { name: 'Sub-12', minAge: 10, maxAge: 11 },
  { name: 'Sub-14', minAge: 12, maxAge: 13 },
  { name: 'Sub-16', minAge: 14, maxAge: 15 },
  { name: 'Sub-18', minAge: 16, maxAge: 17 },
  { name: 'Senior', minAge: 18, maxAge: 100 }
];

export function calculateAge(dateOfBirth: Date): number {
  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();
  
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())) {
    age--;
  }
  
  return age;
}

export function calculateCategory(dateOfBirth: Date): string {
  const age = calculateAge(dateOfBirth);
  
  for (const category of CATEGORIES) {
    if (age >= category.minAge && age <= category.maxAge) {
      return category.name;
    }
  }
  
  return 'Senior';
}

export function calculatePoints(homeScore: number, awayScore: number): { homePoints: number; awayPoints: number } {
  if (homeScore > awayScore) {
    return { homePoints: 3, awayPoints: 0 };
  } else if (awayScore > homeScore) {
    return { homePoints: 0, awayPoints: 3 };
  } else {
    return { homePoints: 1, awayPoints: 1 };
  }
}
