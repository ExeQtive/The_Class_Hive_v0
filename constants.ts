export const getCategoryLabel = (category: string): string => {
  switch (category) {
    case "grading":
      return "Grading"
    case "lesson-planning":
      return "Lesson Planning"
    case "meetings":
      return "Meetings"
    case "administrative":
      return "Administrative"
    case "supplies":
      return "Supplies"
    case "planning":
      return "Planning"
    default:
      return category.charAt(0).toUpperCase() + category.slice(1)
  }
}
