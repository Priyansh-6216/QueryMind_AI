# QueryMind AI - 1-Week Feature Enhancement Roadmap

## Overview
This roadmap outlines a 7-day plan to enhance QueryMind AI with larger features that improve both aesthetics and functionality. The focus is on implementing high-impact features that will make the application more polished, professional, and user-friendly.

## Goals
1. Implement Dark/Light mode toggle with persistence
2. Add Saved/Favorite Queries feature (backend + frontend)
3. Implement SQL formatting and beautification
4. Enhance loading states with skeleton screens
5. Add basic query history visualization
6. Polish UI/UX and fix any bugs

## Daily Breakdown

### Day 1: Dark Mode Implementation
**Goal:** Implement a dark/light mode toggle with persistence

**Tasks:**
- [ ] Update `tailwind.config.js` to enable dark mode using class strategy
- [ ] Create theme context or use localStorage for persistence
- [ ] Add theme toggle button to Navbar component
- [ ] Update all components to use Tailwind's dark: variants or CSS variables
- [ ] Test dark/light mode switching across all pages
- [ ] Ensure smooth transitions and proper contrast ratios

**Files to modify:**
- `frontend/tailwind.config.js`
- `frontend/src/components/layout/Navbar.tsx`
- `frontend/src/index.css` (or create a theme.css)
- Various component files to add dark mode classes

### Day 2: Saved Queries Backend
**Goal:** Implement backend API for saving and retrieving favorite queries

**Tasks:**
- [ ] Create `SavedQuery` entity in backend (QueryMind/src/main/java/com/querymind/entity)
- [ ] Create `SavedQueryRepository` interface extending JpaRepository
- [ ] Create `SavedQueryService` interface and implementation
- [ ] Create `SavedQueryController` with endpoints:
  - GET /api/saved-queries - Get all saved queries
  - POST /api/saved-queries - Save a new query
  - PUT /api/saved-queries/{id} - Update a saved query
  - DELETE /api/saved-queries/{id} - Delete a saved query
- [ ] Update `application.properties` if needed for any new configurations
- [ ] Run migrations or update schema.sql if needed
- [ ] Test API endpoints with Postman or similar

**Files to modify/create:**
- `backend/src/main/java/com/querymind/entity/SavedQuery.java`
- `backend/src/main/java/com/querymind/repository/SavedQueryRepository.java`
- `backend/src/main/java/com/querymind/service/SavedQueryService.java`
- `backend/src/main/java/com/querymind/controller/SavedQueryController.java`
- `backend/src/main/resources/schema.sql` (if needed)

### Day 3: Saved Queries Frontend
**Goal:** Implement frontend UI for saving, managing, and loading favorite queries

**Tasks:**
- [ ] Create types for saved queries in `frontend/src/types/savedQuery.types.ts`
- [ ] Create API client for saved queries in `frontend/src/api/savedQueryApi.ts`
- [ ] Create SavedQueryList component to display saved queries
- [ ] Create SaveQueryModal component for naming and saving queries
- [ ] Integrate save query functionality into QueryPage (add "Save Query" button)
- [ ] Add ability to load a saved query into the query input
- [ ] Add delete functionality for saved queries
- [ ] Create a dedicated SavedQueriesPage or integrate into Sidebar
- [ ] Style components to match existing design

**Files to modify/create:**
- `frontend/src/types/savedQuery.types.ts`
- `frontend/src/api/savedQueryApi.ts`
- `frontend/src/components/saved-query/SavedQueryList.tsx`
- `frontend/src/components/saved-query/SaveQueryModal.tsx`
- `frontend/src/components/query/QueryInput.tsx` (add save button)
- `frontend/src/pages/SavedQueriesPage.tsx` (new page)
- Update `App.tsx` to route to new page
- Update `Navbar.tsx` to link to saved queries page

### Day 4: SQL Formatting and Beautification
**Goal:** Add SQL formatting capabilities with copy-to-clipboard functionality

**Tasks:**
- [ ] Install sql-formatter library: `npm install sql-formatter`
- [ ] Create a utility function for formatting SQL in `frontend/src/utils/formatSql.ts`
- [ ] Add "Format SQL" button to SqlPreview component
- [ ] Add clipboard copy button for both raw and formatted SQL
- [ ] Implement syntax highlighting improvements (consider react-syntax-highlighter or similar)
- [ ] Add options to format SQL with different styles (optional)
- [ ] Ensure formatted SQL is displayed properly in the preview

**Files to modify/create:**
- `frontend/src/utils/formatSql.ts`
- `frontend/src/components/query/SqlPreview.tsx`
- `frontend/src/package.json` (add dependency)
- Consider adding `react-syntax-highlighter` if desired for better highlighting

### Day 5: Enhanced Loading States (Skeleton Screens)
**Goal:** Replace simple loading spinners with skeleton screens for better UX

**Tasks:**
- [ ] Create skeleton loader components:
  - `SkeletonText.tsx` for text placeholders
  - `SkeletonCode.tsx` for code blocks
  - `SkeletonTable.tsx` for table loading states
- [ ] Replace loading states in:
  - QueryPage: Replace spinner with skeleton for SQL preview, explanation, and results
  - HistoryPage: Replace spinner with skeleton for history list
  - SchemaPage: Replace spinner with skeleton for schema viewer
  - SavedQueriesPage: Replace spinner with skeleton for saved query list
- [ ] Ensure skeletons match the actual content dimensions
- [ ] Add subtle animation to skeletons (pulse or wave)
- [ ] Test loading states with various loading times

**Files to modify/create:**
- `frontend/src/components/common/SkeletonText.tsx`
- `frontend/src/components/common/SkeletonCode.tsx`
- `frontend/src/components/common/SkeletonTable.tsx`
- `frontend/src/pages/QueryPage.tsx`
- `frontend/src/pages/HistoryPage.tsx`
- `frontend/src/pages/SchemaPage.tsx`
- `frontend/src/pages/SavedQueriesPage.tsx`

### Day 6: Query History Visualization
**Goal:** Add basic visualizations to the history page for insights

**Tasks:**
- [ ] Install a charting library: `npm install recharts` (or alternative)
- [ ] Create utility functions to process history data for charts:
  - `getQueriesPerDay()` - returns data for line chart
  - `getAverageExecutionTimeOverTime()` - returns data for line chart
  - [Optional] `getMostQueriedTables()` - requires SQL parsing (might skip or simplify)
- [ ] Create Chart components:
  - `QueryCountChart.tsx` (line chart)
  - `ExecutionTimeChart.tsx` (line chart)
  - [Optional] `TopTablesChart.tsx` (bar chart)
- [ ] Modify HistoryPage to fetch additional statistics from backend (if needed) or process existing history data
- [ ] Add charts to HistoryPage above the history list
- [ ] Add loading states for charts using skeleton loaders
- [ ] Make charts responsive

**Files to modify/create:**
- `frontend/src/utils/processHistoryData.ts`
- `frontend/src/components/charts/QueryCountChart.tsx`
- `frontend/src/components/charts/ExecutionTimeChart.tsx`
- `frontend/src/pages/HistoryPage.tsx`
- `frontend/src/package.json` (add recharts dependency)

### Day 7: Polish, Bug Fixes, and Documentation
**Goal:** Finalize all features, fix bugs, and prepare for release

**Tasks:**
- [ ] Test all new features thoroughly:
  - Dark mode toggle persistence
  - Save/load/delete queries functionality
  - SQL formatting and copy to clipboard
  - Skeleton loaders in all loading states
  - History charts rendering correctly
- [ ] Fix any bugs or inconsistencies found during testing
- [ ] Ensure responsive design works on mobile and tablet
- [ ] Check accessibility (color contrast, keyboard navigation, ARIA labels)
- [ ] Update README.md with new features and how to use them
- [ ] Create a brief changelog for the release
- [ ] Perform final code cleanup and formatting
- [ ] Prepare deployment instructions if needed

**Files to modify:**
- `README.md` (update features section and add usage instructions)
- Any files with bugs found during testing
- Consider adding a `CHANGELOG.md` file

## Dependencies to Install
Run in frontend directory:
```bash
npm install sql-formatter recharts
```

## Backend Considerations
- The saved queries feature requires backend changes (Days 2-3)
- Ensure CORS is configured to allow frontend requests if not already set up
- Consider adding user authentication in the future for personalized saved queries
- For now, saved queries can be stored without user association (global or session-based)

## Success Criteria
By the end of this week, QueryMind AI should have:
1. A polished dark/light mode that persists user preference
2. A functional saved queries feature allowing users to save, load, and manage favorite queries
3. Beautified SQL output with formatting and copy capabilities
4. Improved user experience with skeleton loaders instead of simple spinners
5. Insightful visualizations on the history page showing query trends
6. Overall improved polish, responsiveness, and accessibility

## Notes
- Adjust timeline as needed based on complexity and unforeseen issues
- Focus on delivering working features each day rather than perfection
- Test each feature thoroughly before moving to the next
- Consider creating a feature branch for this work: `git checkout -b feature/enhancements`