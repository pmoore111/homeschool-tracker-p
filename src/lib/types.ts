export interface Assignment {
  id: string
  subjectId: string
  name: string
  grade: number
  maxPoints: number
  date: string
  notes?: string
}

export interface Activity {
  type: string
  title: string
  grade: string
}

export interface Lesson {
  title: string
  activities: Activity[]
}

export interface Unit {
  unit: string
  lessons: Lesson[]
}

export interface Curriculum {
  course: string
  units: Unit[]
}

export interface Subject {
  id: string
  name: string
  icon: string
  color: string
  curriculum?: Curriculum
}

export interface AttendanceRecord {
  date: string
  status: 'present' | 'absent' | 'excused'
}

export interface StudentInfo {
  name: string
  grade: string
  schoolYear: string
}

export const BIOLOGY_CURRICULUM: Curriculum = {
  course: "Middle School Biology",
  units: [
    {
      unit: "Cells and Organisms",
      lessons: [
        {
          title: "Introduction to Middle School Biology",
          activities: [
            { type: "Video", title: "Introduction to Middle School Biology", grade: "" }
          ]
        },
        {
          title: "Cells and Organisms",
          activities: [
            { type: "Video", title: "Cells and Organisms", grade: "" },
            { type: "Article", title: "Cells and Organisms", grade: "" },
            { type: "Exercise", title: "Understand: Cells and Organisms", grade: "" }
          ]
        },
        {
          title: "Cell Parts and Functions",
          activities: [
            { type: "Video", title: "Cell Parts and Their Functions", grade: "" },
            { type: "Video", title: "Comparing Animal and Plant Cells", grade: "" },
            { type: "Article", title: "Cell Parts and Functions", grade: "" },
            { type: "Exercise", title: "Understand: Cell Parts and Functions", grade: "" },
            { type: "Exercise", title: "Apply: Cell Parts and Functions", grade: "" }
          ]
        },
        {
          title: "Organization in the Human Body",
          activities: [
            { type: "Video", title: "Organization in the Human Body", grade: "" },
            { type: "Article", title: "Organization in the Human Body", grade: "" },
            { type: "Exercise", title: "Understand: Organization in the Human Body", grade: "" }
          ]
        },
        {
          title: "Sensory Processing and the Brain",
          activities: [
            { type: "Video", title: "Sensory Processing and the Brain", grade: "" },
            { type: "Article", title: "Sensory Processing and the Brain", grade: "" },
            { type: "Exercise", title: "Understand: Sensory Processing and the Brain", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Quiz", title: "Cells and Organisms: Quiz 1", grade: "" },
            { type: "Quiz", title: "Cells and Organisms: Quiz 2", grade: "" },
            { type: "Unit Test", title: "Cells and Organisms: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Organism Growth and Reproduction",
      lessons: [
        {
          title: "Sexual and Asexual Reproduction",
          activities: [
            { type: "Video", title: "Sexual and Asexual Reproduction", grade: "" },
            { type: "Article", title: "Sexual and Asexual Reproduction", grade: "" },
            { type: "Exercise", title: "Understand: Sexual and Asexual Reproduction", grade: "" }
          ]
        },
        {
          title: "Animal Behavior and Offspring Success",
          activities: [
            { type: "Video", title: "Animal Behavior and Offspring Success", grade: "" },
            { type: "Article", title: "Animal Behavior and Offspring Success", grade: "" },
            { type: "Exercise", title: "Apply: Animal Behavior and Offspring Success", grade: "" }
          ]
        },
        {
          title: "Plant Reproductive Success",
          activities: [
            { type: "Video", title: "Plant Reproductive Success", grade: "" },
            { type: "Article", title: "Plant Reproductive Success", grade: "" },
            { type: "Exercise", title: "Understand: Plant Reproductive Success", grade: "" },
            { type: "Exercise", title: "Apply: Plant Reproductive Success", grade: "" }
          ]
        },
        {
          title: "Organism Growth and the Environment",
          activities: [
            { type: "Video", title: "Organism Growth and the Environment", grade: "" },
            { type: "Article", title: "Organism Growth and the Environment", grade: "" },
            { type: "Exercise", title: "Apply: Organism Growth and the Environment", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Quiz", title: "Organism Growth and Reproduction: Quiz 1", grade: "" },
            { type: "Quiz", title: "Organism Growth and Reproduction: Quiz 2", grade: "" },
            { type: "Unit Test", title: "Organism Growth and Reproduction: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Matter and Energy in Organisms",
      lessons: [
        {
          title: "Photosynthesis in Organisms",
          activities: [
            { type: "Video", title: "Photosynthesis in Organisms", grade: "" },
            { type: "Article", title: "Photosynthesis in Organisms", grade: "" },
            { type: "Exercise", title: "Understand: Photosynthesis in Organisms", grade: "" },
            { type: "Exercise", title: "Apply: Photosynthesis in Organisms", grade: "" }
          ]
        },
        {
          title: "Food and Energy in Organisms",
          activities: [
            { type: "Video", title: "Food and Energy in Organisms", grade: "" },
            { type: "Article", title: "Food and Energy in Organisms", grade: "" },
            { type: "Video", title: "Cellular Respiration", grade: "" },
            { type: "Article", title: "Cellular Respiration", grade: "" },
            { type: "Exercise", title: "Understand: Food and Energy in Organisms", grade: "" },
            { type: "Exercise", title: "Apply: Food and Energy in Organisms", grade: "" }
          ]
        },
        {
          title: "Activity: Measuring Cellular Respiration",
          activities: [
            { type: "Article", title: "Activity: How Can Measuring Cellular Respiration Help Us Reach a Fitness Goal?", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Quiz", title: "Matter and Energy in Organisms: Quiz 1", grade: "" },
            { type: "Quiz", title: "Matter and Energy in Organisms: Quiz 2", grade: "" },
            { type: "Unit Test", title: "Matter and Energy in Organisms: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Interactions in Ecosystems",
      lessons: [
        {
          title: "Populations, Communities, and Ecosystems",
          activities: [
            { type: "Video", title: "Populations, Communities, and Ecosystems", grade: "" },
            { type: "Article", title: "Populations, Communities, and Ecosystems", grade: "" },
            { type: "Exercise", title: "Apply: Populations, Communities, and Ecosystems", grade: "" }
          ]
        },
        {
          title: "Resources and Population Growth",
          activities: [
            { type: "Video", title: "Resources and Population Growth", grade: "" },
            { type: "Article", title: "Resources and Population Growth", grade: "" },
            { type: "Exercise", title: "Understand: Resources and Population Growth", grade: "" },
            { type: "Exercise", title: "Apply: Resources and Population Growth", grade: "" }
          ]
        },
        {
          title: "Ecological Interactions",
          activities: [
            { type: "Video", title: "Competition, Predation, and Mutualism", grade: "" },
            { type: "Article", title: "Competitive, Predatory, and Mutualistic Interactions", grade: "" },
            { type: "Exercise", title: "Understand: Ecological Interactions", grade: "" },
            { type: "Exercise", title: "Apply: Ecological Interactions", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Quiz", title: "Interactions in Ecosystems: Quiz 1", grade: "" },
            { type: "Quiz", title: "Interactions in Ecosystems: Quiz 2", grade: "" },
            { type: "Unit Test", title: "Interactions in Ecosystems: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Matter and Energy in Ecosystems",
      lessons: [
        {
          title: "Photosynthesis in Ecosystems",
          activities: [
            { type: "Video", title: "Photosynthesis in Ecosystems", grade: "" },
            { type: "Article", title: "Photosynthesis in Ecosystems", grade: "" },
            { type: "Exercise", title: "Understand: Photosynthesis in Ecosystems", grade: "" }
          ]
        },
        {
          title: "Matter and Energy in Food Webs",
          activities: [
            { type: "Video", title: "Matter and Energy in Food Webs", grade: "" },
            { type: "Video", title: "Worked Example: Analyzing an Ocean Food Web", grade: "" },
            { type: "Video", title: "Worked Example: Analyzing a Generic Food Web", grade: "" },
            { type: "Article", title: "Matter and Energy in Food Webs", grade: "" },
            { type: "Exercise", title: "Understand: Matter and Energy in Food Webs", grade: "" },
            { type: "Exercise", title: "Apply: Matter and Energy in Food Webs", grade: "" }
          ]
        },
        {
          title: "Activity: Food Web Disturbance",
          activities: [
            { type: "Article", title: "Activity: What Happens When a Food Web is Disturbed?", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Unit Test", title: "Matter and Energy in Ecosystems: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Ecosystems and Biodiversity",
      lessons: [
        {
          title: "Ecosystem Dynamics",
          activities: [
            { type: "Video", title: "Ecosystem Dynamics: Clark's Nutcrackers and the White Bark Pine", grade: "" },
            { type: "Article", title: "Ecosystem Dynamics", grade: "" },
            { type: "Exercise", title: "Understand: Ecosystem Dynamics", grade: "" },
            { type: "Exercise", title: "Apply: Ecosystem Dynamics", grade: "" }
          ]
        },
        {
          title: "Biodiversity and Ecosystem Health",
          activities: [
            { type: "Video", title: "Biodiversity and Ecosystem Health: Hawaiian Islands Case Study", grade: "" },
            { type: "Article", title: "Biodiversity and Ecosystem Health", grade: "" },
            { type: "Exercise", title: "Understand: Biodiversity and Ecosystem Health", grade: "" }
          ]
        },
        {
          title: "Humans and Ecosystems",
          activities: [
            { type: "Video", title: "Humans and Ecosystems: How Do Vultures Provide Ecosystem Services?", grade: "" },
            { type: "Article", title: "Humans and Ecosystems", grade: "" },
            { type: "Exercise", title: "Understand: Humans and Ecosystems", grade: "" },
            { type: "Exercise", title: "Apply: Humans and Ecosystems", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Quiz", title: "Ecosystems and Biodiversity: Quiz 1", grade: "" },
            { type: "Quiz", title: "Ecosystems and Biodiversity: Quiz 2", grade: "" },
            { type: "Unit Test", title: "Ecosystems and Biodiversity: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Inheritance and Variation",
      lessons: [
        {
          title: "Chromosomes",
          activities: [
            { type: "Video", title: "Chromosomes and Genes", grade: "" },
            { type: "Article", title: "Chromosomes and Genes", grade: "" },
            { type: "Video", title: "Chromosome Pairs", grade: "" },
            { type: "Article", title: "Chromosome Pairs", grade: "" },
            { type: "Exercise", title: "Understand: Chromosomes", grade: "" },
            { type: "Exercise", title: "Apply: Chromosomes", grade: "" }
          ]
        },
        {
          title: "Genes, Proteins, and Traits",
          activities: [
            { type: "Video", title: "Genes, Proteins, and Traits", grade: "" },
            { type: "Article", title: "Genes, Proteins, and Traits", grade: "" },
            { type: "Exercise", title: "Understand: Genes, Proteins, and Traits", grade: "" }
          ]
        },
        {
          title: "Mutations",
          activities: [
            { type: "Video", title: "Mutations", grade: "" },
            { type: "Article", title: "Mutations", grade: "" },
            { type: "Exercise", title: "Apply: Mutations", grade: "" }
          ]
        },
        {
          title: "Activity: Genetic Disorders",
          activities: [
            { type: "Article", title: "Activity: Why Do Some Mutations Cause Genetic Disorders?", grade: "" }
          ]
        },
        {
          title: "Reproduction and Genetic Variation",
          activities: [
            { type: "Video", title: "Sexual Reproduction and Genetic Variation", grade: "" },
            { type: "Article", title: "Sexual Reproduction and Genetic Variation", grade: "" },
            { type: "Video", title: "Genetics Vocabulary", grade: "" },
            { type: "Video", title: "Worked Examples: Punnett Squares", grade: "" },
            { type: "Article", title: "Genetics Vocabulary and Punnett Squares", grade: "" },
            { type: "Exercise", title: "Understand: Sexual Reproduction and Genetic Variation", grade: "" },
            { type: "Exercise", title: "Apply: Genetics Vocabulary", grade: "" },
            { type: "Exercise", title: "Apply: Punnett Squares", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Quiz", title: "Inheritance and Variation: Quiz 1", grade: "" },
            { type: "Quiz", title: "Inheritance and Variation: Quiz 2", grade: "" },
            { type: "Quiz", title: "Inheritance and Variation: Quiz 3", grade: "" },
            { type: "Unit Test", title: "Inheritance and Variation: Unit Test", grade: "" }
          ]
        }
      ]
    }
  ]
}

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Math', icon: 'Calculator', color: 'oklch(0.55 0.18 250)' },
  { id: 'biology', name: 'Biology', icon: 'Flask', color: 'oklch(0.55 0.18 150)', curriculum: BIOLOGY_CURRICULUM },
  { id: 'bible', name: 'Bible', icon: 'BookBookmark', color: 'oklch(0.50 0.15 300)' },
  { id: 'reading', name: 'Reading', icon: 'BookOpen', color: 'oklch(0.55 0.18 30)' },
  { id: 'texas-history', name: 'Texas History', icon: 'MapPin', color: 'oklch(0.55 0.18 0)' },
  { id: 'health', name: 'Health', icon: 'Heart', color: 'oklch(0.60 0.18 120)' }
]
