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

export const MATH_CURRICULUM: Curriculum = {
  course: "7th Grade Math (TX TEKS)",
  units: [
    {
      unit: "Number and Operations",
      lessons: [
        {
          title: "Sets of Numbers",
          activities: [
            { type: "Video", title: "Relationships between sets of rational numbers", grade: "" },
            { type: "Exercise", title: "Visualize relationships between sets of rational numbers", grade: "" }
          ]
        },
        {
          title: "Adding and Subtracting Rational Numbers",
          activities: [
            { type: "Video", title: "Adding fractions with different signs", grade: "" },
            { type: "Video", title: "Adding & subtracting fractions", grade: "" },
            { type: "Exercise", title: "Adding & subtracting negative fractions", grade: "" },
            { type: "Exercise", title: "Adding & subtracting rational numbers", grade: "" }
          ]
        },
        {
          title: "Adding and Subtracting Negative Numbers: Variables",
          activities: [
            { type: "Video", title: "Substitution with negative numbers", grade: "" },
            { type: "Exercise", title: "Substitution with negative numbers", grade: "" }
          ]
        },
        {
          title: "Assessments 1",
          activities: [
            { type: "Quiz", title: "Number and Operations: Quiz 1", grade: "" }
          ]
        },
        {
          title: "Multiplication and Division Word Problems with Negatives",
          activities: [
            { type: "Video", title: "Interpreting multiplication & division of negative numbers", grade: "" },
            { type: "Exercise", title: "Multiplying & dividing negative numbers word problems", grade: "" }
          ]
        },
        {
          title: "Understanding Multiplying and Dividing Fractions",
          activities: [
            { type: "Video", title: "Negative signs in fractions", grade: "" },
            { type: "Exercise", title: "Negative signs in fractions", grade: "" }
          ]
        },
        {
          title: "Multiplying and Dividing Negative Fractions",
          activities: [
            { type: "Video", title: "Multiplying positive and negative fractions", grade: "" },
            { type: "Exercise", title: "Multiplying positive and negative fractions", grade: "" },
            { type: "Video", title: "Dividing fractions: 3/5 ÷ 1/2", grade: "" },
            { type: "Video", title: "Dividing negative fractions", grade: "" },
            { type: "Exercise", title: "Dividing positive and negative fractions", grade: "" },
            { type: "Video", title: "Dividing mixed numbers", grade: "" },
            { type: "Exercise", title: "Dividing mixed numbers with negatives", grade: "" }
          ]
        },
        {
          title: "Properties of Multiplication and Division",
          activities: [
            { type: "Video", title: "Equivalent expressions with negative numbers (multiplication and division)", grade: "" },
            { type: "Exercise", title: "Equivalent expressions with negative numbers (multiplication and division)", grade: "" }
          ]
        },
        {
          title: "Assessments 2",
          activities: [
            { type: "Quiz", title: "Number and Operations: Quiz 2", grade: "" }
          ]
        },
        {
          title: "Sales Tax",
          activities: [
            { type: "Video", title: "Percent word problems: tax and discount", grade: "" },
            { type: "Exercise", title: "Sales tax", grade: "" }
          ]
        },
        {
          title: "Income Tax Withholding",
          activities: [
            { type: "Article", title: "Tax forms", grade: "" },
            { type: "Article", title: "Your guide to key tax terms", grade: "" },
            { type: "Exercise", title: "Tax forms and tax terms", grade: "" },
            { type: "Video", title: "Anatomy of a paycheck", grade: "" },
            { type: "Video", title: "Intro to the W-4", grade: "" },
            { type: "Video", title: "Tax brackets and progressive taxation", grade: "" }
          ]
        },
        {
          title: "Net Worth",
          activities: [
            { type: "Video", title: "What is net worth?", grade: "" },
            { type: "Article", title: "Assets, liabilities, and net worth", grade: "" },
            { type: "Exercise", title: "Find net worth", grade: "" }
          ]
        },
        {
          title: "Assessments 3",
          activities: [
            { type: "Quiz", title: "Number and Operations: Quiz 3", grade: "" },
            { type: "Unit Test", title: "Number and Operations: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "One-variable Equations and Inequalities",
      lessons: [
        {
          title: "Solutions to Equations",
          activities: [
            { type: "Video", title: "Testing solutions to equations", grade: "" },
            { type: "Exercise", title: "Testing solutions to equations", grade: "" }
          ]
        },
        {
          title: "Two-step Equation Intro",
          activities: [
            { type: "Video", title: "Modeling two-step equations", grade: "" },
            { type: "Exercise", title: "Model two-step equations", grade: "" },
            { type: "Exercise", title: "Two-step equation visual models", grade: "" },
            { type: "Video", title: "Intro to two-step equations", grade: "" },
            { type: "Video", title: "Two-step equations intuition", grade: "" },
            { type: "Video", title: "Worked example: two-step equations", grade: "" },
            { type: "Exercise", title: "Two-step equations", grade: "" },
            { type: "Video", title: "Graphing two-step equations", grade: "" },
            { type: "Exercise", title: "Graph two-step equations", grade: "" }
          ]
        },
        {
          title: "Assessments 1",
          activities: [
            { type: "Quiz", title: "One-variable Equations and Inequalities: Quiz 1", grade: "" }
          ]
        },
        {
          title: "Two-step Equations with Decimals and Fractions",
          activities: [
            { type: "Video", title: "Two-step equations with decimals and fractions", grade: "" },
            { type: "Exercise", title: "Two-step equations with decimals and fractions", grade: "" },
            { type: "Video", title: "Find the mistake: two-step equations", grade: "" },
            { type: "Exercise", title: "Find the mistake: two-step equations", grade: "" }
          ]
        },
        {
          title: "Two-step Equation Word Problems",
          activities: [
            { type: "Video", title: "Two-step equation word problem: garden", grade: "" },
            { type: "Video", title: "Two-step equation word problem: oranges", grade: "" },
            { type: "Exercise", title: "Interpret two-step equation word problems", grade: "" },
            { type: "Exercise", title: "Two-step equations word problems", grade: "" }
          ]
        },
        {
          title: "Assessments 2",
          activities: [
            { type: "Quiz", title: "One-variable Equations and Inequalities: Quiz 2", grade: "" }
          ]
        },
        {
          title: "Solutions to Inequalities",
          activities: [
            { type: "Video", title: "Testing solutions to inequalities", grade: "" },
            { type: "Exercise", title: "Testing solutions to inequalities", grade: "" }
          ]
        },
        {
          title: "Two-step Inequalities",
          activities: [
            { type: "Video", title: "Modeling two step inequalities", grade: "" },
            { type: "Video", title: "Modeling inequalities with negative coefficients", grade: "" },
            { type: "Exercise", title: "Model two-step inequalities", grade: "" },
            { type: "Exercise", title: "Two-step inequality visual models", grade: "" },
            { type: "Video", title: "Two-step inequalities", grade: "" },
            { type: "Exercise", title: "Two-step inequalities", grade: "" }
          ]
        },
        {
          title: "Two-step Inequalities and Equations Word Problems",
          activities: [
            { type: "Video", title: "Two-step inequality word problem: apples", grade: "" },
            { type: "Video", title: "Two-step inequality word problem: R&B", grade: "" },
            { type: "Exercise", title: "Two-step inequality word problems", grade: "" },
            { type: "Video", title: "Writing two step word problems", grade: "" },
            { type: "Exercise", title: "Write two-step word problems", grade: "" }
          ]
        },
        {
          title: "Assessments 3",
          activities: [
            { type: "Quiz", title: "One-variable Equations and Inequalities: Quiz 3", grade: "" }
          ]
        },
        {
          title: "Discounts and Interest",
          activities: [
            { type: "Video", title: "Percent word problems: tax and discount", grade: "" },
            { type: "Video", title: "Percent word problem: guavas", grade: "" },
            { type: "Exercise", title: "Discount, markup, and commission word problems", grade: "" },
            { type: "Video", title: "Combining discounts", grade: "" },
            { type: "Video", title: "Comparing discounts", grade: "" },
            { type: "Exercise", title: "Compare discounts", grade: "" }
          ]
        },
        {
          title: "Scaling a Budget",
          activities: [
            { type: "Video", title: "Family budget calculator", grade: "" },
            { type: "Exercise", title: "Scale a budget", grade: "" }
          ]
        },
        {
          title: "Simple and Compound Interest",
          activities: [
            { type: "Exercise", title: "Variable expressions with exponents", grade: "" },
            { type: "Video", title: "How to make your money grow", grade: "" },
            { type: "Video", title: "Calculating simple & compound interest", grade: "" },
            { type: "Article", title: "Compound growth", grade: "" },
            { type: "Exercise", title: "Simple and compound interest", grade: "" }
          ]
        },
        {
          title: "Assessments 4",
          activities: [
            { type: "Quiz", title: "One-variable Equations and Inequalities: Quiz 4", grade: "" },
            { type: "Unit Test", title: "One-variable Equations and Inequalities: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Geometric Equations",
      lessons: [
        {
          title: "Vertical, Complementary, and Supplementary Angles",
          activities: [
            { type: "Video", title: "Complementary & supplementary angles", grade: "" },
            { type: "Exercise", title: "Complementary and supplementary angles (visual)", grade: "" },
            { type: "Exercise", title: "Complementary and supplementary angles (no visual)", grade: "" },
            { type: "Article", title: "Complementary and supplementary angles review", grade: "" }
          ]
        },
        {
          title: "Missing Angle Problems",
          activities: [
            { type: "Video", title: "Vertical angles", grade: "" },
            { type: "Exercise", title: "Finding missing angles", grade: "" },
            { type: "Exercise", title: "Finding angle measures between intersecting lines", grade: "" }
          ]
        },
        {
          title: "Assessments 1",
          activities: [
            { type: "Quiz", title: "Geometric Equations: Quiz 1", grade: "" }
          ]
        },
        {
          title: "Missing Angles with Variables",
          activities: [
            { type: "Video", title: "Find measure of vertical angles", grade: "" },
            { type: "Video", title: "Find measure of angles word problem", grade: "" },
            { type: "Video", title: "Equation practice with complementary angles", grade: "" },
            { type: "Video", title: "Equation practice with supplementary angles", grade: "" },
            { type: "Video", title: "Equation practice with vertical angles", grade: "" },
            { type: "Exercise", title: "Create equations to solve for missing angles", grade: "" },
            { type: "Exercise", title: "Unknown angle problems (with algebra)", grade: "" },
            { type: "Exercise", title: "Equation practice with angle addition", grade: "" }
          ]
        },
        {
          title: "Triangle Angles",
          activities: [
            { type: "Exercise", title: "Find angles in triangles", grade: "" },
            { type: "Exercise", title: "Find angles in isosceles triangles", grade: "" },
            { type: "Video", title: "Finding triangle angles with algebra", grade: "" },
            { type: "Exercise", title: "Find interior triangle angles with algebra", grade: "" },
            { type: "Video", title: "Triangle exterior angle example", grade: "" },
            { type: "Video", title: "Worked example: Triangle angles (diagram)", grade: "" }
          ]
        },
        {
          title: "Assessments 2",
          activities: [
            { type: "Quiz", title: "Geometric Equations: Quiz 2", grade: "" },
            { type: "Unit Test", title: "Geometric Equations: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Proportional Reasoning with Ratios and Rates",
      lessons: []
    },
    {
      unit: "Graphs and Two-Variable Equations",
      lessons: [
        {
          title: "Two-variable Equation Intro",
          activities: [
            { type: "Video", title: "Solutions to 2-variable equations", grade: "" },
            { type: "Video", title: "Worked example: solutions to 2-variable equations", grade: "" },
            { type: "Exercise", title: "Solutions to 2-variable equations", grade: "" },
            { type: "Video", title: "Completing solutions to 2-variable equations", grade: "" },
            { type: "Exercise", title: "Complete solutions to 2-variable equations", grade: "" }
          ]
        },
        {
          title: "Graphing Two-variable Equations",
          activities: [
            { type: "Exercise", title: "Graph linear equations", grade: "" },
            { type: "Video", title: "Identifying equations of proportional graphs", grade: "" },
            { type: "Video", title: "Identifying equations of linear graphs", grade: "" },
            { type: "Exercise", title: "Equations of linear graphs", grade: "" }
          ]
        },
        {
          title: "Modeling with Two Variables",
          activities: [
            { type: "Article", title: "Modeling with tables, equations, and graphs", grade: "" },
            { type: "Video", title: "Modeling with linear equations: snow", grade: "" },
            { type: "Video", title: "Modeling with linear tables", grade: "" },
            { type: "Exercise", title: "Model with linear tables", grade: "" },
            { type: "Exercise", title: "Model with linear equations", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Unit Test", title: "Graphs and Two-variable Equations: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Similarity",
      lessons: [
        {
          title: "Scale Copies",
          activities: [
            { type: "Video", title: "Identifying corresponding parts of scaled copies", grade: "" },
            { type: "Video", title: "Corresponding points and sides of scaled shapes", grade: "" },
            { type: "Exercise", title: "Corresponding sides and points", grade: "" },
            { type: "Video", title: "Identifying scale copies", grade: "" },
            { type: "Exercise", title: "Identify scale copies", grade: "" }
          ]
        },
        {
          title: "Scale Factor",
          activities: [
            { type: "Video", title: "Identifying scale factor in drawings", grade: "" },
            { type: "Exercise", title: "Identify scale factor in scale drawings", grade: "" },
            { type: "Video", title: "Interpreting scale factors in drawings", grade: "" },
            { type: "Exercise", title: "Interpret scale factor in scale drawings", grade: "" },
            { type: "Video", title: "Identifying values in scale copies", grade: "" },
            { type: "Exercise", title: "Scale copies", grade: "" }
          ]
        },
        {
          title: "Scale Drawings",
          activities: [
            { type: "Video", title: "Scale drawings", grade: "" },
            { type: "Video", title: "Scale drawing: centimeters to kilometers", grade: "" },
            { type: "Exercise", title: "Scale drawings", grade: "" },
            { type: "Video", title: "Creating scale drawings", grade: "" },
            { type: "Video", title: "Making a scale drawing", grade: "" },
            { type: "Exercise", title: "Construct scale drawings", grade: "" }
          ]
        },
        {
          title: "Similar Figures",
          activities: [
            { type: "Video", title: "Relating side lengths in similar figures", grade: "" },
            { type: "Exercise", title: "Relationships in similar figures", grade: "" }
          ]
        },
        {
          title: "Similar Triangles",
          activities: [
            { type: "Video", title: "Intro to triangle similarity", grade: "" },
            { type: "Video", title: "Checking triangle similarity with side length ratios", grade: "" },
            { type: "Exercise", title: "Determine similar triangles: SSS", grade: "" },
            { type: "Video", title: "Solving similar triangles", grade: "" },
            { type: "Exercise", title: "Solve similar triangles (basic)", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Quiz", title: "Similarity: Quiz 1", grade: "" },
            { type: "Quiz", title: "Similarity: Quiz 2", grade: "" },
            { type: "Unit Test", title: "Similarity: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Probability",
      lessons: [
        {
          title: "Basic Probability",
          activities: [
            { type: "Video", title: "Intro to theoretical probability", grade: "" },
            { type: "Video", title: "Simple probability: yellow marble", grade: "" },
            { type: "Video", title: "Simple probability: non-blue marble", grade: "" },
            { type: "Exercise", title: "Simple probability sample spaces", grade: "" },
            { type: "Exercise", title: "Simple probability", grade: "" },
            { type: "Exercise", title: "Probability of complements", grade: "" },
            { type: "Video", title: "Experimental probability", grade: "" },
            { type: "Exercise", title: "Experimental probability", grade: "" }
          ]
        },
        {
          title: "Probability Models",
          activities: [
            { type: "Video", title: "Making predictions with probability", grade: "" },
            { type: "Exercise", title: "Making predictions with probability", grade: "" },
            { type: "Video", title: "Probability models example: frozen yogurt", grade: "" },
            { type: "Exercise", title: "Probability models", grade: "" }
          ]
        },
        {
          title: "Compound Events and Sample Spaces",
          activities: [
            { type: "Video", title: "Sample spaces for compound events", grade: "" },
            { type: "Exercise", title: "Sample spaces for compound events", grade: "" },
            { type: "Video", title: "Die rolling probability", grade: "" },
            { type: "Video", title: "Compound events example with tree diagram", grade: "" },
            { type: "Video", title: "Independent events example: test taking", grade: "" },
            { type: "Video", title: "Compound probability of independent events", grade: "" },
            { type: "Exercise", title: "Probabilities of compound events", grade: "" },
            { type: "Video", title: "Free-throw probability", grade: "" },
            { type: "Video", title: "Three-pointer vs free-throw probability", grade: "" }
          ]
        },
        {
          title: "Venn Diagrams and the Addition Rule",
          activities: [
            { type: "Video", title: "Probability with Venn diagrams", grade: "" },
            { type: "Video", title: "Addition rule for probability", grade: "" },
            { type: "Exercise", title: "Two-way tables, Venn diagrams, and probability", grade: "" }
          ]
        },
        {
          title: "Estimating Probabilities Using Simulation",
          activities: [
            { type: "Video", title: "Random numbers for experimental probability", grade: "" },
            { type: "Video", title: "Random number list to run experiment", grade: "" },
            { type: "Exercise", title: "Interpret results of simulations", grade: "" }
          ]
        },
        {
          title: "Assessments",
          activities: [
            { type: "Quiz", title: "Probability: Quiz 1", grade: "" },
            { type: "Quiz", title: "Probability: Quiz 2", grade: "" },
            { type: "Unit Test", title: "Probability: Unit Test", grade: "" }
          ]
        }
      ]
    },
    {
      unit: "Circles and Composite Figures",
      lessons: []
    }
  ]
}

export const SUBJECTS: Subject[] = [
  { id: 'math', name: 'Math', icon: 'Calculator', color: 'oklch(0.55 0.18 250)', curriculum: MATH_CURRICULUM },
  { id: 'biology', name: 'Biology', icon: 'Flask', color: 'oklch(0.55 0.18 150)', curriculum: BIOLOGY_CURRICULUM },
  { id: 'bible', name: 'Bible', icon: 'BookBookmark', color: 'oklch(0.50 0.15 300)' },
  { id: 'reading', name: 'Reading', icon: 'BookOpen', color: 'oklch(0.55 0.18 30)' },
  { id: 'texas-history', name: 'Texas History', icon: 'MapPin', color: 'oklch(0.55 0.18 0)' },
  { id: 'health', name: 'Health', icon: 'Heart', color: 'oklch(0.60 0.18 120)' }
]
