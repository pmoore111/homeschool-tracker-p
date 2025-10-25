# Homeschool Tracking Application

A comprehensive homeschool management system for tracking student progress, attendance, and generating professional reports.

**Experience Qualities**:
1. **Professional** - Clean, organized interface that reflects the seriousness of educational record-keeping and instills confidence
2. **Efficient** - Streamlined workflows for daily attendance and grade entry with minimal clicks required
3. **Trustworthy** - Clear data presentation and reliable report generation that parents can confidently share with authorities

**Complexity Level**: Light Application (multiple features with basic state)
The app manages multiple interconnected features (subjects, grades, attendance, reports) with persistent state, but doesn't require accounts or complex backend operations.

## Essential Features

### Subject Management
- **Functionality**: Track grades and assignments across Math, Biology, Bible, Reading, Texas History, and Health
- **Purpose**: Maintain organized academic records per subject area
- **Trigger**: User selects a subject from the main dashboard
- **Progression**: Dashboard → Subject card click → Subject detail view → Add/view assignments → Input grades → Save
- **Success criteria**: Grades persist, calculate averages correctly, display chronologically

### Attendance Calendar
- **Functionality**: Monthly calendar view to mark present/absent/excused days
- **Purpose**: Maintain required attendance records for homeschool compliance
- **Trigger**: User navigates to Attendance tab
- **Progression**: Dashboard → Attendance tab → Calendar view → Click date → Select status → Auto-save
- **Success criteria**: Attendance saves per date, displays visual indicators, calculates attendance percentage

### Progress Reports
- **Functionality**: Generate comprehensive progress reports showing grades and attendance
- **Purpose**: Create official documentation for records and compliance
- **Trigger**: User clicks "Generate Progress Report" button
- **Progression**: Dashboard → Reports tab → Select date range → Generate → View formatted report → Print/export
- **Success criteria**: Report displays all subjects, current grades, attendance summary, formatted professionally

### Report Cards
- **Functionality**: Generate formal report cards with letter grades and comments
- **Purpose**: Create end-of-term official grade documentation
- **Trigger**: User clicks "Generate Report Card" button
- **Progression**: Dashboard → Reports tab → Select term → Generate → View formatted report card → Print/export
- **Success criteria**: Shows letter grades, GPA, attendance, formatted as official document

## Edge Case Handling
- **No grades entered**: Display helpful empty state encouraging first entry
- **Invalid grade values**: Validate numeric input between 0-100
- **Future dates in calendar**: Allow marking but show visual distinction from past dates
- **Missing attendance data**: Show gaps clearly in reports with "Not Recorded" status
- **Print formatting**: Ensure reports render properly for printing with page breaks

## Design Direction
The design should feel professional, trustworthy, and educational - similar to official school portals but warmer and more personal. Clean interface with academic color palette that conveys organization and competence. Minimal but purposeful design that prioritizes clarity and usability.

## Color Selection
Custom palette inspired by traditional academic environments with modern refinement.

- **Primary Color**: Deep Navy Blue (oklch(0.35 0.08 250)) - Conveys professionalism, trust, and academic authority
- **Secondary Colors**: Soft Slate (oklch(0.65 0.02 250)) for supporting UI elements and subtle backgrounds
- **Accent Color**: Warm Amber (oklch(0.70 0.15 75)) for success states, highlights, and call-to-action elements
- **Foreground/Background Pairings**: 
  - Background (Soft Cream #fafaf9): Dark Navy text (oklch(0.25 0.08 250)) - Ratio 10.2:1 ✓
  - Card (White #ffffff): Dark Navy text (oklch(0.25 0.08 250)) - Ratio 11.5:1 ✓
  - Primary (Deep Navy oklch(0.35 0.08 250)): White text (oklch(0.98 0 0)) - Ratio 8.1:1 ✓
  - Secondary (Soft Slate oklch(0.65 0.02 250)): Dark Navy text (oklch(0.25 0.08 250)) - Ratio 4.8:1 ✓
  - Accent (Warm Amber oklch(0.70 0.15 75)): Dark Navy text (oklch(0.25 0.08 250)) - Ratio 5.2:1 ✓
  - Muted (Light Gray oklch(0.95 0.01 250)): Medium Gray text (oklch(0.50 0.02 250)) - Ratio 7.1:1 ✓

## Font Selection
Use clear, professional typefaces that balance academic formality with modern readability - Inter for its excellent screen legibility and professional character.

- **Typographic Hierarchy**: 
  - H1 (Page Titles): Inter SemiBold/32px/tight tracking/-0.02em
  - H2 (Section Headers): Inter SemiBold/24px/tight tracking/-0.01em
  - H3 (Card Titles): Inter Medium/18px/normal tracking/0em
  - Body (Content): Inter Regular/15px/relaxed leading/1.6
  - Small (Metadata): Inter Regular/13px/normal leading/1.4
  - Labels (Forms): Inter Medium/14px/normal tracking/0em

## Animations
Subtle, purposeful animations that reinforce interactions without distracting from the academic focus. Transitions should feel smooth and professional, with gentle state changes that guide attention.

- **Purposeful Meaning**: Gentle transitions communicate successful saves, smooth tab switches feel organized and intentional
- **Hierarchy of Movement**: Grade entry confirmation (200ms fade), report generation (300ms slide-in), calendar date selection (150ms highlight)

## Component Selection
- **Components**: 
  - Tabs for main navigation (Subjects, Attendance, Reports)
  - Card for subject displays with shadows for depth
  - Calendar (react-day-picker) for attendance tracking with custom styling
  - Dialog for grade entry forms with validation
  - Table for displaying grade lists and report data
  - Button with primary/secondary variants following design system
  - Badge for grade indicators and attendance status
  - Select for dropdown filters (term selection, subject selection)
  - Input for grade entry with validation states
  
- **Customizations**: 
  - Custom calendar day styling for attendance states (present/absent/excused)
  - Custom report card layout component with print-optimized styles
  - Custom grade average display with visual progress indicators
  
- **States**: 
  - Buttons: Subtle shadow on hover, slight scale on active, loading spinner for async operations
  - Inputs: Blue ring on focus, red border on validation error, green checkmark on valid
  - Cards: Subtle lift on hover for interactive cards, border highlight on selection
  
- **Icon Selection**: 
  - BookOpen (subjects/reading)
  - Calculator (math)
  - Flask (biology)
  - Heart (health)
  - BookBookmark (bible)
  - MapPin (Texas history)
  - CalendarCheck (attendance)
  - FileText (reports)
  - Plus (add entries)
  - Printer (print reports)
  
- **Spacing**: 
  - Page padding: p-6 (24px)
  - Card padding: p-6 (24px)
  - Card gap: gap-6 (24px)
  - Form field gap: gap-4 (16px)
  - Section spacing: space-y-8 (32px)
  
- **Mobile**: 
  - Tabs convert to vertical stacked navigation at <768px
  - Subject cards stack to single column on mobile
  - Calendar adapts to full-width with larger touch targets
  - Reports optimize for mobile viewing with responsive tables
  - Bottom margin on mobile to prevent content hiding behind browser chrome
