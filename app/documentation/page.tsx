import type { Metadata } from "next"
import ReactMarkdown from "react-markdown"

export const metadata: Metadata = {
  title: "Documentation",
  description: "Full guide to every module in TheClassHive teacher dashboard.",
}

export default function DocumentationPage() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-16">
      <ReactMarkdown
        components={{
          h1: ({ children }) => (
            <h1 className="text-3xl font-bold mb-6">{children}</h1>
          ),
          h2: ({ children }) => (
            <h2 className="text-2xl font-semibold mt-10 mb-4 border-b pb-2">{children}</h2>
          ),
          h3: ({ children }) => (
            <h3 className="text-xl font-semibold mt-8 mb-3">{children}</h3>
          ),
          p: ({ children }) => (
            <p className="text-muted-foreground leading-relaxed mb-4">{children}</p>
          ),
          ul: ({ children }) => (
            <ul className="list-disc list-inside space-y-1 mb-4 text-muted-foreground">{children}</ul>
          ),
          ol: ({ children }) => (
            <ol className="list-decimal list-inside space-y-1 mb-4 text-muted-foreground">{children}</ol>
          ),
          li: ({ children }) => (
            <li className="leading-relaxed">{children}</li>
          ),
          strong: ({ children }) => (
            <strong className="font-semibold text-foreground">{children}</strong>
          ),
          code: ({ children }) => (
            <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">{children}</code>
          ),
        }}
      >
        {documentContent}
      </ReactMarkdown>
    </div>
  )
}

const documentContent = `# TheClassHive Documentation

## Introduction

TheClassHive is a comprehensive web application designed to streamline and enhance the teaching experience.

## Core Modules

The dashboard consists of the following core modules:

1. **Dashboard Overview** - Main dashboard with key metrics and quick access to features
2. **Calendar** - Schedule management and event tracking
3. **Lesson Planning** - Create and manage lesson plans
4. **Task Management** - Track and organize teaching tasks
5. **Resource Library** - Store and access teaching materials
6. **Student Management** - Manage student information and performance
7. **IEP Management** - Handle Individualized Education Programs
8. **Parent Communication** - Tools for communicating with parents
9. **Small Groups** - Organize and track small group instruction
10. **AI Assistant** - AI-powered teaching assistance
11. **File Management** - Upload and organize files
12. **Word Document Editor** - Create and edit documents

## Detailed Module Breakdown

### 1. Dashboard Overview

**Purpose:** Provides a quick snapshot of important information and metrics.

**Key Features:**
- **Metrics Cards** - Display upcoming lessons, active students, pending tasks, and available resources
- **Quick Access Tabs** - Switch between tasks, messages, and lessons
- **Upcoming Tasks** - Shows tasks that need immediate attention
- **Recent Messages** - Displays recent communications from parents
- **Recent Lessons** - Shows recently created or accessed lesson plans

**How to Use:**
- The dashboard loads automatically when logging in
- Click on any card to navigate to the corresponding section
- Use the tabs to switch between different types of information
- Click on specific items to view details or take action

### 2. Calendar

**Purpose:** Manage schedule, track events, and visualize time commitments.

**Key Features:**
- **Weekly View** - Shows events for the current week
- **Event Creation** - Add new events with details
- **Event Categories** - Color-coded events by type (class, assessment, meeting, event)
- **Task Integration** - Option to show tasks with due dates on the calendar

**How to Use:**
- Navigate between weeks using the arrow buttons
- Click "Add Event" to create a new calendar event
- Fill in event details in the dialog that appears
- Toggle "Show Tasks" to display or hide tasks on the calendar
- Click on any event to view details or edit

### 3. Lesson Planning

**Purpose:** Create, organize, and schedule lesson plans.

**Key Features:**
- **Multiple Views** - List, calendar, and templates views
- **Lesson Creation** - Create detailed lesson plans with objectives, materials, and standards
- **Filtering** - Filter lessons by subject, status, or search terms
- **Templates** - Access and use lesson plan templates

**How to Use:**
- Switch between views using the view selector buttons
- Click "Create New Lesson" to start a new lesson plan
- Use filters to find specific lessons
- Click on a lesson card to view details
- Edit lessons by clicking the edit button
- Access templates by switching to the Templates view

### 4. Task Management

**Purpose:** Track and organize teaching tasks and to-dos.

**Key Features:**
- **Multiple Views** - List, calendar, and kanban views
- **Task Creation** - Create tasks with details, priority, and due dates
- **Filtering** - Filter tasks by priority, status, category, or date
- **Sorting** - Sort tasks by different criteria
- **Status Tracking** - Track task progress (todo, in-progress, completed)

**How to Use:**
- Switch between views using the tabs
- Click "New Task" to create a task
- Use filters and sorting options to organize tasks
- Click on a task to view details
- Update task status by clicking the status toggle
- Drag tasks between columns in Kanban view

### 5. Resource Library

**Purpose:** Store, organize, and access teaching materials and resources.

**Key Features:**
- **Multiple Views** - Grid, list, categories, and collections views
- **Resource Upload** - Upload resources with metadata
- **Filtering** - Filter resources by subject, type, grade level
- **Favorites** - Mark resources as favorites for quick access
- **Resource Details** - View detailed information about resources

**How to Use:**
- Switch between views using the tabs
- Click "Upload Resource" to add a new resource
- Use filters to find specific resources
- Click on a resource to view details
- Toggle favorites by clicking the star icon
- Download resources by clicking the download button

### 6. Student Management

**Purpose:** Manage student information, track performance, and organize student groups.

**Key Features:**
- **Multiple Views** - Grid and list views
- **Student Profiles** - Detailed student information
- **Performance Tracking** - Track academic performance
- **Attendance Tracking** - Monitor student attendance
- **Group Management** - Organize students into groups
- **Filtering** - Filter students by various criteria

**How to Use:**
- Switch between views using the tabs
- Click "Add Student" to create a new student profile
- Use filters to find specific students
- Click on a student card to view details
- Update student information by clicking the edit button
- Track attendance and performance using the dedicated tabs

### 7. IEP Management

**Purpose:** Handle Individualized Education Programs for students with special needs.

**Key Features:**
- **IEP Student List** - List of students with IEPs
- **Goal Tracking** - Track progress on IEP goals
- **Document Management** - Store and access IEP documents

**How to Use:**
- Navigate between tabs to access different IEP functions
- Click "New IEP" to create a new IEP
- Select a student to view their IEP details
- Track goals and update progress
- Upload and manage IEP documents

### 8. Parent Communication

**Purpose:** Facilitate communication with parents and guardians.

**Key Features:**
- **Message Inbox** - View and respond to parent messages
- **Announcement Creator** - Send announcements to parents
- **Conference Scheduler** - Schedule parent-teacher conferences
- **Message Templates** - Use templates for common communications

**How to Use:**
- Switch between tabs to access different communication tools
- Compose messages using the message editor
- Schedule conferences by selecting dates and times
- Use templates to save time when creating common messages
- Send announcements to individual parents or groups

### 9. Small Groups

**Purpose:** Organize and track small group instruction and interventions.

**Key Features:**
- **Group Management** - Create and manage small groups
- **Student Assignment** - Assign students to groups
- **Progress Tracking** - Track group progress toward goals
- **Activity Logging** - Record group activities and notes
- **Analytics** - View performance analytics for groups

**How to Use:**
- Create groups by clicking "Create Small Group"
- Add students to groups from the group detail page
- Set goals and track progress
- Log activities after each group session
- View analytics to assess group effectiveness

### 10. AI Assistant

**Purpose:** Provide AI-powered assistance for various teaching tasks.

**Key Features:**
- **Chat Interface** - Interact with the AI assistant
- **Lesson Plan Generation** - Generate lesson plans
- **Assignment Creation** - Create assignments and worksheets
- **Quick Prompts** - Access common prompts for quick assistance

**How to Use:**
- Type questions or requests in the chat interface
- Use quick prompts for common requests
- Copy generated content to use in your work
- Access premium features by upgrading to Pro

### 11. File Management

**Purpose:** Upload, organize, and access files across different categories.

**Key Features:**
- **File Categories** - Organize files by type (resources, documents, attachments, avatars)
- **File Upload** - Upload files with metadata
- **File Listing** - View and access uploaded files
- **File Actions** - Download, share, or delete files

**How to Use:**
- Select a file category using the tabs
- Upload files using the file uploader
- View files in the file list
- Click on file actions to download, share, or delete

### 12. Word Document Editor

**Purpose:** Create and edit documents within the platform.

**Key Features:**
- **Rich Text Editing** - Format text with various styles
- **Document Saving** - Save documents for later access
- **Export Options** - Export documents in different formats
- **Print Functionality** - Print documents directly

**How to Use:**
- Access the editor from the Word Document menu item
- Edit document title by clicking on it
- Use the formatting toolbar to style text
- Save documents using the Save button
- Export or print using the respective buttons
`